

import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CarCard from './CarCard';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';




const BuyACar = ({ carList, setCarList, getCars }) => {
  return (
    <main className="p-5 text-center app-background">
      <h1>Find Your Perfect Car</h1>
      {carList.length > 0 ? (
        <h3 className="lead text-primary">Browse through our extensive collection of new and used cars.</h3>
      ) : (
        <>
          <p>There are no cars for sale at this time. Please list some.</p>
          <div className="col-12 my-3">
            <Button variant="primary">
              <Link className="text-white" to="/sell">Sell a car</Link>
            </Button>
          </div>
        </>
      )}
      <div className="pb-6"></div>
      <Row className="d-flex justify-content-center">
        {carList?.map((car, i) => (
          <Col key={i}>
            <CarCard car={car} setCarList={setCarList} getCars={getCars} carList={carList} />
          </Col>
        ))}
      </Row>
    </main>
  );
};

export default BuyACar;
