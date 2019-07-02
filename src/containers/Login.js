import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

class ModalExample extends React.Component {
state = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  validUsername: false,
}

// clear input fields 
clearInput = () => {
  this.setState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
}

// capture user input
handleInputChange = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  if(name === 'username'){
    setTimeout(() => this.handleUsernameCheck(value), 200)
    this.setState({
      [name]: value
    })
  }else{
    this.setState({
      [name]: value
    })
  }
}

// change between login and sign up
handleOnClick = () => {
  this.clearInput()
  this.props.toggleSignUp()
}

submitLogin = () => {
  const {email, password} = this.state
  this.props.toggle()
  this.props.userSignIn(email, password)
  this.clearInput()
}

submitSignUp = () => {
  const {username, email, password} = this.state
  this.props.toggle()
  this.props.userSignUp(username, email, password)
  this.clearInput()
}

handleUsernameCheck = (value) => {
  if(value.length > 6) {
    axios.get(`https://insta.nextacademy.com/api/v1/users/check_name?username=${value}`)
    .then(response => {
      if (response.data.valid) {
        this.setState({
          validUsername: true,
        })
      } else {
        this.setState({
          validUsername: false,
        })
      }
    })
  } else {
    this.setState({
      validUsername: false,
    })
  }
}

validateEmail = () => {
  const emailRegEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  if(emailRegEx.test(this.state.email)){
    return true
  } else {
    return false
  }
}

validateSignUp = () => (
  this.state.validUsername && this.validateEmail() && this.state.password.length > 8 && this.state.password === this.state.confirmPassword ? true : false)

validateLogin = () => (
  this.validateEmail() && this.state.password.length > 1 ? true : false)



  render() {
    const {email, password, username, confirmPassword, validUsername} = this.state;
    const {modal, toggle, className, signUp} = this.props
    return (
      <div>
        <Modal 
          isOpen={modal} 
          toggle={toggle} 
          className={className}
        >

            {!signUp ?
              <>
                <ModalHeader toggle={toggle}>
                  Login
                </ModalHeader>
                <ModalBody>
                <form>
                  <div className="form-group">
                    <label htmlFor='inputEmail'>
                      Email
                    </label>
                    <input 
                      type='email' 
                      className={this.validateEmail() ? 'valid' : 'loginInput'} id='inputEmail' 
                      name='email' 
                      onChange={this.handleInputChange} 
                      value={email} 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor='inputPassword'>
                      Password
                    </label>
                    <input 
                      type='password' 
                      // className={password.length > 8 ? 'valid' : 'loginInput'} 
                      id='inputPassword' 
                      name='password' 
                      onChange={this.handleInputChange} 
                      value={password}/>
                  </div>
                  <div>
                    <p>New member? <span 
                        className='modalLink' 
                        onClick={this.handleOnClick}
                      > Sign up here.</span></p>
                  </div>
                </form> 
                </ModalBody> 
                <ModalFooter>
                  <Button onClick={toggle}>
                    Cancel
                  </Button>
                  <Button 
                    color="primary" 
                    onClick={this.submitLogin}
                    disabled={this.validateLogin() ? false : true}
                  >
                    Log In
                  </Button>
                </ModalFooter>
              </>
            : 
              <>
                <ModalHeader toggle={toggle}>
                  Sign Up
                </ModalHeader>
                <ModalBody>
                <form>
                  <div className="form-group">
                    <label htmlFor='inputUsername'>
                      Username
                    </label>
                    <input 
                      type='text' 
                      className={validUsername ? 'valid' : 'loginInput'} 
                      id='inputUsername' 
                      name='username' 
                      onChange={this.handleInputChange} 
                      value={username}
                    />
                    <small>
                      {username.length <= 6 ? `User name is too short` : validUsername ? 'This username is available' : 'Sorry, this username is unavailable'}
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor='inputEmail'>
                      Email
                    </label>
                    <input 
                      type='email' 
                      className={this.validateEmail() ? 'valid' : 'loginInput'} 
                      id='inputEmail' 
                      name='email' 
                      onChange={this.handleInputChange} 
                      value={email}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor='inputPassword'>
                      Password
                    </label>
                    <input 
                      type='password' 
                      className={password.length > 8 ? 'valid' : 'loginInput'} 
                      id='inputPassword' 
                      name='password' 
                      onChange={this.handleInputChange} 
                      value={password}
                    />
                    <small>
                      {password.length <= 8 ? `You need ${9-password.length} more letters for a valid password.` : 'Valid password'}
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor='confirmPassword'>
                      Confirm password
                    </label>
                    <input 
                      type='password' 
                      className={confirmPassword.length > 8 && password === confirmPassword ? 'valid' : 'loginInput'}
                      id='confirmPassword' 
                      name='confirmPassword' 
                      onChange={this.handleInputChange} 
                      value={confirmPassword}/>
                  </div>
                  <div>
                    <p>Already a member? <span 
                        className='modalLink' 
                        onClick={this.handleOnClick}
                      > Log in here.</span></p>
                  </div>
                </form>
                </ModalBody> 
                <ModalFooter>
                  <Button onClick={toggle}>
                    Cancel
                  </Button>
                  <Button 
                    color="primary" 
                    onClick={this.submitSignUp}
                    disabled={this.validateSignUp() ? false : true}
                  >
                    Sign Up
                  </Button>
                </ModalFooter>
              </>
            }
        
        </Modal>
      </div>
    );
  }
}

export default ModalExample;