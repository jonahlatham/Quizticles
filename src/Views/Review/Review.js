import React, { Component } from 'react'
import './Review.css'
import axios from 'axios'

export default class Review extends Component {
    state = {
        reviewQuizzes: []
    }

    componentDidMount() {
        axios.get('/api/quiz')
            .then((response) => {
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
            if (e.creator_id && e.genre_id === 1) {
                r.push(
                    <div key={e.id} className='reviewQuizzesDisplayed' style={{ background: 'green' }}>
                        {e.name}
                        <br /><br /><br />
                        <button>Delete</button>
                        <button>Review</button>
                    </div>
                )
            }
            return r
        }, [])
        let scienceQuiz = this.state.reviewQuizzes.reduce((r, e, i) => {
            if (e.creator_id && e.genre_id === 2) {
                r.push(
                    <div key={e.id} className='reviewQuizzesDisplayed' style={{ background: 'blue' }}>
                        {e.name}
                        <br /><br /><br />
                        <button>Delete</button>
                        <button>Review</button>
                    </div>
                )
            }
            return r
        }, [])
        let mathQuiz = this.state.reviewQuizzes.reduce((r, e, i) => {
            if (e.creator_id && e.genre_id === 3) {
                r.push(
                    <div key={e.id} className='reviewQuizzesDisplayed' style={{ background: 'red' }}>
                        {e.name}
                        <br /><br /><br />
                        <button>Delete</button>
                        <button>Review</button>
                    </div>
                )
            }
            return r
        }, [])
        let popCultureQuiz = this.state.reviewQuizzes.reduce((r, e, i) => {
            if (e.creator_id && e.genre_id === 4) {
                r.push(
                    <div key={e.id} className='reviewQuizzesDisplayed' style={{ background: 'yellow' }}>
                        {e.name}
                        <br /><br /><br />
                        <button>Delete</button>
                        <button>Review</button>
                    </div>
                )
            }
            return r
        }, [])
        let culinaryQuiz = this.state.reviewQuizzes.reduce((r, e, i) => {
            if (e.creator_id && e.genre_id === 5) {
                r.push(
                    <div key={e.id} className='reviewQuizzesDisplayed' style={{ background: 'orange' }}>
                        {e.name}
                        <br /><br /><br />
                        <button>Delete</button>
                        <button>Review</button>
                    </div>
                )
            }
            return r
        }, [])
        let miscQuiz = this.state.reviewQuizzes.reduce((r, e, i) => {
            if (e.creator_id && e.genre_id === 6) {
                r.push(
                    <div key={e.id} className='reviewQuizzesDisplayed' style={{ background: 'white' }}>
                        {e.name}
                        <br /><br /><br />
                        <button>Delete</button>
                        <button>Review</button>
                    </div>
                )
            }
            return r
        }, [])
        return (
            <div>
                <div>
                    <img className='reviewImg' src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="img" />
                </div>
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
