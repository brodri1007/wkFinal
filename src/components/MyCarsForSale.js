import React, { useState } from 'react';
import CarShopService from '../services/CarShopService';
import { Col, Row, Button, Container } from 'react-bootstrap';
import carImage from './car.png'; // Ensure this path is correct
import CarUpdate from './CarUpdate';

export default function MyCarsForSale({ carList, setCarList, getCars }) {

  const service = new CarShopService();

  const handleDelete = async (id) => {
    try {
      await service.deleteCar(id);
      getCars();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  function toggleView(id) {
    const elD = document.getElementById("D" + id);
    const el = document.getElementById(id);

    if (elD && elD.style.display === 'none') {
      elD.style.display = 'block';
      el.style.display = 'none';
    } else {
      elD.style.display = 'none';
      el.style.display = 'block';
    }
  }

  return (
    <Container>
      <div><h1 className="header">Your Cars</h1></div>
      <p>These are the cars you have listed for sale in the shop.</p>
      <Row>
        {carList?.map((car, i) => (
          <Col md="auto" key={car.id} className="d-md-flex">
            <div className="car-card shadow-sm p-3 mb-4 bg-white rounded">
              <div key={i} className="col p-3 border bg-light rounded">
                <span>{car.id}</span>
                <img alt={car.model} src={carImage} className="img-fluid mb-3" style={{ width: '150px' }} /><br></br>
                <div id={"D" + car.id}>
                  <strong>Brand:</strong> {car.brand || 'Brand not available'}<br></br>
                  <strong>Model:</strong> {car.model || 'Model not available'}<br></br>
                  <strong>Miles:</strong> {car.miles ? car.miles.toString() : 'Miles not available'}<br></br>
                  <strong>Year:</strong> {car.year ? car.year.toString() : 'Year not available'}<br></br>
                  <strong>Price:</strong> {car.price || 'Price not available'}<br></br><br></br>

                  <div className='d-flex justify-content-between'>
                    <Button variant="danger" className="me-2" onClick={() => handleDelete(car.id)}>
                      Delete
                    </Button>
                    <Button variant="primary" onClick={() => toggleView(car.id)}>
                      Edit
                    </Button>
                  </div>
                </div>
                <span id={car.id} style={{ display: "none" }}>
                  <CarUpdate car={car} toggleView={toggleView} getCars={getCars} />
                </span>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
