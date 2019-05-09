import React, { Component } from 'react'
import BloodSugarReading from './bloodSugarReading'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {updateBloodSugar} from '../redux/reducer'
import { Link } from 'react-router-dom'
import { encode } from 'punycode';


class DataTable extends Component{
  constructor(){
    super()
    this.state={
      bloodSugarReadings: [],
      reading_date: '05/08/2019'



    }

  }

  componentDidMount(){
    console.log(this.state)
    axios.get(`/api/bloodsugar/${encodeURI(this.state.reading_date)}`).then((res)=>{
      let bloodSugarReadings = res.data
      console.log(bloodSugarReadings)
      this.props.updateBloodSugar(bloodSugarReadings)
      this.setState({bloodSugarReadings})
      console.log(this.state)
    })   
  }
render(){
  return(
    <div>
      <div>
        <Link to = 'graph'>Graphs</Link>
      <h2>Blood Sugar Readings</h2>
  
    </div>{this.props.username? (
    this.state.bloodSugarReadings.map((reading)=>{
      return <BloodSugarReading reading = {reading} key/>
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