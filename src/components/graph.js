import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class Graph extends Component {
  constructor() {
    super()

    this.state = {
      bloodSugarReadings: []
    }
  }
  componentDidMount() {
    let { bloodSugarReadings } = this.props
    console.log(bloodSugarReadings)

    this.setState({
      bloodSugarReadings: bloodSugarReadings
    }
    )

  }

  render() {
    let hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
    let levels = [{x:4,y:200}, {x:10,y:150}, {x:15,y:300}, {x:22,y:20}]
    return (
      <div>
        <Line
          data={
            {
              labels: hours,
              datasets: [{ data: levels, backgroundColor: [] }]
            }}
          options={{
            scales:
            {
              xAxes: [{
                type: 'time',
                ticks:{
                  beginAtZero: true,
                  source: 'labels',
                  min: 0,
                  max: 24,
                  stepSize: 1,
                },
                distribution: 'linear',
                
                time: {

                  unit: 'hour',
                  stepSize: 1,
                  min: 0,
                  max: 24,
                  startAtZero: true


                  
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