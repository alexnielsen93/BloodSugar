import React, { Component } from 'react'
import DataTable from '../datatable/datatable'
import Graph from '../graph/graph'


export default class Display extends Component{
  render(){
    console.log('display rendering')
    return(
      <div>
        <div className ='display-area'>
        <h1 className="display-title">Your Daily BloodSugar Readings</h1>
        <div className = 'graph-and-data'><div className = 'data-table-box'>
        <DataTable />
        </div>
        <div className = 'graph-box'>
        <Graph />
        </div></div>
        </div>
      </div>
    )
  }
}