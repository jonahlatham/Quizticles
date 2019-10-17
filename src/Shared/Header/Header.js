import React, { Component } from 'react'
import { Link } from "react-router-dom"
import './Header.css'
import axios from 'axios'
import { withRouter } from "react-router";

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
                    this.props.history.push('/')
                } else {
                    alert('something blew up')
                }
            })
    }

    render() {
        return (
            <div className='Header' >
                <Link onClick={this.handleWhiteFalse} style={{ color: this.state.makeWhite === true ? 'white' : 'black' }} className='link' to='/Home'>Home</Link>
                <Link onClick={this.handleWhiteFalse} style={{ color: this.state.makeWhite === true ? 'white' : 'black' }} className='link' to='/createquiz'>Create New</Link>
                <Link onClick={this.handleWhiteTrue} style={{ color: this.state.makeWhite === true ? 'white' : 'black' }} className='link' to='/discoverquiz'>Discover</Link>
                {/* <Link onClick={this.handleWhiteFalse} style={{ color: this.state.makeWhite === true ? 'white' : 'black' }} className='link' to='/userprofile'>Profile</Link> */}
                <Link onClick={this.handleWhiteFalse} style={{ color: this.state.makeWhite === true ? 'white' : 'black' }} className='link' to='/quiz/reviewsubmissions/:id'>Review</Link>

                <div><button className='logoutButton' onClick={this.handleLogout}>Logout</button></div>
            </div>
        )
    }
}


export default withRouter(Header);