import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux' //for editing
export default class BloodSugarReading extends Component(){
  constructor(){
    super()
    this.state={
      sugarlevel: 0,
      date: '',
      time: '',
      note: ''
    }

  }


}