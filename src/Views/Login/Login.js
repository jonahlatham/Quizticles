import React, { Component } from 'react'
import './Login.css'
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

class Login extends Component {
    state = {
        email: '',
        password: '',
        backgroundImg: ''
    }

    componentDidMount() {
        let imgs = ['https://images.unsplash.com/photo-1505744386214-51dba16a26fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1767&q=80', 'https://images.unsplash.com/photo-1516535928439-27a66ff7a92a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1948&q=80', 'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1667&q=80', 'https://images.unsplash.com/photo-1551893665-c6f939b55d2e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80', 'https://images.unsplash.com/photo-1532153354457-5fbe1a3bb0b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80', 'https://images.unsplash.com/photo-1513705153361-9bc726c8db67?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', 'https://images.unsplash.com/photo-1535350356005-fd52b3b524fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80', 'https://images.unsplash.com/flagged/photo-1554757388-5982229b9ce7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80', 'https://images.unsplash.com/photo-1520599665522-f2f2ff591f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80', 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80', 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1332&q=80']
        this.setState({
            backgroundImg: imgs[Math.floor(Math.random() * imgs.length)]
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleLogin = () => {
        const body = {
            email: this.state.email,
            password: this.state.password,
        }
        axios.post('/auth/login', body)
            .then((response) => {
                if (response.data.success) {
                    this.props.dispatch({ type: 'SET_USER', payload: response.data.user })
                    this.props.history.push('/Home')
                } else {
                    alert(response.data.err)
                }
            })
    }

    render() {
        return (
            <div className='loginApp'>
                <img className='loginImg' src={this.state.backgroundImg} alt="pic" />
                <div className='login'>
                    <div className='q'>Q</div>
                    <form >
                        <input name='email' value={this.state.email} onChange={this.handleChange} placeholder='E-MAIL' className='loginInput' type="email" /> <br />
                        <input name='password' value={this.state.password} onChange={this.handleChange} placeholder='PASSWORD' className='loginInput' type="password" onKeyPress={event => {
                            if (event.key === 'Enter') {
                                this.handleLogin()
                            }
                        }} />
                    </form>
                    <button onClick={this.handleLogin} className='loginButton'>Log In</button>
                    <Link className='register-link' to='/Register'>Register</Link>
                </div>
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Login)