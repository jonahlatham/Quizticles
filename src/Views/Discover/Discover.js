import React, { Component } from 'react'
import axios from 'axios'
import './Discover.css'

export default class Discover extends Component {

    state = {
        quizzes: []
    }

    componentDidMount(){
        axios.get('/api/quiz')
            .then((response)=>{
    if(response.data.success){
                this.setState({
                    quizzes: response.data.quiz
                })
            } else {
                this.props.history.push('/')
            }
            })
    }

    render() {
        let allQuizzes = this.state.quizzes.map((e,i)=>{
            return <div className='quizzesDisplayed' key={e.id}>{e.name}</div>
        })
        return (
            <div className='listedQuizzes'>
                <div>
                    
                </div>
                {allQuizzes}
            </div>
        )
    }
}
