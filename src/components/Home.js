// components/Home.js
import React from 'react';
import { Button } from 'react-bootstrap';
import {Link } from 'react-router-dom'
import BootstrapIcon from '../assets/bootstrap.svg'; // Adjust the path according to your project structure

function Home() {
  return (
    <>
      <div className='container-fluid row p-5 text-center '>
        <h1>Welcome!</h1>
        <div className="card col" style={{ width: '18rem' }}>
          <div className="card-body">
            <Link className="nav-link" to="/buy">
              <Button variant="primary" className="mt-2">Buy a Car</Button>
            </Link>
          </div>
        </div>
        <div className="card col" style={{ width: '18rem' }}>
          <div className="card-body">
            <Link className="nav-link" to="/sell">
              <Button variant="primary" className="mt-2">Sell a Car</Button>
            </Link>
          </div>
        </div>
      </div >
    </>
  );
}

export default Home;
