import React, { Component } from 'react'
import { connect } from 'react-redux';

class Question extends Component {
    handleQuestionChange = (event) => {
        this.props.dispatch({
            type: 'SET_QUESTION',
            payload: event.target.value,
        })
    }
    render() {
        return (
            <div>
                <h2>Question</h2>
                <textarea value={this.props.question} onChange={this.handleQuestionChange} />
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Question)