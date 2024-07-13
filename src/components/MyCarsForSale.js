import React, { useState } from 'react';
import CarShopService from '../services/CarShopService';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';
import carImage from './car.png'; // Ensure this path is correct
import CarUpdate from './CarUpdate';

export default function MyCarsForSale({ carList, setCarList, getCars }) {

  const service = new CarShopService();

  const handleDelete = (id) => {
    const updatedCarList = carList.filter(car => car.id !== id);
    setCarList(updatedCarList);
    service.deleteCar(id);
  };



  function toggleView(id) {

    var elD = (document.getElementById("D" + id));
    var el = document.getElementById(id);

    if (elD && elD.style.display === 'none') {
      elD.style.display = 'block';
      el.style.display = 'none'
    }
    else {
      elD.style.display = 'none';
      el.style.display = 'block'
    }
  }


  return (
    <Container>
      <div><h1 className="header">Your Cars</h1></div>
      <p>These are the cars you have listed for sale in the shop.</p>
      <Row>
        {carList?.map((car) => (
          <Col md="auto" key={car.id} className='d-md-flex'>
            <div className="car-card">
              <div className="col p-3 border bg-light">
                <span>{car.id}</span>
                <img alt={car.model} src={carImage} width="150px" /><br></br>
                <div id={"D" + car.id}>
                  <strong>Brand:</strong> {car.brand || 'Brand not available'}<br></br>
                  <strong>Model:</strong> {car.model || 'Model not available'}<br></br>
                  <strong>Miles:</strong> {car.miles ? car.miles.toString() : 'Miles not available'}<br></br>
                  <strong>Year:</strong> {car.year ? car.year.toString() : 'Year not available'}<br></br>
                  <strong>Price:</strong> {car.price || 'Price not available'}<br></br><br></br>

                  <div className='col'><Button
                    className="btn"
                    onClick={(e) => handleDelete(car.id)}
                  >
                    Delete
                  </Button>
                    <Button
                      className="btn"
                      onClick={() => toggleView(car.id)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
                <span id={car.id} style={{ display: "none" }}><CarUpdate car={car} toggleView={toggleView} getCars={getCars} /></span>
              </div>
              <br></br><br></br>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
