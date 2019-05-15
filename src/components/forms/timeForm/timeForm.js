import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {withRouter } from 'react-router-dom'
import { format } from 'date-fns'

class TimeForm extends Component{
  constructor(){
    super()
    this.state={
      username : '',
      times : [],
      time:  '',
      timeObjArr: []
    }
  }

  handleFormInputUpdate=(e)=>{
    this.setState({
      [e.target.name]: e.target.value,
  
    })
  }

  addTime =()=>{
    console.log(this.state)
    let { time ,times, timeObjArr } = this.state
    let splitTime = time.split(':')
    
    timeObjArr.push({hour: splitTime[0], minute: splitTime[1]})
    

    times.push(time)
    this.setState({
      times,
      time: '',
      timeObjArr
    })
  }

  submitTimes=()=>{
    const { timeObjArr } = this.state
    axios.post('/api/schedule', { timeObjArr }).then(
      this.props.history.push('/settings')
    )
  }
  render(){

    return(
      <main className = 'time-form-main'>

      <h1>Time Form</h1>
      {(this.state.times.length ===0) ? <div>No Times Scheduled</div>:
    
      this.state.times.map(time=>{
        return <div>{time}</div>
  })}
      <input
    name = "time"
    placeholder = "time: hour:minute"
    value = {this.state.time}
    onChange = {this.handleFormInputUpdate}
    type="text"/>

      <button onClick={this.addTime}>Add Time To Schedule</button>
      <button onClick={this.submitTimes}>Submit Schedule</button>
      <button onClick={()=>{this.props.history.push('/settings')}}>Cancel</button>
      </main>
    )
  }
}

const mapStateToProps=(reduxState)=>{
  const { username }= reduxState
  return {username}

}

export default connect(mapStateToProps)(withRouter(TimeForm))