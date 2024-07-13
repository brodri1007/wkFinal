import React from 'react';
import {Button } from 'react-bootstrap';
import {Link } from 'react-router-dom'

function Hero() {
  return (
 
    <div className=" container-fluid row p-5 text-center  text-center Jumbotron">
      <h1>Welcome!</h1>
      <p>Browse through our extensive collection of new and used cars.</p>
      <div className="card col" style={{ width: '10rem' }}>
          <div className="card-body">
            <Link className="nav-link" to="/buy">
              <Button variant="primary" className="mt-2">Buy a Car</Button>
            </Link>
          </div>
        </div>
        <div className="card col" style={{ width: '10rem' }}>
          <div className="card-body">
            <Link className="nav-link" to="/sell">
              <Button variant="primary" className="mt-2">Sell a Car</Button>
            </Link>
          </div>
        </div>
    </div>
  );
}

export default Hero;