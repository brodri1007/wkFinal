import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Hero.css'; // Assuming you have a CSS file for custom styles

function Hero() {
    
  return (
    <div className="container-fluid hero-section text-center p-5 app-background">
      <h1 className="hero-title">Welcome!</h1>
      <p className="hero-subtitle">Browse through our extensive collection of new and used cars.</p>
      <div className="row justify-content-center">
        <div className="card col-md-3 mx-2 my-2">
          <div className="card-body">
            <Link className="nav-link" to="/buy">
              <Button variant="primary" className="mt-2">Buy a Car</Button>
            </Link>
          </div>
        </div>
        <div className="card col-md-3 mx-2 my-2">
          <div className="card-body">
            <Link className="nav-link" to="/sell">
              <Button variant="primary" className="mt-2">Sell a Car</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
