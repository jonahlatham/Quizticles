import React, { Component } from 'react'
import axios from 'axios'
import './Discover.css'
import { Link } from "react-router-dom"

export default class Discover extends Component {

    state = {
        quizzes: [],
        filteredInput: '',
        filteredQuizzes: [],
    }

    componentDidMount() {
        axios.get('/api/quiz')
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        quizzes: response.data.quiz,
                        filteredQuizzes: response.data.quiz
                    })
                } else {
                    this.props.history.push('/')
                }
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        let allQuizzes = this.state.quizzes.reduce((r, e, i) => {
            if(e.name.toLowerCase().includes(this.state.filteredInput)){
                r.push(
                    <Link key={e.id} className='link' to={`/quiz/${e.id}`}>
                        <div style={{ background: e.genre_id === 1 ? '#06810c' : e.genre_id === 2 ? '#100e7e' : e.genre_id === 3 ? '#aa1414' : e.genre_id === 4 ? '#dbdb33' : e.genre_id === 5 ? '#d48f0e' : '#cec9c9', color: e.genre_id === 6 || e.genre_id === 4 ? 'black' : 'white' }} className='quizzesDisplayed'>
                            {e.name}
                            <br />
                            <small className='discoverSmall'>{e.genre_id === 1 ? 'History' : e.genre_id === 2 ? 'Science' : e.genre_id === 3 ? 'Math' : e.genre_id === 4 ? 'Pop Culture' : e.genre_id === 5 ? 'Culinary' : 'Misc'}</small>
                        </div>
                    </Link>
                )
            }
            return r
        }, [])

        return (
            <div className='discoverApp'>
                <input type="text" name='filteredInput' value={this.state.filteredInput} onChange={this.handleChange} />
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
