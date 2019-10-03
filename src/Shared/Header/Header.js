import React, { Component } from 'react'
import { Link } from "react-router-dom"
import './Header.css'

export default class Header extends Component {
    render() {
        return (
            <div className='Header'>
                <Link className='link' to='/Home'>Home</Link>
                <Link className='link' to='/createquiz'>Create New</Link>
                <Link className='link' to='/discoverquiz'>Discover</Link>
                <Link className='link' to='/userprofile'>Profile</Link>
                <Link className='link' to='/quiz/reviewsubmissions/:id'>Review</Link>
            </div>
        )
    }
}
