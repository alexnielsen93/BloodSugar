import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateUsername, updateUserId} from '../../../redux/reducer'
class RegisterForm extends Component{
constructor(){
  super()
  this.state ={
    registerUsername: '',
    registerFirstName: '',
    registerLastName: '',
    registerEmail: '',
    registerPhoneNum: '',
    registerPassword: '',
    registerError : false,
    errorMessage: 'Uh oh, something went wrong...'
  }
}
handleFormInputUpdate=(e)=>{
  this.setState({
    [e.target.name]: e.target.value,

  })
}
handleRegisterFormSubmit=async(e)=>{
  e.preventDefault()
  const{ registerUsername, registerFirstName, registerLastName, registerEmail, registerPhoneNum, registerPassword } = this.state
  try{
    const res = await axios.post('/auth/register',{registerUsername, registerFirstName, registerLastName, registerEmail, registerPhoneNum, registerPassword})
    let username = registerUsername
    let password = registerPassword
    axios.post('/auth/login', {username, password})
    this.props.updateUsername(registerUsername)
    this.props.updateUserId(res.data.user_id)
    this.props.history.push('/home')
    console.log('register successful')

  }
  catch(err){
    this.setState({
      registerError: true
    })

  }
}
render(){
  return(
    <div className='register-form-box'>
    <h1>Register</h1>
    <form className='register-form' onSubmit = {this.handleRegisterFormSubmit}>
    <input 
    name = 'registerUsername'
    placeholder = 'username'
    value = {this.state.registerUsername}
    onChange = {this.handleFormInputUpdate}
    type="text"/>
      <input 
    name = 'registerFirstName'
    placeholder = 'First Name'
    value = {this.state.registerFirstName}
    onChange = {this.handleFormInputUpdate}
    type="text"/>
      <input 
    name = 'registerLastName'
    placeholder = 'Last Name'
    value = {this.state.registerLastName}
    onChange = {this.handleFormInputUpdate}
    type="text"/>
      <input 
    name = 'registerEmail'
    placeholder = 'email'
    value = {this.state.registerEmail}
    onChange = {this.handleFormInputUpdate}
    type="text"/>
      <input 
    name = 'registerPhoneNum'
    placeholder = 'Phone Number'
    value = {this.state.registerPhoneNum}
    onChange = {this.handleFormInputUpdate}
    type="text"/>
      <input 
    name = 'registerPassword'
    placeholder = 'password'
    value = {this.state.registerPassword}
    onChange = {this.handleFormInputUpdate}
    type="text"/>
    
    
    <button>Register</button>
    

    </form>
    {this.state.registerError && <h3>{this.state.errorMessage}</h3>}
    </div>


  )

}
}
const mapDispatchToProps ={
  updateUserId,
  updateUsername
}


export default connect(null, mapDispatchToProps)(withRouter(RegisterForm))