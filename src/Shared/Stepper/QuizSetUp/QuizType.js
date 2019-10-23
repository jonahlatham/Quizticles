import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'

class QuizType extends Component {

    state = {
        genreType: [],
    }
    componentDidMount() {
        axios.get('/api/genre')
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

    handleChoiceChange = (event) => {
        this.props.dispatch({
            type: 'SET_GENRE_ID',
            payload: event.target.value,
        })
    }
    render() {
        const options = this.state.genreType.map((e, i) => {
            return <option key={e.id} value={e.id}>
                {e.genre.toUpperCase()}
            </option>
        })
        return (
            <select onChange={this.handleChoiceChange}>
                <option value="">Type</option>
                {/* <option value='Multiple Choice'>Multiple Choice</option> */}
                {options}
            </select>
        )
    }
}

export default connect((storeObject) => { return storeObject })(QuizType)