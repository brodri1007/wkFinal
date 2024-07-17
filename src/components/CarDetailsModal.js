import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CarImg from '../assets/car.png';
import CarShopService from '../services/CarShopService';
import '../App.css';


function CarDetailsModal({ car, getCars, setCarList }) {

  const [apptId, setApptId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);


  useEffect(() => {
    setApptId(car.appointment ? car.appointment.length + 1 : 1)
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

    // console.log(newApp);
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
        View
      </Button>
      <Modal show={show} onHide={handleClose} centered dialogClassName="car-modal-width">
        <Modal.Header closeButton>
          <Modal.Title>{car.year} {car.model}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img alt={car.model} className="img-fluid" src={CarImg} width="340" />
          <strong>Brand:</strong> {car.brand || 'Brand not available'}
          <br />
          <strong>Model:</strong> {car.model || 'Model not available'}
          <br />
          <strong>Miles:</strong> {car.miles ? car.miles.toString() : 'Miles not available'}
          <br />
          <strong>Year:</strong> {car.year ? car.year.toString() : 'Year not available'}
          <br />
          <strong>Price:</strong> ${car.price || 'Price not available'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Schedule Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CarDetailsModal;
