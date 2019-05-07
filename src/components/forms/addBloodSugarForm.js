import React, {Component} from 'react'
import { getTime, getDate, format, formatDistance, formatRelative, subDays } from 'date-fns'
import { connect } from 'react-redux'
import axios from 'axios'



class BloodSugarForm extends Component{
  constructor(){
    super()
    this.state={
      sugar_level : 0,
      reading_date: format(new Date(),'MM/DD/YYYY'),
      reading_time: format(new Date(),'h:m'),
      note: ''
    }
  }
  handleFormInputUpdate=(e)=>{
    this.setState({
      [e.target.name]: e.target.value,
  
    })
  }
  componentDidMount(){
    console.log(this.props)
  }

  handleDataFormSubmit= async(e)=>{
    e.preventDefault()
    const{ sugar_level, reading_date, reading_time, note } = this.state

    try{
      const res = await axios.post('/api/addreading', {sugar_level, reading_date, reading_time, note})
    }catch(err){
      console.log(err)
    }

  }


  render(){
    return(
    
    <>
    <h1>Add Blood Sugar</h1>
    <form onSubmit = {this.handleDataFormSubmit}>
    <input name = "sugar_level"
    placeholder = "blood sugar level"
    value = {this.state.sugar_level}
    onChange = {this.handleFormInputUpdate}
    type= "text"/>
    <input
    name = "reading_date"
    placeholder = "date: MM/DD/YYYY"
    value = {this.state.reading_date}
    onChange = {this.handleFormInputUpdate}
    type = "text"/>
    <input 
    name = "reading_time"
    placeholder = "time: hour:minute"
    value = {this.state.reading_time}
    onChange = {this.handleFormInputUpdate}
    type="text"/>
    <input 
    name = "note"
    placeholder = "note"
    value = {this.state.note}
    onChange = {this.handleFormInputUpdate}
    type="text"/>
    
    <button>Submit</button>
    <button>Cancel</button>
    </form>
    </>
    )
  }
}

const mapStateToProps = (reduxState) =>{
  return reduxState
}

export default connect(mapStateToProps)(BloodSugarForm)