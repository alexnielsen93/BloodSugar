import React, { Component } from 'react'
import { format } from 'date-fns'
export default class EditReadingForm extends Component {
constructor(){
super()
this.state={
  sugar_level: 0,
  reading_date: '',
  reading_time: '',
  note: '',
  reading_id: 0

}
}

componentDidMount(){
  console.log(this.props.reading)
  let { sugar_level, reading_date,reading_time,note, reading_id } = this.props.reading
  this.setState({
    ...this.state, sugar_level,reading_date,reading_time,note,reading_id
  })
}
 handleChange=async(e)=>{
  await this.setState({
    [e.target.name]:e.target.value
  })
  console.log(this.state)
}



handleClick = ()=>{
  let reading = {...this.state}
  console.log(reading.sugar_level, reading.reading_date, reading.reading_time)
  if (!(reading.sugar_level && reading.reading_date && reading.reading_time && reading.sugar_level < 1000 && reading.sugar_level >10)){
    alert('Invalid input, please try again. ')
    let { sugar_level, reading_date,reading_time,note, reading_id } = this.props.reading
  this.setState({
    ...this.state, sugar_level,reading_date,reading_time,note,reading_id
  })
  return
  }

  console.log(reading)
  this.props.editReading(reading)

  this.props.toggleEdit()
}
  render() {
    
    return (
      <div className = 'edit-reading-main'>
        <div>------------------------------</div>
        Edit Reading
        <input name="sugar_level"
          placeholder="blood sugar level"
          value={this.state.sugar_level}
          onChange={this.handleChange}
          type="number" />
        <input
          name="reading_date"
          placeholder="date: MM/DD/YYYY"
          value={format(new Date(this.state.reading_date),'MM/DD/YYYY')}
          onChange={this.handleChange}
          type="text" />
        <input
          name="reading_time"
          placeholder="time: hour:minute"
          value={format(new Date(`2019-05-08T${this.state.reading_time}`), 'HH:mm')}
          onChange={this.handleChange}
          type="text" />
        <input
          name="note"
          placeholder="note"
          value={this.state.note}
          onChange={this.handleChange}
          type="text" />

        <div className = 'button-box'><button onClick={() => { this.props.toggleEdit() }}>Cancel</button>
        <button onClick={()=>{this.handleClick()}}>Submit</button></div>
        <div>------------------------------</div>
      </div>
    )
  }
}