import React, {Component} from 'react'
import EditReadingForm from '../forms/editReadingForm/editReadingForm'
import { format } from 'date-fns'

export default class BloodSugarReading extends Component{
  constructor(){
    super()
    this.state={
      edit: false,
    }

  }


  toggleEdit = ()=>{
    this.setState({
      edit: !this.state.edit
    })
  }

  handleClick =()=>{

  }
  
render(){

  let {reading} = this.props
  return(
    this.state.edit ? <EditReadingForm reading = {reading} toggleEdit = {this.toggleEdit} editReading = {this.props.editReading}/> : 
    <div className = 'reading-main'>
      <div>------------------------------</div>
      <p>Blood Sugar: {reading.sugar_level}</p>
      <p>Date: {format(reading.reading_date,'MM/DD/YYYY')}</p>
      <p>Time: {format(new Date(`2019-05-08T${reading.reading_time}`), 'HH:mm')}</p>
      <p>Note: {reading.note}</p>
      <div className = 'button-box'>
        <button onClick = {()=>{this.toggleEdit()}}>Edit</button>
        <button onClick={()=>{this.props.deleteReading(reading.reading_id)}}>Delete</button>
      </div>
      <div>------------------------------</div>

    </div>
  )
}
}
