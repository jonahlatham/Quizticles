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
            <select onChange={this.handleChoiceChange}>
                <option value="">Type</option>
                <option value='Multiple Choice'>Multiple Choice</option>
            </select>
        )
    }
}

export default connect((storeObject) => { return storeObject })(QuizType)