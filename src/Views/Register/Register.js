import React, { Component } from 'react'
import './Register.css'
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

class Register extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleRegister = () => {
        const body = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
        }
        axios.post('/auth/register', body)
            .then((response) => {
                debugger
                if (response.data.success) {
                    this.props.dispatch({ type: 'SET_USER', payload: response.data.user })
                    this.props.history.push('/home')
                } else {
                    alert(response.data.err)
                }
                this.setState({
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                })
            })
    }

    render() {
        return (
            <div>
                <div>
                    <img className='registerImg' src="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1332&q=80" alt="pic" />
                    <div className='register'>
                        <div className='q'>Q</div>
                        <form action="">
                            <input name='first_name' value={this.state.first_name} onChange={this.handleChange} className='registerInput' placeholder='FIRST NAME' type="text" /> <br/>
                            <input name='last_name' value={this.state.last_name} onChange={this.handleChange} className='registerInput' placeholder='LAST NAME' type="text" /> <br/>
                            <input name='email' value={this.state.email} onChange={this.handleChange} className='registerInput' placeholder='E-MAIL' type="email" /> <br/>
                            <input name='password' value={this.state.password} onChange={this.handleChange} className='registerInput' placeholder='PASSWORD' type="password" /> <br/>
                        </form>
                        <button onClick={this.handleRegister} className='registerButton'>Register</button>
                        <Link className='' to='/'>Login</Link>                    </div>
                </div>
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Register)
