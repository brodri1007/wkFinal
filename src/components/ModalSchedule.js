import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CarShopService from '../services/CarShopService';

export default function ModalSchedule({carid, carList, setCarlist}) {

   console.log(" carList: " +  JSON.stringify(carList) )
   console.log(" setCarList: " +  setCarlist )
    
   const service = new CarShopService();

   const car_id = carid;
   let singleCar = carList.filter(car => car.id !== car_id);

   const [singleCarList, setSingleCarList] = useState({singleCar});
   const [newAppointment, setNewAppointment] = useState({ email: '', name: '', date: '' });
   singleCarList.push(newAppointment);
   setCarlist(...carList, singleCarList); 
  

    const AddAppointment = () => {
      
    const [appointment, setAppointment] = useState([]);    
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewAppointment({ ...newAppointment, [name]: value });
    };
  
    const addAppointment = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("https://6659cc10de346625136df8bb.mockapi.io/car/" + {carid}, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAppointment),
        });
  
        if (response.ok) {
          const addedAppointment = await response.json();
          setAppointments([...appointments, addedAppointment]);
          setMessage('Appointment added successfully!');
          setNewAppointment({ email: '', name: '', date: '' }); // Clear form
        } else {
          setMessage('Failed to add appointment');
        }
      } catch (error) {
        setMessage('Failed to add appointment');
        console.error('Error adding appointment:', error);
      }
    }
  }
 
//data: JSON.stringify(data), contentType: "application/json; charset=utf-8" : http://pro.jsonlint.com/
//Provide the id and the object, second, in backend fetch by the provided id, then construct your new object finally do an update 
  
const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 


const [formData, setFormData] = useState({

    id: "",
    model: "",
    miles: "",
    year: "",
    brand: "",
    price: "",
    appointment: [
      {
        "email": "",
        "name": "",
        "date": ""
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

    //setCarList([...carList, formData]);
   
     

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
                <span>{}</span>
                <img src={require("./car.png")} width="450px" />
              </div>
              <span>Brand-Model: {} {}</span>
              <br />
              <span>Miles: {}</span><br />
              <span>Year: {}</span><br />
              <span>Price: {}</span><br /><br />

            </Form.Group>
            <Form.Group className="mb-3" >
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={''}
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
          <Button variant="primary" onClick={e => handleSubmit(e)}>
            Schedule Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
