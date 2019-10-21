import React, { Component } from 'react'
import './Home.css'
import { Link } from "react-router-dom"
import axios from 'axios'

export default class Home extends Component {
    state = {
        homeQuiz: [],
        user: []
    }

    componentDidMount() {
        axios.get('/api/quiz')
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        homeQuiz: response.data.quiz,
                        // user: response.data
                    })
                } else {
                    this.props.history.push('/')
                }
            })
        axios.get('/auth/user')
            .then((response) => {
                this.setState({
                    user: response.data
                })
            })
    }
    render() {
        let homeQuizzes = this.state.homeQuiz.map((e, i) => {
            if (this.state.homeQuiz.creator_id === this.state.user.user.id) {
                return (
                    <div key={e.id} className='homeQuizDisplayed'>
                        {e.name}
                    </div>
                )
            } else {
                return ''
            }

        })
        return (
            <div>
                <div>
                    <img className='homeImg' src="https://images.unsplash.com/photo-1515787366009-7cbdd2dc587b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="pic" />
                </div>
                <div className='homeDiv'>
                    <div className='homeBlurBack'>
                        <Link className='homeTextLink' to='/quiz/reviewsubmissions/:id'>
                            <div className='homeText'>
                                <strong>Your Quizzes</strong>
                                <br />
                                {homeQuizzes}
                            </div>
                        </Link>
                        <div className='homeButtonsDiv'>
                            <Link className='homeLink' to='/createquiz'><button className='homeButtons'> Create New </button> </Link>
                            <Link className='homeLink' to='/quiz/reviewsubmissions/:id'><button className='homeButtons'>Review Quizzes</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
