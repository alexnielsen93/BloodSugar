import React, { Component } from 'react'
import {Line} from 'react-chartjs-2'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Axios from 'axios';

class Graph extends Component{
  constructor(){
    super()

    this.state={
      bloodSugarReadings: []
    }
  }
  componentDidMount(){
    let { bloodSugarReadings } = this.props
    console.log(bloodSugarReadings)

    this.setState({
      bloodSugarReadings: bloodSugarReadings
    }
    )

  }

  render(){
    let hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
    let times = [2,10,20]
    let levels = [200,150,300]
    return(
      <div>
        <Line data = {{labels: hours,datasets: [{data: levels, backgroundColor: []},{data: times}]}} options = {{ scales:{xAxes:[{
          type: 'time',
          distribution: 'series',
          ticks:{
            source: 'labels'
          },
          time:{
            unit: 'hour'
          }
        }]}}}/>
        
      </div>
    )
  }
  

}

const mapStateToProps = (reduxState)=>{
  let {bloodSugarReadings} = reduxState
  return {bloodSugarReadings}
}

export default connect(mapStateToProps)(withRouter(Graph))