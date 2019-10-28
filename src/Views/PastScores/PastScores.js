import React, { Component } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

export default class PastScores extends Component {

    state = {
        quizzes: [],
        filteredQuizzes: [],
        creatorOfQuizzes: '',
    }

    componentDidMount() {
        axios.get('/api/pastScores')
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        quizzes: response.data.quiz,
                        filteredQuizzes: response.data.quiz,
                        creatorOfQuizzes: response.data.quiz
                    })
                } else {
                    this.props.history.push('/')
                }
                console.log(response.data)
            })
    }

    render() {
        let allQuizzes = this.state.quizzes.reduce((r, e, i) => {
            r.push(
                <Link key={e.id} className='link discoverLinkToFixCrap' to={`/quiz/score/${e.id}`}>
                    <div className='quizzesDisplayed'>
                        <img className='discoverQuizImg' src={e.img} alt="img" />
                        <div>
                            {e.name}
                            <br />
                            <small className='discoverSmall'>{e.genre_id === 1 ? 'History' : e.genre_id === 2 ? 'Science' : e.genre_id === 3 ? 'Math' : e.genre_id === 4 ? 'Pop Culture' : e.genre_id === 5 ? 'Culinary' : 'Misc'}</small>
                            <br />
                            <small className='discoverCreator'>Creator: {e.creator}</small>
                        </div>
                    </div>
                </Link>
            )
            return r
        }, [])
        return (
            <div className='discoverFlexer'>
                {allQuizzes}
            </div>
        )
    }
}
