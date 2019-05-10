import React, { Component } from 'react'
import { format } from 'date-fns'
export default class EditReadingForm extends Component {


  render() {
    let {reading} = this.props
    return (
      <div>
        <div>------------------------------</div>
        Edit Form
        <input name="sugar_level"
          placeholder="blood sugar level"
          value={reading.sugar_level}
          onChange={this.handleChange}
          type="text" />
        <input
          name="reading_date"
          placeholder="date: MM/DD/YYYY"
          value={format(new Date(reading.reading_date),'MM/DD/YYYY')}
          onChange={this.handleChange}
          type="text" />
        <input
          name="reading_time"
          placeholder="time: hour:minute"
          value={format(new Date(`2019-05-08T${reading.reading_time}`), 'HH:mm')}
          onChange={this.handleChange}
          type="text" />
        <input
          name="note"
          placeholder="note"
          value={reading.note}
          onChange={this.handleChange}
          type="text" />

        <button onClick={() => { this.props.toggleEdit() }}>Cancel</button>
        <button>Submit</button>
        <div>------------------------------</div>
      </div>
    )
  }
}