import React from 'react'
import {Switch, Route} from 'react-router-dom'
import LandingPage from './components/landingPage/landingPage'
import Login from './components/forms/login/login'
import LoginForm from './components/forms/loginForm/loginForm'
import RegisterForm from './components/forms/registerForm/registerForm'
import Home from './components/home/home'
import AddBloodSugarForm from './components/forms/addBloodSugarForm/addBloodSugarForm'
import DataTable from './components/datatable/datatable'
import Graph from './components/graph/graph'
import Display from './components/display/display'
import Settings from './components/forms/settings/settings'
import TimeForm from './components/forms/timeForm/timeForm'
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
    <Route path = '/data' component = {DataTable}/>
    <Route path = '/graph' component = {Graph}/>
    <Route path = '/landingpage' component = {LandingPage}/>
    <Route path = '/display' component = {Display}/>
    <Route path = '/settings' component = {Settings}/>
    <Route path = '/time' component = {TimeForm}/>

  </Switch>
)