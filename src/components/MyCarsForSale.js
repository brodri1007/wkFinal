import { React, useState, useEffect } from 'react'
import CarShopService from '../services/CarShopService';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';

export default function MyCarsForSale ({myCarList}) {

  function ListForSale(car) {
    let service = new CarShopService();
    service.addCar(car);
  }



  return (

        <Container>
        <div><h1 className="header">Your Cars</h1></div>
        <p>Enter a car's information to list it in the shop.</p>
          <Row>
      
            {myCarList?.map((car) => (
              <Col md="auto" key={car.id} className='d-md-flex'>
                <div className="car-card">
                  <div className="col p-3 border bg-light">
                    <div>
                      <span>{car.id}</span>
                      <img alt={car.model} src={require("./car.png")} width="150px" />
                    </div>
                    <span>Seller Id: {car.sellerId} </span><br />  
                    <span>Brand-Model: {car.brand} {car.model}</span><br />                    
                    <span>Miles: {car.miles}</span><br />
                    <span>Year: {car.year.substring(0, 4)}</span><br />
                    <span>Price: {car.price}</span><br /><br />
                    <Button className="btn" onClick={(e) => ListForSale(car)}>List for Sale</Button>
                    <br></br>
                    <Col> </Col>
                  </div>
                  <br></br><br></br>
                </div>  
              </Col>
            )
            )}
          </Row>
        </Container>
    )
}