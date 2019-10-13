import React, { Component } from 'react'
import axios from 'axios'
import './Discover.css'
import { Link } from "react-router-dom"

export default class Discover extends Component {

    state = {
        quizzes: []
    }
    handleGenreImg = () => {
        switch (this.state.quizzes.genre_id) {
            case 1:
                return <img className='discoverSwitchImg' src="https://images.unsplash.com/photo-1472173148041-00294f0814a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="history" /> //history
            case 2:
                return <img className='discoverSwitchImg' src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="science" /> //science
            case 3:
                return <img className='discoverSwitchImg' src="https://images.unsplash.com/photo-1509869175650-a1d97972541a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="math" /> //math
            case 4:
                return <img className='discoverSwitchImg' src="https://images.unsplash.com/photo-1569701813229-33284b643e3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1988&q=80" alt="pop culture" /> //Pop_Culture
            case 5:
                return <img className='discoverSwitchImg' src="https://images.unsplash.com/reserve/EnF7DhHROS8OMEp2pCkx_Dufer%20food%20overhead%20hig%20res.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1957&q=80" alt="culinary" /> //Culinary
            case 6:
                return <img className='discoverSwitchImg' src="https://images.unsplash.com/photo-1517562652858-8d863a9e0931?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1302&q=80" alt="general" /> //General
        }
    }

    componentDidMount() {
        axios.get('/api/quiz')
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        quizzes: response.data.quiz
                    })
                    this.handleGenreImg()
                } else {
                    this.props.history.push('/')
                }
            })
    }


    render() {
        let allQuizzes = this.state.quizzes.map((e, i) => {
            return (
                <Link className='link' to='`/discoverquiz/:${e.id}`'>
                <div className='quizzesDisplayed' key={e.id}>
                        {e.name}
                        <br />
                        {e.genre_id}
                    </div>
                </Link>
            )
        })
        return (
            <div className='discoverApp'>
                <div className='listedQuizzes'>
                    <div>
                        <img className='discoverImg' src="https://images.unsplash.com/photo-1504610926078-a1611febcad3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" alt='img' />
                    </div>
                    {allQuizzes}
                </div>
            </div>
        )
    }
}
