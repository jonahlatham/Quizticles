import React, { Component } from 'react'
import { Link } from "react-router-dom"
import './Header.css'

export default class Header extends Component {
    render() {
        return (
            <div className='Header' style={{color: `${<Link className='link' to='/discoverquiz'>Discover</Link> ? 'white' : ''}`}}>
                <Link style={{color: `${<Link className='link' to='/discoverquiz'>Discover</Link> ? 'white' : 'black'}`}} className='link' to='/Home'>Home</Link>
                <Link style={{color: `${<Link className='link' to='/discoverquiz'>Discover</Link> ? 'white' : 'black'}`}} className='link' to='/createquiz'>Create New</Link>
                <Link style={{color: `${<Link className='link' to='/discoverquiz'>Discover</Link> ? 'white' : 'black'}`}} className='link' to='/discoverquiz'>Discover</Link>
                <Link style={{color: `${<Link className='link' to='/discoverquiz'>Discover</Link> ? 'white' : 'black'}`}} className='link' to='/userprofile'>Profile</Link>
                <Link style={{color: `${<Link className='link' to='/discoverquiz'>Discover</Link> ? 'white' : 'black'}`}} className='link' to='/quiz/reviewsubmissions/:id'>Review</Link>
            </div>
        )
    }
}
