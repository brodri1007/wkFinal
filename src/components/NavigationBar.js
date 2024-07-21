import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../App.css'

function NavigationBar() {
  const navbarStyle = {   
    padding: '10px 20px',
  };

  const navLinkStyle = {
    marginRight: '15px',
    color: '#343a40',
    fontWeight: 'normal',
    background: './assets/background.jpg',
  };

  return (
  
    <Navbar style={navbarStyle}  expand="lg">
      <Navbar.Brand href="#">The Car Shop</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} exact="true" to="/" style={navLinkStyle}>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/buy" style={navLinkStyle}>
            Buy a Car
          </Nav.Link>
          <Nav.Link as={NavLink} to="/sell" style={navLinkStyle}>
            Sell a Car
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>




  );
}
export default NavigationBar;
