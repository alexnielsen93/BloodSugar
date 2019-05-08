import React from 'react'
import {Link} from 'react-router-dom'



const Home=  ()=>(

  <div>
    <Link to ='/add_data'>Enter Blood Sugar</Link>
    <Link to ='/data'>Data</Link>
    <Link to = '/graph'>Graph</Link>
  </div>
)

export default Home