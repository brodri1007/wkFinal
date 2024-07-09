import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CarShopService from '../services/CarShopService';




export default function ModalSchedule({ car, setCarList}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("")
  
  
  let updatedCarList = [];
  const updateItem = (id, newApp) => {
    setCarList((prevItems) => prevItems.map((item) => item.id === car.id ? {newApp}: item))
  }

  const handleTestDriveAppt = (e) => {
    e.preventDefault()
let newApp = 
   {
    id :car.id,
    model: car.model,
    brand: car.brand,
    year: car.year,
    price: car.price,
    miles: car.miles,
    sellerid: car.sellerid,
    appointment: car.appointment ? [...car.appointment, {email:email, name:name, date:date}] : [],

}

    //const updatedCarList = carList.filter(car => car.id === id);
    let service = new CarShopService()
    updateItem(car.id, newApp)
    console.log(car);
    service.updateCar(car.id, newApp )
    
  };

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const handleDateChange = (date) => {
  console.log(date)
  setFormData({
    ...formData,
    date,
  });
 };

 console.log(updatedCarList.model);

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
           <span>Brand: {updatedCarList[0] }</span>
           <span>Model: {} </span>

           <br />
           <span>Miles: {}</span><br />
           <span>Year: {}</span><br />
           <span>Price: {}</span><br /><br />

         </Form.Group>
      
      <button className='btn btn-primary' >{car.id}</button>
      <Form.Group className="mb-3" >
           <label>
             Email:
             <input
               type="email"
               name="email"
              
               onChange={(e) => setEmail(e.target.value)}
             
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
             />
           </label>
         </Form.Group>
       </Form>
      </Modal.Body>
     <Modal.Footer>
       <Button variant="secondary" onClick={handleTestDriveAppt}>
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
