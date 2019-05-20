import React, { Component } from 'react'
import DataTable from '../datatable/datatable'
import Graph from '../graph/graph'
import axios from 'axios'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
export default class Display extends Component{

  constructor(){
    super()
    this.state={
      lastDay: '',
      lastTime:'',
    }
  }
  componentDidMount(){
    axios.get('/api/lastday').then((res)=>{
    
      let {reading_date, reading_time} = res.data[0]
      
      let formatDay = format(reading_date,'MM/DD/YYYY')
      let formatTime = format(new Date(`2019-05-08T${reading_time}`), 'HH:mm')
      this.setState ({
        lastDay : formatDay,
        lastTime: formatTime
      })
        })

  }
  render(){
    console.log('display rendering')
    return(
      <div>
        <div className = 'reading-box'>Your last Reading: {this.state.lastDay} at {this.state.lastTime}
<Link to ='/add_data'>Add Reading</Link></div>
        <div className ='display-area'>
        <div className = 'graph-and-data'><div className = 'data-table-box'>
        <DataTable />
        </div>
        <div className = 'graph-box'>
        <Graph />
        </div></div>
        </div>
      </div>
    )
  }
}