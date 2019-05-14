import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios';

class Logout extends Component{
  constructor(){
    super()
    
  }



  function = ()=>{
    axios.delete('/auth/logout')

  }  
  render(){
  return(
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  )
  
  }
  
}
