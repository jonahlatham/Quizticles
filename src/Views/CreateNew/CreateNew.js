import React, { Component } from 'react'
import './CreateNew.css'
import Stepper from '../../Shared/Stepper/Stepper'

export default class CreateNew extends Component {
    render() {
        return (
            <div className='CreateNewApp'>
                <Stepper history={this.props.history} dispatch={this.props.dispatch} />
            </div>
        )
    }
}
