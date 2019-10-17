import React, { Component } from 'react'
import axios from 'axios'
import './TakeQuiz.css'

export default class TakeQuiz extends Component {
    state = {
        quiz: null,
        submittedAnswer: [],
    }

    componentDidMount() {
        axios.get(`/api/quiz/${this.props.match.params.id}`)
            .then((response) => {
                this.setState({
                    quiz: response.data
                })
                console.log(response.data)
            })
    }

    handleChange = (event) => {
        this.setState({
            [`valueChecked_${event.target.name}`]: event.target.value,
        })
    }

    handleSubmit = () => {
        debugger
        let body = {
            quiz_id: this.state.quiz.quiz.id,
            submittedAnswer: this.state.quiz.questions.map((e)=>{
                return {question_id: Number(e.id), answer_id: Number(this.state[`valueChecked_${e.id}`])}
            })
        }
        axios.post('/api/quiz/', body)
            .then((response) => {
                debugger
                if (response.data.success) {
                    this.props.history.push('/Home')
                } else {
                    this.props.history.push('/')
                }
            })
    }

    render() {
        let takeQuiz
        if (this.state.quiz === null) {
            return 'loading...'
        } else {
            takeQuiz = this.state.quiz.questions.map((e, i) => {
                return (
                    <div className='takeQuizQuiz' key={e.id}>
                        <div className='takeQuizQuestion'><strong>{e.question}</strong></div>
                        <div>
                            {e.answers.map((answer, i) => {
                                return <div className='takeQuizAnswers' key={answer.id}> <input name={answer.question_id} value={answer.id} checked={this.state[`valueChecked_${answer.question_id}`] === answer.id.toString()} onChange={this.handleChange} type="radio" /> {answer.answer}</div>
                            })}
                        </div>
                    </div>
                )
            })
        }

        return (
            <div>
                <div className='takeQuizQuizName'><u>{this.state.quiz.quiz.name}</u></div>
                <br />
                {takeQuiz}
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}
