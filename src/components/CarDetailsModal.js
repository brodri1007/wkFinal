import React, { useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import CarImg from '../assets/car.png';
import '../App.css';

/**
 * CarDetailsModal. This component displays a modal window 
/**
 * @param {Object} car Car to be displayed.
 */ 

function CarDetailsModal({ car}) {  

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {  
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View
      </Button>
      <Modal show={show} onHide={handleClose} centered className="small-form-control">
        <Modal.Header closeButton>
          <Modal.Title>{car.year} {car.model}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img alt={car.model} className="img-fluid" src={CarImg} width="340" /><br />
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
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CarDetailsModal;
