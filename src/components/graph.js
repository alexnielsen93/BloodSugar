import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { format } from 'date-fns'
const moment = require('moment')
moment().format();
class Graph extends Component {
  constructor() {
    super()

    this.state = {
      bloodSugarReadings: []
    }
  }
  componentDidMount() {
    let { bloodSugarReadings } = this.props
    console.log( bloodSugarReadings)

    this.setState({
      bloodSugarReadings: bloodSugarReadings
    }
    )

  }

  render() {
    let hours = [moment('0000', 'HH:mm').utc().toDate(),moment('0100', 'HH:mm').utc().toDate(),moment('0200', 'HH:mm').utc().toDate(),moment('0300', 'HH:mm').utc().toDate(),moment('0400', 'HH:mm').utc().toDate(),moment('0500', 'HH:mm').utc().toDate(),moment('0600', 'HH:mm').utc().toDate(),moment('0700', 'HH:mm').utc().toDate(), moment('0800', 'HH:mm').utc().toDate(), moment('0900', 'HH:mm').utc().toDate(),
    moment('1000', 'HH:mm').utc().toDate(),moment('1100', 'HH:mm').utc().toDate(),moment('1200', 'HH:mm').utc().toDate(),moment('1300', 'HH:mm').utc().toDate(),moment('1400', 'HH:mm').utc().toDate(),moment('1500', 'HH:mm').utc().toDate(),moment('1600', 'HH:mm').utc().toDate(),moment('1700', 'HH:mm').utc().toDate(),moment('1800', 'HH:mm').utc().toDate(),moment('1900', 'HH:mm').utc().toDate(),moment('2000', 'HH:mm').utc().toDate(),moment('2100', 'HH:mm').utc().toDate(),moment('2200', 'HH:mm').utc().toDate(),moment('2300', 'HH:mm').utc().toDate(),]
    let extra = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
    let yaxes = [0,100,200,300,400,500]
    console.log( hours[0], typeof hours[0])
    let levels = [{x:hours[0],y:200}, {x:hours[1],y:400}, {x:hours[2],y:150}, {x: moment('0334', 'HH:mm').utc().toDate(), y: 200},{x:moment('2200', 'HH:mm').utc().toDate(), y: 100}]
    return (
      <div>
        <Line
          data={
            {
              labels: hours,
              datasets: [{ label: 'Bloodsugar Levels', data: levels, backgroundColor: [], fill: false, }]
            }}
          options={{
            scales:
            { yAxes:[{
              display: true,
              ticks:{
                beginAtZero: true,
                steps: 5,
                stepSize: 100,
                max: 500
              },
              
            }],
              xAxes: [{
                type: 'time',
                ticks:{
                  beginAtZero: true,
                  source: 'labels',
                  min: '00:00',
                  max: '24:00',
                  stepSize: 1,
                },
                distribution: 'linear',
                
                time: {

                  unit: 'hour',
                  stepSize: 1,
                  min: '0:00',
                  max: '24:00',
                  startAtZero: true,
                  displayFormats:{
                    'hour' : 'HH:mm'
                  }
                }
                  


                  
              }]
            }
          }} />
        graph
      </div>
    )
  }


}

const mapStateToProps = (reduxState) => {
  let { bloodSugarReadings } = reduxState
  return { bloodSugarReadings }
}

export default connect(mapStateToProps)(withRouter(Graph))