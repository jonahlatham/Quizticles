import React, { Component } from 'react'
import axios from 'axios'
import './TakeQuiz.css'

export default class TakeQuiz extends Component {
    state = {
        quiz: null,
        isChecked: ''
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
            [event.target.name]: event.target.checked,
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
                                return <div className='takeQuizAnswers' key={answer.id}> <input name={answer.id} checked={this.state.isChecked} onChange={this.handleChange} type="radio" /> {answer.answer}</div>
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
                <button>Submit</button>
            </div>
        )
    }
}
