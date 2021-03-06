const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const bcrypt = require('bcrypt')
const path = require('path');
require('dotenv').config()

const app = express()

app.use(express.static(path.join(__dirname, '/build')));

app.use(cors())
app.use(bodyParser.json())

massive(process.env.DATABASE_URL)
    .then((dbInstance) => {
        console.log(`DB is connected`)
        app.set('db', dbInstance)
    })

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        //days hours minutes seconds milseconds
        expires: 1 * 24 * 60 * 60 * 1000,
    },
    saveUninitialized: false,
    rolling: true,
    resave: false,
}))
//////////////////////////////////////////////////////////////////////////////////////
app.use('/api/*', (req, res, next) => {
    if (!req.session.user) {
        res.send({ success: false, message: 'Please login.' })
    } else {
        next()
    }
})

app.get('/auth/user', (req, res, next) => {
    if (req.session.user) {
        res.send({ success: true, user: req.session.user })
    } else {
        res.send({ success: false })
    }
})

app.delete('/auth/user', (req, res, next) => {
    req.session.destroy()
    res.send({ success: true })
})

///////////////////////////////////////////////////////////////////

app.post('/auth/login', (req, res, next) => {
    const db = app.get('db');
    const { email, password } = req.body
    let catchUser = {}
    db.people.findOne({ email })
        .then((user) => {
            if (!user) {
                throw 'We could not find a user for this email. Please register.'
            } else {
                catchUser = user;
                return bcrypt.compare(password, user.password)
            }
        })
        .then((isMatch) => {
            if (!isMatch) {
                throw (`Your credentials don't match our records.`)
            }
            delete catchUser.password
            req.session.user = catchUser;
            res.send({ success: true, user: catchUser })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

////////////////////////////////////////////////////////////////////////////

app.post('/auth/register', (req, res, next) => {
    const db = app.get('db');
    const { email, password, first_name, last_name } = req.body
    db.people.findOne({ email })
        .then((user) => {
            if (user) {
                throw 'This email is already in use, please login.'
            } else {
                return bcrypt.hash(password, 10)
            }
        })
        .then((hash) => {
            return db.people.insert({ email, password: hash, first_name, last_name })
        })
        .then((user) => {
            delete user.password
            req.session.user = user;
            res.send({ success: true, user })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

//////////////////////////////////////////////////////////////////////////////////////

app.post('/api/savedQuiz', (req, res, next) => {
    const db = app.get('db')
    const date = new Date()
    const { name, genre_id, is_private, questions, img } = req.body
    db.quiz.insert({ name, genre_id, is_private, date_created: date, date_updated: date, creator_id: req.session.user.id, img })
        .then((quiz) => {
            const promises = questions.map((e, i) => {
                return db.question.insert({ question: e.question, question_type_id: e.question_type_id, quiz_id: quiz.id, date_created: date, date_updated: date })
                    .then((question) => {
                        e.answers.map((j) => {
                            return db.answer.insert({ answer: j.answer, is_correct: j.is_correct, question_id: question.id, date_created: date, date_updated: date })
                        })
                    })
            })
            return Promise.all(promises)
        }).then((questions) => {
            res.send({ success: true })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

//////////////////////////////////////////////////////////////////////////////////////

app.get('/api/quiz/:id', (req, res, next) => {
    const db = app.get('db')
    const { id } = req.params
    let dataWorks = {}
    db.quiz.findOne({ id })
        .then((quiz) => {
            dataWorks.quiz = quiz
            return db.question.find({ quiz_id: quiz.id })
        })
        .then((questions) => {
            dataWorks.questions = questions
            const answerPromises = questions.map((e) => {
                return db.answer.find({ question_id: e.id })
            })
            return Promise.all(answerPromises)
        })
        .then((answers) => {
            const flattenedAnswers = answers.flat()
            dataWorks.questions.map((question) => {
                question.answers = flattenedAnswers.filter((answer) => {
                    return question.id === answer.question_id
                })
                return question
            })
            res.send(dataWorks)
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

//////////////////////////////////////////////////////////////////////////////////////

app.post('/api/quiz/', (req, res, next) => {
    const db = app.get('db')
    const date = new Date()
    const { quiz_id, submittedAnswer } = req.body
    db.question.find({ quiz_id })
        .then((question) => {
            return Promise.all(
                question.map((q) => {
                    return db.answer.find({ question_id: q.id, is_correct: true })
                }))
        })
        .then((answers) => {
            const flattenedAnswers = answers.flat();
            const comparedAnswers = submittedAnswer.reduce((r, e) => {
                const isCorrect = flattenedAnswers.reduce((bool, sa) => {
                    if (e.question_id === sa.question_id && e.answer_id === sa.id) {
                        bool = true
                    }
                    return bool
                }, false)
                r.push({ question_id: e.question_id, answer_id: e.answer_id, selected_correct: isCorrect, date_created: date })
                return r
            }, [])
            const comparedAnswersPromises = comparedAnswers.map((e, i) => {
                return db.submitted_answer.insert({ answer_id: e.answer_id, quiz_id: quiz_id, question_id: e.question_id, people_id: req.session.user.id, selected_correct: e.selected_correct, date_created: date })
            })
            return Promise.all(comparedAnswersPromises)
        })
        .then((response) => {
            res.send({ success: true })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

//////////////////////////////////////////////////////////////////////////////////////
app.get('/api/score/:id', (req, res, next) => {
    const db = app.get('db')
    const { id } = req.params
    let dataWorks = {}
    db.quiz.findOne({ id })
        .then((quiz) => {
            dataWorks.quiz = quiz
            return db.question.find({ quiz_id: quiz.id })
        })
        .then((questions) => {
            dataWorks.questions = questions
            const answerPromises = questions.map((e) => {
                return db.answer.find({ question_id: e.id })
            })
            return Promise.all(answerPromises)
        })
        .then((answers) => {
            const flattenedAnswers = answers.flat()
            dataWorks.questions.map((question) => {
                question.answers = flattenedAnswers.filter((answer) => {
                    return question.id === answer.question_id
                })
                return question
            })
            return db.submitted_answer.find({ quiz_id: id, people_id: req.session.user.id })
        })
        .then((submitted_answer) => {
            dataWorks.submitted_answer = submitted_answer
            res.send(dataWorks)
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

//////////////////////////////////////////////////////////////////////////////////////

app.get('/api/pastScores', (req, res, next) => {
    const db = app.get('db')
    db.submitted_answer.find({ people_id: req.session.user.id })
        .then((quizzes) => {
            const filteredQuizzes = quizzes.reduce((r, e) => {
                if (!r.includes(e.quiz_id)) {
                    r.push(e.quiz_id)
                }
                return r
            }, [])
            const quizObj = filteredQuizzes.map((quizId) => {
                return db.quiz.findOne({ id: quizId })
            })
            return Promise.all(quizObj)
        })
        .then((response) => {
            res.send({ quiz: response, success: true })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

//////////////////////////////////////////////////////////////////////////////////////

app.get('/api/genre', (req, res, next) => {
    const db = app.get('db')
    db.genre.find()
        .then((genre) => {
            res.send({ success: true, genre: genre })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

//////////////////////////////////////////////////////////////////////////////////////

app.get('/api/questionType', (req, res, next) => {
    const db = app.get('db')
    db.question_type.find()
        .then((genre) => {
            res.send({ success: true, genre: genre })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

//////////////////////////////////////////////////////////////////////////////////////

app.get('/api/quiz', (req, res, next) => {
    const db = app.get('db')
    let newQuiz
    db.quiz.find({ is_private: false })
        .then((quiz) => {
            newQuiz = quiz
            return Promise.all(quiz.map((e) => {
                return db.people.findOne({ id: e.creator_id })
            }))
        })
        .then((people) => {
            const quiz = newQuiz.map((e) => {
                e.creator = people.reduce((r, peep) => {
                    if (peep.id === e.creator_id) {
                        r = `${peep.first_name} ${peep.last_name}`
                    }
                    return r
                }, '')
                return e
            })
            res.send({ success: true, quiz: quiz })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

//////////////////////////////////////////////////////////////////////////////////////
app.delete('/api/quiz/:id', (req, res, next) => {
    const db = app.get('db')
    db.submitted_answer.destroy({ quiz_id: req.params.id })
        .then((submittedAnswer) => {
            return db.question.find({ quiz_id: req.params.id })
        })
        .then((questions) => {
            return Promise.all(questions.map((e) => {
                return db.answer.destroy({ question_id: e.id })
            }))
        })
        .then((answers) => {
            return db.question.destroy({ quiz_id: req.params.id })
        })
        .then(() => {
            return db.quiz.destroy({ id: req.params.id })
        })
        .then(() => {
            res.send({ success: true })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})
//////////////////////////////////////////////////////////////////////////////////////

app.get('/*', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, "build")
    })
});

const port = process.env.PORT || 5050
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})


// http://localhost:5050
// https://quizticles.herokuapp.com