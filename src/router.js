import React from 'react'
import {Switch, Route} from 'react-router-dom'
import LandingPage from './components/landingPage'
import Login from './components/forms/login'
import LoginForm from './components/forms/loginForm'
import RegisterForm from './components/forms/registerForm'

export default(

  <Switch>
    <Route exact path ='/' component={LandingPage}/>
    <Route path ='/login' component ={()=>(
      <Login>
        <LoginForm/>
      </Login>

    )}/>
    <Route path = '/register' component = {RegisterForm}/>

  </Switch>
)