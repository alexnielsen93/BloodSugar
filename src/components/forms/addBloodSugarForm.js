import React, {Component} from 'react'
import { getTime, getDate, format, formatDistance, formatRelative, subDays } from 'date-fns'


class BloodSugarForm extends Component{
  constructor(){
    super()
    this.state={
      sugarValue : 0,
      date: format(new Date(),'MM/DD/YYYY'),
      time: format(new Date(),'h:m')
    }
  }
  handleFormInputUpdate=(e)=>{
    this.setState({
      [e.target.name]: e.target.value,
  
    })
  }
  render(){
    return(
    
    <>
    <h1>Add Blood Sugar</h1>
    <form onSubmit = {this.handleDataFormSubmit}>
    <input name = "sugarValue"
    placeholder = "blood sugar level"
    value = {this.state.sugarValue}
    onChange = {this.handleFormInputUpdate}
    type= "text"/>
    <input
    name = "date"
    placeholder = "date: MM/DD/YYYY"
    value = {this.state.date}
    onChange = {this.handleFormInputUpdate}
    type = "text"/>
    <input 
    name = "time"
    placeholder = "time: hour:minute"
    value = {this.state.time}
    onChange = {this.handleFormInputUpdate}
    type="text"/>
    </form>
    </>
    )
  }
}

export default BloodSugarForm