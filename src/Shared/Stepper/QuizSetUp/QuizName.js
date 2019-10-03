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
    render() {
        return (
            <div>
                <h2>Quiz Name</h2>
                <input value={this.props.QuizName} onChange={this.handleNameChange} />
                <br />
                <QuizType />
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(QuizName)