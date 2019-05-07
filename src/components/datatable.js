import React, { Component } from 'react'
// import BloodSugarReading from './bloodSugarReading'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {updateBloodSugar} from '../redux/reducer'


class DataTable extends Component{
  constructor(){
    super()
    this.state={
      bloodSugarReadings: [],


    }

  }

  componentDidMount(){
    axios.get('/api/bloodsugar').then((res)=>{
      let bloodSugarReadings = res.data
      console.log(bloodSugarReadings)
      this.props.updateBloodSugar(bloodSugarReadings)
    })   
  }
render(){
  return(
    <div>Data Table</div>
  )
}
}

const mapStateToProps = (reduxState)=>{
  let {bloodSugarReadings} = reduxState
  return {bloodSugarReadings}
}

const mapDispatchToProps={
  updateBloodSugar
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DataTable))