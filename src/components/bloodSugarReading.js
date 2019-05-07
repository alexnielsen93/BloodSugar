import React, {Component} from 'react'

export default class BloodSugarReading extends Component{
  constructor(){
    super()
    this.state={
   
    }

  }

  componentDidMount(){

  }
render(){
  let {reading} = this.props
  return(
    <div>
      <div>------------------------------</div>
      <p>Blood Sugar: {reading.sugar_level}</p>
      <p>Date: {reading.reading_date}</p>
      <p>Time: {reading.reading_time}</p>
      <p>Note: {reading.note}</p>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
      <div>------------------------------</div>

    </div>
  )
}
}