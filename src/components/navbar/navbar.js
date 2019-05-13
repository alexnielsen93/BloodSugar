import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../redux/reducer'
import {withRouter} from 'react-router-dom'
class Navbar extends Component{
  componentDidMount(){
    console.log(this.props)
  }
  componentDidUpdate(prevProps, prevData){
    if(prevProps.username !==this.props.username && this.props.username === ''){
      this.props.history.push('/landingpage')
    }
    
  }
  render(){
    const {username, logout} = this.props
  return(
    <nav>
      
      <div className = 'navbar'>
      <div className = 'logo'>
        <h1>Glucose Tracker</h1>
      </div>
      <div className = 'navlist'>
      
      <div>
      <Link to ="/home">Home</Link>
      </div>
      <div>
      <Link to ='/register'>Register</Link>
      </div>
      <div>
      <Link to ='/login'>Login</Link>
      </div>
      </div>
      {username && <div>Welcome, {username}
      <button onClick={logout}>Logout</button>
      </div>}</div>
    </nav>
  )
}
}
const mapStateToProps = (reduxState)=>{
  const {username} = reduxState
  
  return {username}

}
const mapDispatchToProps = {logout}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))