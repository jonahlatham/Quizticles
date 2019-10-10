import React, { Component } from 'react'
import './Home.css'
import { Link } from "react-router-dom"

export default class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    <img className='homeImg' src="https://images.unsplash.com/photo-1515787366009-7cbdd2dc587b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="pic" />
                </div>
                <div className='homeDiv'>
                    <div className='homeBlurBack'>
                        <div className='homeText'><p>Text for Quizzes <br /> text <br /> txt <br />more txt</p>
                        </div>
                        <div className='homeButtonsDiv'>
                            <Link className='homeLink' to='/createquiz'><button className='homeButtons'> Create New </button> </Link>
                            <Link className='homeLink' to='/quiz/reviewsubmissions/:id'><button className='homeButtons'>Your Quizzes</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}