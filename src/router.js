import React from 'react'
import {Switch, Route} from 'react-router-dom'
import LandingPage from './components/landingPage'
import Login from './components/forms/login'
import LoginForm from './components/forms/loginForm'
import RegisterForm from './components/forms/registerForm'
import Home from './components/home'
import AddBloodSugarForm from './components/forms/addBloodSugarForm.js'
export default(

  <Switch>
    <Route exact path ='/' component={LandingPage}/>
    <Route path ='/login' component ={()=>(
      <Login>
        <LoginForm/>
      </Login>

    )}/>
    <Route path = '/register' component = {RegisterForm}/>
    <Route path = '/home' component = {Home}/>
    <Route path = '/add_data' component = {AddBloodSugarForm}/>

  </Switch>
)