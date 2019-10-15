const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const bcrypt = require('bcrypt')
require('dotenv').config()

const app = express()

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
    // check to see if user is in session
    if (req.session.user) {
        res.send({ success: true, user: req.session.user })
    } else {
        res.send({ success: false })
    }
})

app.delete('/auth/user', (req, res, next) => {
    // this destroys the session and removes the user object
    //aka logs you out
    req.session.destroy()
    res.send({ success: true })
})

////////////////

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

////////////////

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
    const { name, genre_id, is_private, questions } = req.body
    db.quiz.insert({ name, genre_id, is_private, date_created: date, date_updated: date, creator_id: req.session.user.id })
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

app.get('/api/savedQuiz', (req, res, next) => {
    const db = app.get('db')
    res.send({ name, genre_id, is_private, questions })
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
    db.quiz.find()
        .then((quiz) => {
            res.send({ success: true, quiz: quiz })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

//////////////////////////////////////////////////////////////////////////////////////

const port = process.env.PORT || 5050
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})


// http://localhost:5050