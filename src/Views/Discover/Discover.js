import React, { Component } from 'react'
import axios from 'axios'
import './Discover.css'
import { Link } from "react-router-dom"
import { connect } from 'react-redux';

class Discover extends Component {

    state = {
        quizzes: [],
        filteredInput: '',
        filteredQuizzes: [],
        creatorOfQuizzes: [],
        user: []
    }

    componentDidMount() {
        axios.get('/api/quiz')
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        quizzes: response.data.quiz,
                        filteredQuizzes: response.data.quiz,
                        creatorOfQuizzes: response.data.quiz
                    })
                } else {
                    this.props.history.push('/')
                }
                console.log(response.data)
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        let allQuizzes = this.state.quizzes.reduce((r, e, i) => {
            if (e.name.toLowerCase().includes(this.state.filteredInput)) {
                r.push(
                    <Link key={e.id} className='link discoverLinkToFixCrap' to={`/quiz/${e.id}`}>
                        <div className='quizzesDisplayed'>
                            <img className='discoverQuizImg' src={e.img} alt="img" />
                            <div>
                                {e.name}
                                <br />
                                <small className='discoverSmall'>{e.genre_id === 1 ? 'History' : e.genre_id === 2 ? 'Science' : e.genre_id === 3 ? 'Math' : e.genre_id === 4 ? 'Pop Culture' : e.genre_id === 5 ? 'Culinary' : 'Misc'}</small>
                                <br/>
                                <small className='discoverCreator'>Creator: {e.creator}</small>
                            </div>
                        </div>
                    </Link>
                )
            }
            return r
        }, [])

        return (
            <div className='discoverApp'>
                <div className='discoverInputSearchBox'>
                    <img className='discoverSearchImg' src="https://image.flaticon.com/icons/svg/751/751463.svg" alt="search" />
                    <input className='discoverSearch' placeholder='Search' type="text" name='filteredInput' value={this.state.filteredInput} onChange={this.handleChange} />
                </div>
                <div className='listedQuizzes'>
                    <div className='discoverFlexer'>
                        {allQuizzes}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Discover)