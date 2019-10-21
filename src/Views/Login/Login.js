import React, { Component } from 'react'
import './Login.css'
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

class Login extends Component {
    state = {
        email: '',
        password: '',
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
                <img className='loginImg' src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="pic" />
                <div className='login'>
                    <div className='q'>Q</div>
                    <form >
                        <input name='email' value={this.state.email} onChange={this.handleChange} placeholder='E-MAIL' className='loginInput' type="email" /> <br/>
                        <input name='password' value={this.state.password} onChange={this.handleChange} placeholder='PASSWORD' className='loginInput' type="password" onKeyPress={event => {
                            if (event.key === 'Enter') {
                                this.handleLogin()
                            }
                        }} />
                    </form>
                    <button onClick={this.handleLogin} className='loginButton'>Log In</button>
                    <Link className='' to='/Register'>Register</Link>
                </div>
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Login)