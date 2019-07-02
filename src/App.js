import React from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import NavBar from './containers/NavBar'
import UserProfilePage from './pages/UserProfilePage'
import { Route, Switch} from 'react-router-dom'
import LogIn from './containers/Login'
import axios from 'axios'
import MyProfilePage from './pages/MyProfilePage.js'


class App extends React.Component {
  state = {
    loginModal: false,
    signUp: false,
    currentUser: null,
    errorMessage: ''
  }

userSignIn = (email, password) => {
  axios.post('https://insta.nextacademy.com/api/v1/login', {
    email: email,
    password: password,
}).then(response => {
    let JWT = response.data.auth_token
    localStorage.setItem('JWT', JWT)
    this.setState({
      currentUser: response.data.user,
      errorMessage: ''
    })
}).catch(error => {
  console.log(error.response)
})
}

userSignUp = (username, email, password) => {
  axios.post('https://insta.nextacademy.com/api/v1/users/',
    {
      username: username,
      email: email,
      password: password,
    })
.then(response => {
  let JWT = response.data.auth_token
  localStorage.setItem('JWT', JWT)
  this.setState({
    currentUser: response.data.user,
    errorMessage: ''
  })
})
.catch(error => {
  this.setState({
    errorMessage: error.response.data.message[0]
  })
})
}


userLogout = () => {
  localStorage.removeItem('JWT')
  localStorage.removeItem('currentUser')
  this.setState({
    currentUser: null
  })
}


toggleLoginModal = () => {
  this.setState(prevState => ({
    loginModal: !prevState.loginModal,
    signUp: false,
  }));
}

openSignUp = () => {
  this.setState(prevState => ({
    loginModal: !prevState.loginModal,
    signUp: true,
  }))
}

toggleSignUp = () => {
  this.setState({
    signUp: !this.state.signUp
  })
}



  render(){
    return (
      <>
        <div className='status'>
          {this.state.currentUser !== null ? 
            <div>
              Hello {this.state.currentUser.username}.
            </div>
            : 
            this.state.errorMessage !== '' ? 
            this.state.errorMessage 
            :
            <></>
          }
        </div>
        <LogIn 
          modal={this.state.loginModal} 
          toggle={this.toggleLoginModal} 
          signUp={this.state.signUp}
          toggleSignUp={this.toggleSignUp}
          userSignIn={this.userSignIn}
          userSignUp={this.userSignUp}
        />
        <NavBar 
          loginToggle={this.toggleLoginModal} 
          signUp={this.state.signUp}
          currentUser={this.state.currentUser}
          userLogout = {this.userLogout}
          openSignUp = {this.openSignUp}
        />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path="/users/:id" component={UserProfilePage} />
          <Route exact path='/profile' render={props => <MyProfilePage {...props} currentUser={this.state.currentUser} />} />
        </Switch>
      </>
    )
  }
}

export default App;

