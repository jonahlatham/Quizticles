import React, { Component } from 'react'
import { connect } from 'react-redux';

class Answer extends Component {
    state = {
        answer: '',
        isCorrect: false,
        isEdit: false,
        editedId: 0
    }

    handleAdd = (event) => {
        this.props.dispatch({
            type: 'SET_ANSWERS',
            payload: [...this.props.answers, { id: this.props.answers.length + 1, answer: this.state.answer, is_correct: this.state.isCorrect }]
        })
        this.setState({
            answer: '',
            isCorrect: false,
            isEdit: false
        })
    }

    handleChange = (event) => {
        const { target } = event
        this.setState({
            [target.name]: target.type === 'checkbox' ? target.checked : target.value
        })
    }
    handleEdit = (ans) => {
        this.setState({
            answer: ans.answer,
            isCorrect: ans.isCorrect,
            isEdit: true,
            editedId: ans.id
        })
    }

    handleSave = () => {
        this.props.dispatch({
            type: 'SET_ANSWERS',
            payload: this.props.answers.map((e) => {
                if (e.id === this.state.editedId) {
                    e.answer = this.state.answer
                    e.is_correct = this.state.isCorrect
                }
                return e
            })
        })
        this.setState({
            answer: '',
            isCorrect: false,
            editedId: 0,
            isEdit: false
        })
    }

    render() {
        const answers = this.props.answers.map((e, i) => {
            return (
                <div key={i} style={{ background: `${e.is_correct === true ? 'green' : 'red'}` }}>
                    <div>{e.answer}</div>
                    <button onClick={() => { this.handleEdit(e) }}>Edit</button>
                </div>
            )
        })
        return (
            <div>
                {answers}
                <div>
                    <input name='answer' value={this.state.answer} onChange={this.handleChange} />
                    <div>
                        <label>Correct Answer</label>
                        <input name='isCorrect' checked={this.state.isCorrect} onChange={this.handleChange} type="checkBox" />
                    </div>
                    {this.state.isEdit === false ? <button onClick={this.handleAdd}>Add</button> : <button onClick={this.handleSave}>Save</button>}
                </div>
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Answer)