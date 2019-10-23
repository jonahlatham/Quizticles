import React, { Component } from 'react'
import './Review.css'
import axios from 'axios'
import { Link } from "react-router-dom"

export default class Review extends Component {
    state = {
        reviewQuizzes: [],
        user: []
    }

    componentDidMount() {
        axios.get('/api/quiz')
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        reviewQuizzes: response.data.quiz,
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
        console.log(this.state.user)
    }

    handleDelete = (id) => {
        debugger
        axios.delete(`/api/quiz/${id}`)
            .then((response) => {
                debugger
                return axios.get('/api/quiz')
            })
            .then((response) => {
                debugger
                if (response.data.success) {
                    this.setState({
                        reviewQuizzes: response.data.quiz
                    })
                } else {
                    this.props.history.push('/')
                }
            })
    }

    render() {
        let historyQuiz = this.state.reviewQuizzes.reduce((r, e, i) => {
            if (e.creator_id === this.state.user.user.id && e.genre_id === 1) {
                r.push(
                    <div key={e.id} className='reviewQuizzesDisplayed'>
                        {e.name}
                        <br /><br /><br />
                        <button className='reviewButton' onClick={() => { this.handleDelete(e.id) }}>Delete</button>
                        <br />
                        <Link key={e.id} to={`/quiz/${e.id}`}><button className='reviewButton'>Review</button></Link>
                    </div>
                )
            }
            return r
        }, [])
        let scienceQuiz = this.state.reviewQuizzes.reduce((r, e, i) => {
            if (e.creator_id === this.state.user.user.id && e.genre_id === 2) {
                r.push(
                    <div key={e.id} className='reviewQuizzesDisplayed' >
                        {e.name}
                        <br /><br /><br />
                        <button className='reviewButton' onClick={() => { this.handleDelete(e.id) }}>Delete</button>
                        <br />
                        <Link key={e.id} to={`/quiz/${e.id}`}><button className='reviewButton'>Review</button></Link>                    </div>
                )
            }
            return r
        }, [])
        let mathQuiz = this.state.reviewQuizzes.reduce((r, e, i) => {
            if (e.creator_id === this.state.user.user.id && e.genre_id === 3) {
                r.push(
                    <div key={e.id} className='reviewQuizzesDisplayed'>
                        {e.name}
                        <br /><br /><br />
                        <button className='reviewButton' onClick={() => { this.handleDelete(e.id) }}>Delete</button>
                        <br />
                        <Link key={e.id} to={`/quiz/${e.id}`}><button className='reviewButton'>Review</button></Link>
                    </div>
                )
            }
            return r
        }, [])
        let popCultureQuiz = this.state.reviewQuizzes.reduce((r, e, i) => {
            if (e.creator_id === this.state.user.user.id && e.genre_id === 4) {
                r.push(
                    <div key={e.id} className='reviewQuizzesDisplayed' >
                        {e.name}
                        <br /><br /><br />
                        <button className='reviewButton' onClick={() => { this.handleDelete(e.id) }}>Delete</button>
                        <br />
                        <Link key={e.id} to={`/quiz/${e.id}`}><button className='reviewButton'>Review</button></Link>
                    </div>
                )
            }
            return r
        }, [])
        let culinaryQuiz = this.state.reviewQuizzes.reduce((r, e, i) => {
            if (e.creator_id === this.state.user.user.id && e.genre_id === 5) {
                r.push(
                    <div key={e.id} className='reviewQuizzesDisplayed'>
                        {e.name}
                        <br /><br /><br />
                        <button className='reviewButton' onClick={() => { this.handleDelete(e.id) }}>Delete</button>
                        <br />
                        <Link key={e.id} to={`/quiz/${e.id}`}><button className='reviewButton'>Review</button></Link>
                    </div>
                )
            }
            return r
        }, [])
        let miscQuiz = this.state.reviewQuizzes.reduce((r, e, i) => {
            if (e.creator_id === this.state.user.user.id && e.genre_id === 6) {
                r.push(
                    <div key={e.id} className='reviewQuizzesDisplayed'>
                        {e.name}
                        <br /><br /><br />
                        <button className='reviewButton' onClick={() => { this.handleDelete(e.id) }}>Delete</button>
                        <br />
                        <Link key={e.id} to={`/quiz/${e.id}`}><button className='reviewButton'>Review</button></Link>
                    </div>
                )
            }
            return r
        }, [])
        return (
            <div>
                <div className='reviewFlexDivs'>
                    <strong>History</strong>
                    <div className='reviewDivs'>
                        {historyQuiz}
                    </div>
                    <strong>Science</strong>
                    <div className='reviewDivs'>
                        {scienceQuiz}
                    </div>
                    <strong>Math</strong>
                    <div className='reviewDivs'>
                        {mathQuiz}
                    </div>
                    <strong>Pop Culture</strong>
                    <div className='reviewDivs'>
                        {popCultureQuiz}
                    </div>
                    <strong>Culinary</strong>
                    <div className='reviewDivs'>
                        {culinaryQuiz}
                    </div>
                    <strong>Misc</strong>
                    <div className='reviewDivs'>
                        {miscQuiz}
                    </div>
                </div>
            </div>
        )
    }
}
