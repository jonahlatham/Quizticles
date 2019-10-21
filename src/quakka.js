let object = {
    "quiz": {
        "id": 35,
        "name": "Lies",
        "genre_id": 4,
        "is_private": false,
        "date_created": "2019-10-18T00:19:34.441Z",
        "date_updated": "2019-10-18T00:19:34.441Z",
        "creator_id": 2
    },
    "questions": [
        {
            "id": 40,
            "question": "The answer is true",
            "question_type_id": 1,
            "quiz_id": 35,
            "date_created": "2019-10-18T00:19:34.441Z",
            "date_updated": "2019-10-18T00:19:34.441Z",
            "answers": [
                {
                    "id": 94,
                    "answer": "True",
                    "is_correct": true,
                    "question_id": 40,
                    "date_created": "2019-10-18T00:19:34.441Z",
                    "date_updated": "2019-10-18T00:19:34.441Z"
                },
                {
                    "id": 95,
                    "answer": "False",
                    "is_correct": false,
                    "question_id": 40,
                    "date_created": "2019-10-18T00:19:34.441Z",
                    "date_updated": "2019-10-18T00:19:34.441Z"
                }
            ]
        },
        {
            "id": 41,
            "question": "The answer is false",
            "question_type_id": 1,
            "quiz_id": 35,
            "date_created": "2019-10-18T00:19:34.441Z",
            "date_updated": "2019-10-18T00:19:34.441Z",
            "answers": [
                {
                    "id": 96,
                    "answer": "False",
                    "is_correct": true,
                    "question_id": 41,
                    "date_created": "2019-10-18T00:19:34.441Z",
                    "date_updated": "2019-10-18T00:19:34.441Z"
                },
                {
                    "id": 97,
                    "answer": "True",
                    "is_correct": false,
                    "question_id": 41,
                    "date_created": "2019-10-18T00:19:34.441Z",
                    "date_updated": "2019-10-18T00:19:34.441Z"
                }
            ]
        }
    ],
    "submitted_answer": [
        {
            "id": 52,
            "quiz_id": 35,
            "question_id": 41,
            "answer_id": 96,
            "people_id": 2,
            "selected_correct": true,
            "date_created": "2019-10-19T16:30:49.363Z"
        },
        {
            "id": 56,
            "quiz_id": 35,
            "question_id": 40,
            "answer_id": 94,
            "people_id": 2,
            "selected_correct": true,
            "date_created": "2019-10-19T20:02:21.646Z"
        },
        {
            "id": 57,
            "quiz_id": 35,
            "question_id": 41,
            "answer_id": 96,
            "people_id": 2,
            "selected_correct": true,
            "date_created": "2019-10-19T20:02:21.646Z"
        },
        {
            "id": 58,
            "quiz_id": 35,
            "question_id": 40,
            "answer_id": 94,
            "people_id": 2,
            "selected_correct": true,
            "date_created": "2019-10-19T20:08:49.778Z"
        },
        {
            "id": 59,
            "quiz_id": 35,
            "question_id": 41,
            "answer_id": 96,
            "people_id": 2,
            "selected_correct": false,
            "date_created": "2019-10-19T20:08:49.778Z"
        }
    ]
}


// given the object above make the object below
function newCrap(obj) {
    let answer = {
        quiz: {
            name: obj.quiz.name
        },
        questions: obj.questions.map((e) => {
            const submittedAnswerId = obj.submitted_answer.filter((sa) => {
                console.log(sa)
                if (sa.question_id === e.id) {
                    return true
                } else {
                    return false
                }
            }).reverse()[0].answer_id
            console.log(submittedAnswerId)
            return {
                question: e.question,
                correctAnswer: e.answers.reduce((r, answer) => {
                    if (answer.is_correct) {
                        r = answer.answer
                    }
                    return r
                }, ''),
                submittedAnswer: e.answers.reduce((r, ssa) => {
                    console.log(ssa.id)
                    if (ssa.id === submittedAnswerId) {
                        r = ssa.answer
                    }
                    return r
                }, ''),
                is_correct: this.correctAnswer === this.submittedAnswer
            }
        })
    }
    return answer
}
console.log(newCrap(object))

const crapobj = {
    quiz: {
        name: "The quiz name",
    },
    questions: [
        {
            question: "The question text",
            correctAnswer: "the correct answer",
            submittedAnder: "The users submitted answer",
            isCorrect: false
        }
    ]
}
