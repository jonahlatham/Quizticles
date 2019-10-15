import React, { Component } from 'react'
import './CreateNew.css'
import Stepper from '../../Shared/Stepper/Stepper'


export default class CreateNew extends Component {
    render() {
        return (
            <div>
                {/* <img className='createImg' src="https://images.unsplash.com/photo-1520970014086-2208d157c9e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="pic"/> */}
                <Stepper history={this.props.history} />
            </div>
        )
    }
}
