import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CarImg from '../assets/car.png';
import CarShopService from '../services/CarShopService';

function CarDetailsModal({ car, getCars, setCarList, carList }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState(null); // Use null for initial state of DatePicker

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => {
    getCars();
    clearFormFields();
    setShow(false);
  };

  const clearFormFields = () => {
    setEmail("");
    setName("");
    setDate(null); // Reset date to null
  };

  const updateItem = (id, newApp) => {
    setCarList((prevItems) => 
      prevItems.map((item) => 
        item.id === id ? { ...item, ...newApp } : item    
      )    
    );
    console.log("CarList" + carList);
  };
  
  const handleTestDriveAppt = (e) => {
    e.preventDefault();

    const newApp = {
      id: car.id,
      model: car.model,
      brand: car.brand,
      year: car.year,
      price: car.price,
      miles: car.miles,
      sellerid: car.sellerid,
      appointment: car.appointment 
        ? [...car.appointment, { email, name, date }] 
        : [],
    };

    const service = new CarShopService();
    service.updateCar(car.id, newApp)
      .then(() => {
        updateItem(car.id, newApp);        
        handleClose();
      })
      .catch((error) => {
        console.error('Error updating car:', error);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Car Details
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{car.model}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img alt={car.model} className="img-fluid car-image" src={CarImg} />
          <Row>
            <Col>Brand:</Col>
            <Col>{car.brand}</Col>
          </Row>
          <Row>
            <Col>Model:</Col>
            <Col>{car.model}</Col>
          </Row>
          <Row>
            <Col>Year:</Col>
            <Col>{car.year}</Col>
          </Row>
          <Row>
            <Col>Miles:</Col>
            <Col>{car.miles}</Col>
          </Row>
          <br></br> <br></br> <br></br>
          <h2>Wanna test drive it?</h2>
          <br></br> 
          <Form onSubmit={handleTestDriveAppt}>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Form.Label className="form-label">Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <Form.Label className="form-label">Date</Form.Label>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="form-control"
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Schedule Now
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CarDetailsModal;
