import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {updateUsername} from '../../../redux/reducer'

class Settings extends Component{
constructor(){
  
  
  super()

  this.state={
    username: '',
    email: '',
    phone_number: '',
    first_name: '',
    last_name: ''
  }
}

componentDidMount(){

  axios.get('/api/user').then(res=>{

    console.log(res.data[0])
    this.setState({
      username: res.data[0].username,
      new_email: res.data[0].email,
      phone_number: res.data[0].phone_number,
      first_name: res.data[0].first_name,
      last_name: res.data[0].last_name,
      newPassword: '',
      old_email: res.data[0].email
    })
    
  })
}

handleFormInputUpdate=(e)=>{
  this.setState({
    [e.target.name]: e.target.value,

  })
}

handleEditFormSubmit = async (e)=>{
  e.preventDefault()
  const {username, new_email, old_email, phone_number, first_name, last_name, newPassword} = this.state
   
   console.log(old_email)
  try{
    await axios.put('/api/edituser', {username, new_email, old_email, phone_number, first_name, last_name, newPassword}).then(res=>
      
      {this.props.updateUsername(username)
      this.props.history.push('/home')

    }).catch(err=>{
      console.log(`error ${err}`)
    })
  }catch(err){
    console.log('error')
  }
}
render(){
  return(
    <main className = 'settings-main'>
      Settings
    <form onSubmit={this.handleEditFormSubmit}>
      <input 
      name = 'username'
      placeholder = 'username'
      value={this.state.username}
      onChange = {this.handleFormInputUpdate}
      type = 'text'/>
      <input 
      name = 'email'
      placeholder = 'email'
      value={this.state.email}
      onChange = {this.handleFormInputUpdate}
      type = 'text'/>
      <input 
      name = 'phone_number'
      placeholder = 'phone number'
      value={this.state.phone_number}
      onChange = {this.handleFormInputUpdate}
      type = 'text'/>
      <input 
      name = 'first_name'
      placeholder = 'first name'
      value={this.state.first_name}
      onChange = {this.handleFormInputUpdate}
      type = 'text'/>
      <input 
      name = 'last_name'
      placeholder = 'last name'
      value={this.state.last_name}
      onChange = {this.handleFormInputUpdate}
      type = 'text'/>
      <input 
      name = 'newPassword'
      placeholder = 'password'
      value={this.state.newPassword}
      onChange = {this.handleFormInputUpdate}
      type = 'text'/>


    <button>Submit Changes</button>
    </form>
    <button onClick={()=>{this.props.history.push('/home')}}>Cancel</button>
    </main>
  )
}

}

const mapDispatchToProps={
  
  updateUsername
}

const mapStateToProps= (reduxState)=>{
  let {username, email, phone_number, first_name, last_name} = reduxState
  return {username, email, phone_number, first_name, last_name}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Settings))