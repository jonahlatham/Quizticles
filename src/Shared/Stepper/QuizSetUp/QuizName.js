import React, { Component } from 'react'
import QuizType from './QuizType'
import { connect } from 'react-redux';

class QuizName extends Component {
    handleNameChange = (event) => {
        this.props.dispatch({
            type: 'SET_QUIZ_NAME',
            payload: event.target.value,
        })
    }
    handleQuizImg = (event) => {
        this.props.dispatch({
            type: 'SET_QUIZ_IMG',
            payload: event.target.value,
        })
    }
    handlePrivateChange = (event) => {
        this.props.dispatch({
            type: 'SET_IS_PRIVATE',
            payload: event.target.checked
        })
    }
    render() {
        return (
            <div>
                <h2>Quiz Name</h2>
                <input value={this.props.quizName} onChange={this.handleNameChange} />
                <br />
                <QuizType history={this.props.history} />
                <br />
                <input name='isPrivate' checked={this.props.is_private} onChange={this.handlePrivateChange} type="checkBox" /> Private
                <br />
                <input type="text" value={this.props.quizImg} onChange={this.handleQuizImg} />
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(QuizName)