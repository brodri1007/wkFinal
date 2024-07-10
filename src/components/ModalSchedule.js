import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CarShopService from '../services/CarShopService';




export default function ModalSchedule({ car, setCarList, getCars}) {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("")


  
  
  
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

const [show, setShow] = useState(false);
const handleClose = () => {
  getCars();
  setShow(false);
}
const handleShow = () => setShow(true);


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        New appointment
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Test Drive it!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <div>
                <span>{car.id}</span>
                <img alt={car.model} src={require("./car.png")} width="450px" />
              </div>
              <span>Brand: {car.brand}</span>
              <span>Model: {car.model} </span> <br />
              <span>Miles: { car.miles}</span><br />
              <span>Year: {car.year }</span><br />
              <span>Price: {car.price }</span><br /><br />

            </Form.Group>

            <button className='btn btn-primary' >{car.id}</button>
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
            </Form.Group>

            <Form.Group className="mb-3" >
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

            <Form.Group className="mb-3">
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
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={e => handleTestDriveAppt(e)}>
            Schedule Now
          </Button>
        </Modal.Footer>
      </Modal>

    </>

  )
}
