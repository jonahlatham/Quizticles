import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css'
import CreateNew from './Views/CreateNew/CreateNew'
import Discover from './Views/Discover/Discover'
import Edit from './Views/Edit/Edit'
import Home from './Views/Home/Home'
import Login from './Views/Login/Login'
import Register from './Views/Register/Register'
import Review from './Views/Review/Review'
import TakeQuiz from './Views/TakeQuiz/TakeQuiz'
import UserProfile from './Views/UserProfile/UserProfile'
import Header from './Shared/Header/Header'
import axios from 'axios'
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    axios.get('/auth/user')
      .then((response) => {
        if (response.data.success) {
          this.props.dispatch({ type: 'SET_USER', payload: response.data.user })
        }
      })
  }
  render() {
    let authRoutes = ''
    if (this.props.user.id) {
      authRoutes = [
        <Route key={1} path="/createquiz" component={CreateNew} />,
        <Route key={2} path="/discoverquiz" component={Discover} />,
        <Route key={3} path="/quiz/edit/:id" component={Edit} />,
        <Route key={4} path="/quiz/reviewsubmissions/:id" component={Review} />,
        <Route key={5} path="/quiz/:id" component={TakeQuiz} />,
        <Route key={6} path="/userprofile" component={UserProfile} />,
        <Route key={7} path="/home" component={Home} />,
      ]
    }
    return (
      <div className='App'>
        <Router>
          <Header /> 
          <Switch>
            {authRoutes}
            <Route path="/register" component={Register} />
            <Route path="/" component={Login} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default connect((storeObject) => { return storeObject })(App)