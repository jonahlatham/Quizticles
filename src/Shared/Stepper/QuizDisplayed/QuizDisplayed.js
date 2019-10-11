import React, { Component } from 'react'
import { connect } from 'react-redux';
import './QuizDisplayed.css'

class QuizDisplayed extends Component {
    handleEditReview = (question) => {
        this.props.dispatch({
            type: 'SET_EDIT',
            payload: question,
        })
        this.props.handleEditReview()
    }

    handleDelete = (id) => {
        const unDeletedList = this.props.questions.filter((e, i) => {
            if (id === e.id) {
                return false
            } else {
                return true
            }
        })
        this.props.dispatch({
            type: 'SET_QUESTIONS',
            payload: unDeletedList
        })
    }
    render() {
        const quizThings = this.props.questions.map((e, i) => {
            let answers = e.answers.map((e, i) => {
                return <div className='answers' style={{ background: e.is_correct === true ? 'green' : 'red' }} key={e.id}>{e.answer}</div>
            })
            return <div key={e.id} className='questionDisplayed'>
                <u>{e.question}</u>
                <br /><br />
                {answers}
                <button onClick={() => { this.handleDelete(e.id) }}>Delete</button>
                <button onClick={() => { this.handleEditReview(e) }}>Edit</button>
            </div>

        })

        return (
            <div>
                <div>
                    {quizThings}
                </div>
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(QuizDisplayed)