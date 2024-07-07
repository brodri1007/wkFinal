import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CarShopService from '../services/CarShopService';

export default function ModalSchedule(props, { carList, setCarList }) {

   console.log(" carList: " +  JSON.stringify(carList) )
    
    const service = new CarShopService();

  //   const AddAppointment = () => {
  //   const [appointments, setAppointments] = useState([]);
  //   const [newAppointment, setNewAppointment] = useState({ email: '', name: '', date: '' });
  //   const [message, setMessage] = useState('');

  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setNewAppointment({ ...newAppointment, [name]: value });
  //   };
  
  //   const addAppointment = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const response = await fetch('https://api.example.com/appointments', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(newAppointment),
  //       });
  
  //       if (response.ok) {
  //         const addedAppointment = await response.json();
  //         setAppointments([...appointments, addedAppointment]);
  //         setMessage('Appointment added successfully!');
  //         setNewAppointment({ email: '', name: '', date: '' }); // Clear form
  //       } else {
  //         setMessage('Failed to add appointment');
  //       }
  //     } catch (error) {
  //       setMessage('Failed to add appointment');
  //       console.error('Error adding appointment:', error);
  //     }
  //   }
  // }
 

  let id = props.carid;
  let model = props.model;
  let miles = props.miles;
  let year = props.year;
  let brand = props.brand;
  let price = props.price;
  let appointment = props.appointment;
  let email = appointment.email;
  let name = appointment.name;
  let date = appointment.date;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({

    id: id,
    model: model,
    miles: miles,
    year: year,
    brand: brand,
    price: price,
    appointment: [
      {
        "email": email,
        "name": name,
        "date": date
      }
    ]   

  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date,
    });
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();

    console.log('Form Data:', formData);
    service.updateCar(id, formData);

    setCarList([...carList, formData]);
   
     

    handleClose();
  };

 

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        More Details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Test Drive it!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <div>
                <span>{id}</span>
                <img alt={model} src={require("./car.png")} width="450px" />
              </div>
              <span>Brand-Model: {brand} {model}</span>
              <br />
              <span>Miles: {miles}</span><br />
              <span>Year: {year.substring(0, 4)}</span><br />
              <span>Price: {price}</span><br /><br />

            </Form.Group>
            <Form.Group className="mb-3" >
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </Form.Group>

            <Form.Group className="mb-3" >
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>

            </Form.Group>

            <Form.Group className="mb-3">
              <label>
                Date:
                <DatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  showTimeSelect
                />
              </label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={e => handleSubmit(e, id)}>
            Schedule Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
