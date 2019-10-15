import React, { Component } from 'react'
import axios from 'axios'
import './TakeQuiz.css'

export default class TakeQuiz extends Component {
    state = {
        quiz: []
    }

    componentDidMount() {
        axios.get('/api/savedQuiz')
            .then((response) => {
                this.setState({
                    quiz: response.data
                })
                console.log(response.data)
            })
    }

    render() {

        const takeQuiz = this.state.quiz.map((e,i)=>{
            return e.name
        })

        return (
            <div>
                {takeQuiz}
            </div>
        )
    }
}
