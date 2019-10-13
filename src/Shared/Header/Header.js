import React, { Component } from 'react'
import { Link } from "react-router-dom"
import './Header.css'

export default class Header extends Component {
    state = {
        makeWhite: false
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

    render() {
        return (
            <div className='Header' >
                <Link onClick={this.handleWhiteFalse} style={{ color: this.state.makeWhite === true ? 'white' : 'black' }} className='link' to='/Home'>Home</Link>
                <Link onClick={this.handleWhiteFalse} style={{ color: this.state.makeWhite === true ? 'white' : 'black' }} className='link' to='/createquiz'>Create New</Link>
                <Link onClick={this.handleWhiteTrue} style={{ color: this.state.makeWhite === true ? 'white' : 'black' }} className='link' to='/discoverquiz'>Discover</Link>
                <Link onClick={this.handleWhiteFalse} style={{ color: this.state.makeWhite === true ? 'white' : 'black' }} className='link' to='/userprofile'>Profile</Link>
                <Link onClick={this.handleWhiteFalse} style={{ color: this.state.makeWhite === true ? 'white' : 'black' }} className='link' to='/quiz/reviewsubmissions/:id'>Review</Link>
            </div>
        )
    }
}
