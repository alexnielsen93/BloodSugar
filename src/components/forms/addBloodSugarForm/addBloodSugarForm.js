import React, {Component} from 'react'
import { format } from 'date-fns'
import { connect } from 'react-redux'
import axios from 'axios'
import { updateBloodSugar } from '../../../redux/reducer'
import { withRouter} from 'react-router-dom'



class BloodSugarForm extends Component{
  constructor(){
    super()
    this.state={
      sugar_level : 0,
      reading_date: format(new Date(),'MM/DD/YYYY'),
      reading_time: format(new Date(),'hh:mm'),
      note: ''
    }
  }
  handleFormInputUpdate=(e)=>{
    this.setState({
      [e.target.name]: e.target.value,
  
    })
  }
  componentDidMount(){
    console.log(this.props)
  }

  handleDataFormSubmit= async(e)=>{
    e.preventDefault()
    const{ sugar_level, reading_date, reading_time, note } = this.state
    
    try{
      const res = await axios.post('/api/addreading', {sugar_level, reading_date, reading_time, note})
      
      this.props.updateBloodSugar(res)

    }catch(err){
      console.log(err)
    }
    this.setState({
      sugar_level : '',
      reading_date: format(new Date(),'MM/DD/YYYY'),
      reading_time: format(new Date(),'h:m'),
      note: ''
    })
  }


  render(){
    return(
    
    <div className= "blood-sugar-form">
    <div className = 'form-box'><h1>Add Blood Sugar</h1>
    <form onSubmit = {this.handleDataFormSubmit}>
    <div className = 'input-box'><input name = "sugar_level"
    placeholder = "blood sugar level"
    value = {this.state.sugar_level}
    onChange = {this.handleFormInputUpdate}
    type= "text"/>
    <input
    name = "reading_date"
    placeholder = "date: MM/DD/YYYY"
    value = {this.state.reading_date}
    onChange = {this.handleFormInputUpdate}
    type = "text"/>
    <input
    name = "reading_time"
    placeholder = "time: hour:minute"
    value = {this.state.reading_time}
    onChange = {this.handleFormInputUpdate}
    type="text"/>
    <input className="note-input"
    name = "note"
    placeholder = "note"
    value = {this.state.note}
    onChange = {this.handleFormInputUpdate}
    type="text"
    contentEditable="true"
    /></div>
    <div className = 'button-box'>
    <button onClick={this.handleFormDataSubmit}>Submit</button>
    <button onClick={()=>{this.props.history.push('/home')}}>Cancel</button></div>
    </form></div>
    <div className = 'video-box'>
    <iframe width="300" height="300" src="https://www.youtube.com/embed/qAZAWBJfCqs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    </div>
    )
  }
}

const mapStateToProps = (reduxState) =>{
  let {bloodSugarReadings} = reduxState
  return {bloodSugarReadings}
}

const mapDispatchToProps = {
  updateBloodSugar
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BloodSugarForm))