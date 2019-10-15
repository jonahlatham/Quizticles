import React, { Component } from 'react'
import axios from 'axios'
import './Discover.css'
import { Link } from "react-router-dom"

export default class Discover extends Component {

    state = {
        quizzes: []
    }

    componentDidMount() {
        axios.get('/api/quiz')
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        quizzes: response.data.quiz
                    })
                } else {
                    this.props.history.push('/')
                }
            })
    }


    render() {
        let allQuizzes = this.state.quizzes.map((e, i) => {
            if (e.is_private !== true) {
                return (
                    <Link className='link' to={`/quiz/${e.id}`}>
                        <div style={{ background: e.genre_id === 1 ? 'green' : e.genre_id === 2 ? 'blue' : e.genre_id === 3 ? 'red' : e.genre_id === 4 ? 'yellow' : e.genre_id === 5 ? 'orange' : 'white', color: e.genre_id === 6 || e.genre_id === 4 ? 'black' : 'white' }} className='quizzesDisplayed' key={e.id}>
                            {e.name}
                            <br />
                            <small className='discoverSmall'>{e.genre_id === 1 ? 'History' : e.genre_id === 2 ? 'Science' : e.genre_id === 3 ? 'Math' : e.genre_id === 4 ? 'Pop Culture' : e.genre_id === 5 ? 'Culinary' : 'Misc'}</small>
                        </div>
                    </Link>
                )
            }
        })
        return (
            <div className='discoverApp'>
                <div className='listedQuizzes'>
                    <div>
                        <img className='discoverImg' src="https://images.unsplash.com/photo-1504610926078-a1611febcad3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" alt='img' />
                    </div>
                    <div className='discoverFlexer'>
                        {allQuizzes}
                    </div>
                </div>
            </div>
        )
    }
}
