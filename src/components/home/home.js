import React from 'react'
import {Link} from 'react-router-dom'



const Home=  ()=>(

  <div >

    <div className = "link-boxes"><Link to ='/add_data'>Enter Blood Sugar</Link>
    <Link to ='/data'>Data</Link>
    <Link to = '/graph'>Graph</Link></div>
  
  <div className = 'hero-box'>
  
  
  </div>
  </div>
)

export default Home