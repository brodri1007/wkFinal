import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CarImg from '../assets/car.png';
import CarShopService from '../services/CarShopService';

function CarDetailsModal({ car, getCars, setCarList}) {

  const [apptId, setApptId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);

  console.log(car.length)  

  useEffect(() => {
    setApptId(car.appointment? car.appointment.length + 1 : 1)
    }, [car.appointment]);
  
 

  const handleShow = () => setShow(true);

  const handleClose = () => {
    getCars();
    clearFormFields();
    setShow(false);
  };

  const clearFormFields = () => {
    setEmail("");
    setName("");
    setDate(null);
  };

  const updateItem = (id, newApp) => {
    setCarList((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...newApp } : item
      )
    );
  };

  const handleTestDriveAppt = (e) => {
    e.preventDefault();

    if (!email || !name || !date) {
      alert("Please fill out all fields.");
      return;
    }

    const newAppointment = { apptId, email, name, date };
    const newApp = {
      ...car,
      appointment: car.appointment ? [...car.appointment, newAppointment] : [newAppointment],
    };

    console.log(newApp);
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
            <Col><strong>Brand:</strong></Col>
            <Col>{car.brand}</Col>
          </Row>
          <Row>
            <Col><strong>Model:</strong></Col>
            <Col>{car.model}</Col>
          </Row>
          <Row>
            <Col><strong>Year:</strong></Col>
            <Col>{car.year}</Col>
          </Row>
          <Row>
            <Col><strong>Miles:</strong></Col>
            <Col>{car.miles}</Col>
          </Row>
          <br /><br /><br />
          <h3>WANT TO TEST DRIVE IT?</h3>
          <br />
          <Form onSubmit={handleTestDriveAppt}>
            <Form.Group className="mb-3">
              <Form.Control
                type="hidden"
                name="apptId"
                value={apptId}
              />
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
              <Form.Label className="form-label">Date </Form.Label>
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
