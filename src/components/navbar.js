import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../redux/reducer'
const Navbar = (props) =>{
  const {username, logout} = props
  return(
    <nav>
      <span>Diabeetus</span>
        <ul>
          <li>
            <Link to = '/'>Home</Link>            
          </li>
          <li>
            <Link to ='/login'>Login</Link>
          </li>
        </ul>
        {username && <div>Welcome, {username}
        <button onClick={logout}>Logout</button>
        </div>}
    </nav>
  )
}

const mapStateToProps = (reduxState)=>{
  const {username} = reduxState
  console.log(username)
  return {username}

}
const mapDispatchToProps = {logout}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)