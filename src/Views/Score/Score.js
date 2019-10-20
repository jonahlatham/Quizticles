import React, { Component } from 'react'
import './Score.css'
import axios from 'axios'

export default class Edit extends Component {
    state = {
<<<<<<< HEAD
        quiz: null
=======
        quiz: []
>>>>>>> 28c909fefa7a29ec1b3a5d83ff5f3c53915559f9
    }

    componentDidMount(id) {
        axios.get(`/api/score/${this.props.match.params.id}`)
            .then((response) => {
                this.setState({
                    quiz: response.data
                })
                console.log(response.data)
                console.log(this.state.quiz.quiz.id)
            })
    }

    render() {
<<<<<<< HEAD
        // debugger
        let correctedQuiz;

        if (this.state.quiz) {
            const questions = this.state.quiz.questions.map((e) => {
                return (
                    <div key={e.id} className='scoreQuizzes' style={{borderColor: this.state.quiz.submitted_answer[this.state.quiz.submitted_answer.length-1].selected_correct === true ? 'green' : 'red'}}>
                        <div className='scoreQuestions'>{e.question}</div>
                        <div>
                            {e.answers.map((e) => {
                                return <div style={{background: e.answers[1]}} className='scoreAnswers' key={e.id}>{e.answer}</div>
                            })}
                        </div>
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
=======
        let correctedQuiz = Object.keys(this.state.quiz).map((e)=>{
            console.log(e)
            return e
        })
        return (
            <div>
                {correctedQuiz}
                Score
>>>>>>> 28c909fefa7a29ec1b3a5d83ff5f3c53915559f9
            </div>
        )
    }
}
