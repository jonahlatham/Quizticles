import React, { Component } from 'react'
import { connect } from 'react-redux';

class QuizType extends Component {
    handleChoiceChange = (event) => {
        this.props.dispatch({
            type: 'SET_QUIZ_TYPE',
            payload: event.target.value,
        })
    }
    render() {
        return (
            <select>
                <option value="">Type</option>
                <option onChange={this.handleChoiceChange} value={this.props.quiz_type}>Multiple Choice</option>
            </select>
        )
    }
}

export default connect((storeObject) => { return storeObject })(QuizType)