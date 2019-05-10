import React, { Component } from 'react'
import BloodSugarReading from './bloodSugarReading'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {updateBloodSugar} from '../redux/reducer'
import { Link } from 'react-router-dom'
import { encode } from 'punycode';
import { format } from 'date-fns'

class DataTable extends Component{
  constructor(){
    super()
    this.state={
      bloodSugarReadings: [],
      reading_date: '',
      dates: []



    }

  }

  handleChange = async(e)=> {
    console.log('handle change firing', e.target.value)
    await this.setState({
      reading_date: e.target.value
    })
    console.log(this.state.reading_date)
    let reading_date = encodeURIComponent(this.state.reading_date)
    console.log(reading_date)
    axios.get(`/api/bloodsugar/${reading_date}`).then(res=>{
      this.setState({
        bloodSugarReadings: res.data
      })
    })
    
  }

  editReading = (reading)=>{
    let reading_date = encodeURIComponent(this.state.reading_date)
    axios.post('/api/edit', reading).then(axios.get(`/api/bloodsugar/${reading_date}`).then(res=>{
      this.setState({
        bloodSugarReadings: res.data
      })
    })).catch(err=>{
      console.log(`err ${err}`)
    })
  }
  deleteReading = (reading_id)=>{
    console.log(reading_id)
    axios.post('/api/delete', {reading_id}).then(res=>{
      this.setState({
        bloodSugarReadings : res.data
      })
    }).catch(err=>{console.log(`error ${err}`)}
    )}

  componentDidMount(){
    axios.get('/api/day').then(res=>{
      this.setState({
        dates: res.data
      })
      console.log(this.state.dates)
    }) 
  }
render(){
  return(
    <div>
      <div>
        <Link to = 'graph'>Graphs</Link>
        
          Dates:
          <select  value = {this.state.reading_date}onChange = {this.handleChange}>
          {this.state.dates.map(date=>{
            return<option  value = {date.reading_date}>{format(new Date(date.reading_date),'MM/DD/YYYY')}</option>

          })}

          </select>
      <h2>Blood Sugar Readings</h2>
  
    </div>{this.props.username? (
    this.state.bloodSugarReadings.map((reading)=>{
      return <BloodSugarReading editReading = {this.editReading}deleteReading = {this.deleteReading}reading = {reading} key/>
    })):(<div>No data</div>)
  }
    
    </div>
  )
}
}

const mapStateToProps = (reduxState)=>{
  let {bloodSugarReadings, username} = reduxState
  return {bloodSugarReadings, username}
}

const mapDispatchToProps={
  updateBloodSugar
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DataTable))