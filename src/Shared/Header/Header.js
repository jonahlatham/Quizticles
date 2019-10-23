import React, { Component } from 'react'
import { Link } from "react-router-dom"
import './Header.css'
import axios from 'axios'
import { withRouter } from "react-router";
import { connect } from 'react-redux';

class Header extends Component {
    state = {
        makeWhite: false,
    }

    handleWhiteTrue = () => {
        this.setState({
            makeWhite: true
        })
    }

    handleWhiteFalse = () => {
        this.setState({
            makeWhite: false
        })
    }

    handleLogout = () => {
        axios.delete('/auth/user')
            .then((response) => {
                if (response.data.success) {
                    this.props.dispatch({
                        type: 'LOGOUT',
                    })
                    this.props.history.push('/')
                } else {
                    alert('something blew up')
                }
            })
    }

    render() {
        return (
            <div >
                {
                    this.props.user ? (
                        <div className='header'>
                            <div className='headerLeft'>
                                <Link onClick={this.handleWhiteFalse} style={{ color: this.state.makeWhite === true ? 'white' : 'black' }} className='link headLink' to='/Home'>Home</Link>
                                <Link onClick={this.handleWhiteFalse} style={{ color: this.state.makeWhite === true ? 'white' : 'black' }} className='link headLink' to='/createquiz'>Create New</Link>
                                <Link onClick={this.handleWhiteTrue} style={{ color: this.state.makeWhite === true ? 'white' : 'black' }} className='link headLink' to='/discoverquiz'>Discover</Link>
                                {/* <Link onClick={this.handleWhiteFalse} style={{ color: this.state.makeWhite === true ? 'white' : 'black' }} className='link headLink' to='/userprofile'>Profile</Link> */}
                                <Link onClick={this.handleWhiteFalse} style={{ color: this.state.makeWhite === true ? 'white' : 'black' }} className='link headLink' to='/quiz/reviewsubmissions/:id'>Review</Link>
                            </div>
                            <div className='headerRight'>
                                {this.props.user ? <button className='logoutButton' onClick={this.handleLogout}>Logout</button> : <Link className='' to='/'>Login</Link>}
                            </div>
                        </div>
                    ) : ''
                }
            </div>
        )
    }
}


export default connect((storeObject) => { return storeObject })(withRouter(Header))