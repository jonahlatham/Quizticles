import React, { Component } from 'react'
import './Score.css'
import axios from 'axios'

function newCrap(obj) {
    let answer = {
        quiz: {
            name: obj.quiz.name
        },
        questions: obj.questions.map(function (e) {
            const submittedAnswerId = obj.submitted_answer.filter((sa) => {
                if (sa.question_id === e.id) {
                    return true
                } else {
                    return false
                }
            }).reverse()[0].answer_id
            return {
                question: e.question,
                correctAnswer: e.answers.reduce((r, answer) => {
                    if (answer.is_correct) {
                        r = answer.answer
                    }
                    return r
                }, ''),
                submittedAnswer: e.answers.reduce((r, ssa) => {
                    if (ssa.id === submittedAnswerId) {
                        r = ssa
                    }
                    return r
                }, ''),
            }
        })
    }
    return answer
}
export default class Edit extends Component {
    state = {
        quiz: null
    }
    componentDidMount() {
        axios.get(`/api/score/${this.props.match.params.id}`)
            .then((response) => {
                this.setState({
                    quiz: newCrap(response.data)
                })
                console.log(response.data)
                console.log(this.state.quiz.quiz.id)
            })
    }

    render() {
        // debugger
        let correctedQuiz;

        if (this.state.quiz) {
            const questions = this.state.quiz.questions.map((e) => {
                return (
                    <div key={e.id} className='scoreQuizzes' style={{background: e.correctAnswer === e.submittedAnswer.answer ? 'green' : 'red'}}>
                        <div className='scoreQuestions'>{e.question}</div>
                        <div style={{background: e.correctAnswer !== e.submittedAnswer.answer ? 'green' : '', width: '350px', margin: 'auto', borderRadius: '25px', marginTop: '2px'}}>
                            {e.correctAnswer}
                        </div>
                        <div style={{background: e.correctAnswer !== e.submittedAnswer ? 'yellow' : '', width: '350px', margin: 'auto', borderRadius: '25px', marginTop: '2px'}}>
                            {/* {e.submittedAnswer.answer} */}
                            {e.correctAnswer === e.submittedAnswer.answer ? '' : e.submittedAnswer.answer}
                        </div>
                        {/* <div>
                            {e.answers.map((e) => {
                                return <div className='scoreAnswers' key={e.id}>{e.answer}</div>
                            })}
                        </div> */}
                    </div>
                )
            })
            correctedQuiz = (
                <div>
                    <h1>{this.state.quiz.quiz.name}</h1>
                    <div>
                        {questions}
                    </div>
                </div>
            )
        } else {
            correctedQuiz = 'Loading...'
        }
        return (
            <div>
                {correctedQuiz}
            </div>
        )
    }
}
