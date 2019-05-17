import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { format } from 'date-fns'
import TheSlider from '../slider/slider'


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

sendMessage=()=>{

  axios.get('/api/message').then(()=>{
    console.log('its working')
  })
}
render(){
  return(

  <div className='home-box' >
<div className = 'reading-box'>Your last Reading: {this.state.lastDay} at {this.state.lastTime}
<Link to ='/add_data'>Add Reading</Link></div>

  <div className = 'hero-box'>
  <TheSlider/>
  </div>
  </div>
  )}
}
export default Home

// https://cdn.stocksnap.io/img-thumbs/960w/KSVNE2NWQP.jpg PLAN/PREPARE

//MEASURE/ASSESS https://burst.shopifycdn.com/photos/wrtiting-tools.jpg?width=1850&amp;format=pjpg&amp;exif=0&amp;iptc=0
//IMPROVE/ACHIEVE https://burst.shopifycdn.com/photos/running-cloudy-day.jpg?width=1850&format=pjpg&exif=1&iptc=1