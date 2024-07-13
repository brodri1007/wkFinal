import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import CarImg from './car.png';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CarShopService from '../services/CarShopService';




function CarDetailsModal({ car, getCars, setCarList }) {



  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
   

  const [show, setShow] = useState(false);
  const handleClose = () => {
    getCars();
    setShow(false);
  }
  const handleShow = () => setShow(true);
  
  
  const updateItem = (id, newApp) => {
    setCarList((prevItems) => prevItems.map((item) => item.id === id ? {newApp}: item))
  
  }

  const handleTestDriveAppt = (e) => {

    e.preventDefault()

    let newApp =
    {
      id: car.id,
      model: car.model,
      brand: car.brand,
      year: car.year,
      price: car.price,
      miles: car.miles,
      sellerid: car.sellerid,
      appointment: car.appointment ? [...car.appointment, { email: email, name: name, date: date }] : [],
    }


    let service = new CarShopService();     
    service.updateCar(car.id, newApp); 
    updateItem(car.id, newApp);   
   //console.log(car);
    getCars();
    setEmail("");
    setName("");
    setDate("");
    handleClose();
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
        <Form>
        <img src={CarImg} alt={car.model} className="img-fluid mb-3" />
        <div className="details">
          <p><strong>Brand:</strong> {car.brand}</p>
          <p><strong>Model:</strong> {car.model}</p>
          <p><strong>Miles:</strong> {car.miles}</p>
          <p><strong>Year:</strong> {car.year}</p>
          <p><strong>Price:</strong> {car.price}</p>
        </div>
        <div className="text-center text-uppercase"><strong>Test-Drive It</strong></div>
        <div className="text-center">Book an appointment now.</div><br></br>
        <Form.Group className="mb-3" >
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </label>

              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </label>
 

            </Form.Group>
            <label>
                Date:
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  showIcon="true"
                />
              </label>
          </Form>
      </Modal.Body>
      <Modal.Footer>        
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleTestDriveAppt}>Book</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default CarDetailsModal;