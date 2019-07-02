import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem } from 'reactstrap';
  import { Link } from 'react-router-dom'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faCameraRetro, faHome, faIdCard, faUserPlus, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'

  const camera = <FontAwesomeIcon icon={faCameraRetro} />
  const home = <FontAwesomeIcon icon={faHome} />
  const id = <FontAwesomeIcon icon={faIdCard} />
  const addUser = <FontAwesomeIcon icon={faUserPlus} />
  const signOut = <FontAwesomeIcon icon={faSignOutAlt} />
  const user = <FontAwesomeIcon icon={faUserCircle} />



class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar light expand="md">
          <NavbarBrand>{camera} Photophēmi</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/">{home} Home</Link>
              </NavItem>
                {this.props.currentUser === null ?
                <>
                <NavItem>
                  <NavLink onClick={this.props.loginToggle}>
                    {id} Login
                  </NavLink> 
                </NavItem>
                <NavItem>
                  <NavLink onClick={this.props.openSignUp}>
                    {addUser} Sign Up
                  </NavLink>
                </NavItem>
                </>
                  : 
                <>
                <NavItem>
                  <Link className="nav-link" to='/profile'>{user} My Profile</Link>
                </NavItem>
                <NavItem>
                  <NavLink onClick={this.props.userLogout}>{signOut} Logout</NavLink>
                </NavItem>
                </>
                }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar