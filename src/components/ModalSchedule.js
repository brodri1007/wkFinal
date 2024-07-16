import { useState } from 'react';
import { Button, Form, Modal, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CarShopService from '../services/CarShopService';
import CarImg from '../assets/car.png'; // Ensure correct path to the image
import './ModalSchedule.css'; // Ensure custom styles are loaded

export default function ModalSchedule({ car, setCarList, getCars }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleClose = () => {
    getCars();
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const updateItem = (id, newApp) => {
    setCarList((prevItems) =>
      prevItems.map((item) => item.id === id ? newApp : item)
    );
  };

  const handleTestDriveAppt = async (e) => {
    e.preventDefault();

    if (!email || !name || !date) {
      alert("Please enter all appointment information to continue.");
      return;
    }

    const newApp = {
      ...car,
      appointment: car.appointment ? [...car.appointment, { email, name, date }] : [{ email, name, date }],
    };

    try {
      const service = new CarShopService();
      await service.updateCar(car.id, newApp);
      updateItem(car.id, newApp);
      setEmail("");
      setName("");
      setDate(new Date());
      handleClose();
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Car Details
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="modal-title">Test Drive it!</Modal.Title>
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
