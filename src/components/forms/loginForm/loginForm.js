import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateUserId, updateUsername} from '../../../redux/reducer'
import axios from 'axios'

class LoginForm extends Component{
  constructor(){
    super()
    this.state = {
      loginUsername: '',
      loginPassword: '',
      loginError: false,
      loginErrorMessage: 'Not authenticated'
    }

  }

  handleFormInputUpdate=(e)=>{
    this.setState({
      [e.target.name] : e.target.value,
      loginError: false
    })
  }
  handleLoginFormSubmit =async(e)=>{
    e.preventDefault()
    const {loginUsername, loginPassword} = this.state
    try{

      const res = await axios.post('/auth/login', {loginUsername, loginPassword})
      this.props.updateUsername(loginUsername)
      this.props.updateUserId(res.data.user_id)
      this.props.history.push('/home')
      console.log('login successful')
    }catch(err){
      this.setState({
        loginUsername: '',
        loginPassword: '',
        loginError: true
      })
    }
  }

  render(){
    return(
      <div className = 'login-form'>
      <h1>Login</h1>
      <form onSubmit = {this.handleLoginFormSubmit}>
      <input
      name = 'loginUsername'
      placeholder = 'username'
      value={this.state.loginUsername}
      onChange ={this.handleFormInputUpdate}
      type = 'text'

      />
            <input
      name = 'loginPassword'
      placeholder = 'password'
      value={this.state.loginPassword}
      onChange ={this.handleFormInputUpdate}
      type = 'text'

      />
      <button>Login</button>
      
      </form>
      {this.state.loginError && <h3>{this.state.loginErrorMessage}</h3>}
      </div>
    )
  }
}

const mapDispatchToProps = {
  updateUserId,
  updateUsername
}

export default connect(null, mapDispatchToProps)(withRouter(LoginForm))