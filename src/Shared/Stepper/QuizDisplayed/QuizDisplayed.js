import React, { Component } from 'react'
import { connect } from 'react-redux';

class QuizDisplayed extends Component {
    render() {
        return (
            <div>
                 <div>
                     {this.props.question}
                 </div>
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(QuizDisplayed)