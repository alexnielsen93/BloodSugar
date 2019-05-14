import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { format } from 'date-fns'


class Home extends Component{
constructor(){
  super()
  this.state ={
    lastDay: '',
    lastTime: '',
  }
}
componentDidMount(){
  axios.get('/api/lastday').then((res)=>{
    
    let {reading_date, reading_time} = res.data[0]
    
    let formatDay = format(reading_date,'MM/DD/YYYY')
    let formatTime = format(new Date(`2019-05-08T${reading_time}`), 'HH:mm')
    console.log(`${formatDay} , ${formatTime}`)
    this.setState ({
      lastDay : formatDay,
      lastTime: formatTime
    })
    console.log(this.state)
      })
}
render(){
  return(

  <div className='home-box' >
<div>Your last Reading: {this.state.lastDay} at {this.state.lastTime}</div>
    <div className = "link-boxes">
    <Link to ='/add_data'>Enter Blood Sugar</Link>
    <Link to ='/data'>Data</Link>
    <Link to = '/graph'>Graph</Link>
    <Link to ='/display'>Display</Link>
    </div>
  
  <div className = 'hero-box'>
  
  
  </div>
  </div>
  )}
}
export default Home