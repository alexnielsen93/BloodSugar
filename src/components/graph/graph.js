import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios';
import { updateDay } from '../../redux/reducer'
import { async } from 'q';

const moment = require('moment')
moment().format();
class Graph extends Component {
  constructor() {
    super()

    this.state = {
      bloodSugarReadings: [],
      reading_date: '',
      arr: [],
      dates: []

    }
  }
  componentDidMount() {
     axios.get('/api/day').then(res => {
      this.setState({
        dates: res.data,
        reading_date: this.props.reading_date,
      })

      axios.get(`/api/bloodsugar/${this.state.reading_date}`).then(res => {
        this.setState({
          bloodSugarReadings: res.data,
          
        })
        this.createTimeObjects()
      })
    })

  
}

//FIXTHIS
async componentDidUpdate(prevProps, prevState){


if(!this.state.reading_date && this.props.reading_date){
  await this.setState({
    
    reading_date: this.props.reading_date
  })
  await axios.get(`/api/bloodsugar/${this.state.reading_date}`).then(res => {
    this.setState({
      bloodSugarReadings: res.data,
      
    })

      this.createTimeObjects()
    
  })
}
if(this.state.reading_date !== this.props.reading_date){
  await this.setState({
    reading_date: this.props.reading_date
    
  })
  await axios.get(`/api/bloodsugar/${this.state.reading_date}`).then(res => {
    this.setState({
      bloodSugarReadings: res.data,
      
    })
  })
  this.createTimeObjects()
  console.log(this.state.bloodSugarReadings, 'and ', this.state.arr)
}
}
  handleChange = async (e) => {
    console.log('handle change firing', e.target.value)
    await this.setState({
      reading_date: e.target.value
    })
    console.log(this.state.reading_date)
    let reading_date = encodeURIComponent(this.state.reading_date)
    console.log(reading_date)
    axios.get(`/api/bloodsugar/${reading_date}`).then(res => {
      this.setState({
        bloodSugarReadings: res.data
      })
    })

  }

  makeHours = () => {
    return [moment('0000', 'HH:mm').utc().toDate(), moment('0100', 'HH:mm').utc().toDate(), moment('0200', 'HH:mm').utc().toDate(), moment('0300', 'HH:mm').utc().toDate(), moment('0400', 'HH:mm').utc().toDate(), moment('0500', 'HH:mm').utc().toDate(), moment('0600', 'HH:mm').utc().toDate(), moment('0700', 'HH:mm').utc().toDate(), moment('0800', 'HH:mm').utc().toDate(), moment('0900', 'HH:mm').utc().toDate(),
    moment('1000', 'HH:mm').utc().toDate(), moment('1100', 'HH:mm').utc().toDate(), moment('1200', 'HH:mm').utc().toDate(), moment('1300', 'HH:mm').utc().toDate(), moment('1400', 'HH:mm').utc().toDate(), moment('1500', 'HH:mm').utc().toDate(), moment('1600', 'HH:mm').utc().toDate(), moment('1700', 'HH:mm').utc().toDate(), moment('1800', 'HH:mm').utc().toDate(), moment('1900', 'HH:mm').utc().toDate(), moment('2000', 'HH:mm').utc().toDate(), moment('2100', 'HH:mm').utc().toDate(), moment('2200', 'HH:mm').utc().toDate(), moment('2300', 'HH:mm').utc().toDate(), moment('2400', 'HH:mm').utc().toDate(),]
  }

  createTimeObjects = () => {

    this.setState({
      arr: this.state.bloodSugarReadings.map(reading => {
        let obj = { x: moment(`${reading.reading_time}`, 'HH:mm').utc().toDate(), y: reading.sugar_level }
        return obj
      })
    })

  }
  dateCheck = () => {
    console.log(this.state.dates)
  }

  render() {

    let hours = this.makeHours()


    return (
      <div>
        {/* <div>
          Dates:
          <select value={this.state.reading_date} onChange={this.handleChange}>
            {this.state.dates.map(date => {
              return <option  >{format(new Date(date.reading_date), 'MM/DD/YYYY')}</option>

            })}

          </select>

        </div> */}

        <h2>Date: {format(new Date(this.state.reading_date),'MM/DD/YYYY')}</h2>
       
        <div className = 'line-graph-box'>
          <Line
        data={
        {
        labels: hours,
        datasets: [{ label: 'Bloodsugar Levels', data: this.state.arr, backgroundColor: 'darkblue', borderColor: 'blue', fill: false, }]
        }}
        options={{
        scales:
        {
        yAxes: [{
        display: true,
        ticks: {
        beginAtZero: true,
        steps: 5,
        stepSize: 100,
        max: 500
        },
        
        }],
        xAxes: [{
        type: 'time',
        ticks: {
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
        displayFormats: {
        'hour': 'HH:mm'
        }
        }
        
        
        
        
        }]
        }
        }} /></div>

      </div>
    )
  }


}

const mapStateToProps = (reduxState) => {
  let { bloodSugarReadings, reading_date } = reduxState
  return { bloodSugarReadings, reading_date }
}

export default connect(mapStateToProps)(withRouter(Graph))