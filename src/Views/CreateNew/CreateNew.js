import React, { Component } from 'react'
import './CreateNew.css'
import Stepper from '../../Shared/Stepper/Stepper'


export default class CreateNew extends Component {
    render() {
        return (
            <div className='CreateNewApp'>
                <img className='createImg' src="https://images.unsplash.com/flagged/photo-1554757388-5982229b9ce7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" alt="pic"/>
                {/* <img className='createImg' src="https://images.unsplash.com/photo-1520599665522-f2f2ff591f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" alt="pic"/> */}
                <Stepper history={this.props.history} />
            </div>
        )
    }
}
