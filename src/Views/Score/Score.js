import React, { Component } from 'react'
import './Score.css'
import axios from 'axios'

export default class Edit extends Component {
    state = {
        quiz: []
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
        let correctedQuiz = Object.keys(this.state.quiz).map((e)=>{
            console.log(e)
            return e
        })
        return (
            <div>
                {correctedQuiz}
                Score
            </div>
        )
    }
}
