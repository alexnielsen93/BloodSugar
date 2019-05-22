import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout, updateUserDetails } from '../../redux/reducer'
import { withRouter } from 'react-router-dom'
import Logo from '../../logo.png'
import axios from 'axios'
class Navbar extends Component {
  async componentDidMount() {
    const res = await axios.get('/api/user')
    const {first_name, last_name, email, username, password} = res.data
    if (!this.props.username) {
      this.props.history.push('/landingpage')
      
    }
    else {
      this.props.updateUserDetails({first_name, last_name, email, username, password})
    }
  }
  componentDidUpdate(prevProps, prevData) {
    if (prevProps.username !== this.props.username && this.props.username === '') {
      this.props.history.push('/landingpage')
    }

  }
  render() {
    const { username, logout } = this.props
    return (
      <nav>

        <div className='navbar'>
          <div className='logo'>
            <img className = 'logo' src={Logo} alt=""/>
          </div>
          <div className='navlist'>


            <div className= 'conditional-nav'>
              {this.props.username ? (<div className='settings-logout'>

                <div>
                  <Link to="/home">Home</Link>
                </div>
                <div>
                  <Link to='/display'>Data</Link>
                </div>
                <div>
                  <Link to='/settings'>Settings</Link>
                </div>
                <div className='user-logout '>
                  <button className= 'blue-button' onClick={logout}>Logout</button>
                </div>
              </div>) : (
                  <div className='register-login'>
                    <div>
                      <Link to='/register'><button className = 'blue-button'>Register</button></Link>
                    </div>
                    <div >
                      <Link to='/login'><button className = 'blue-button'>Login</button></Link>
                    </div></div>

                )}

            </div>
          </div>
        </div>

      </nav>
    )
  }
}
const mapStateToProps = (reduxState) => {
  const { username } = reduxState

  return { username }

}
const mapDispatchToProps = { logout }
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))