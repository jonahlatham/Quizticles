import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'

class Question extends Component {
    state = {
        genreType: [],
    }
    componentDidMount() {
        axios.get('/api/questionType')
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        genreType: response.data.genre
                    })
                } else{
                    this.props.history.push('/')
                }
            })
    }

    handleQuestionChange = (event) => {
        this.props.dispatch({
            type: 'SET_QUESTION',
            payload: event.target.value,
        })
    }

    handleChoiceChange = (event) => {
        this.props.dispatch({
            type: 'SET_QUESTION_GENRE_ID',
            payload: event.target.value,
        })
    }
    render() {
        const options = this.state.genreType.map((e, i) => {
            return <option key={e.id} value={e.id}>
                {e.genre}
            </option>
        })
        return (
            <div>
                <h2>Question</h2>
                <textarea value={this.props.question} onChange={this.handleQuestionChange} />
                <br />
                <select onChange={this.handleChoiceChange}>
                <option value="">Type</option>
                {options}
            </select>
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Question)