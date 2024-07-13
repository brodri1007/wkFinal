import React from 'react';
import {  Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';



const NavigationBar = () => {

    return (

        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">The Car Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/buy">Buy a car</Link>
          <Link className="nav-link" to="/sell">Sell a car</Link>          
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    )
}

export default NavigationBar;