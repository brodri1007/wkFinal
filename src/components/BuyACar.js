import { React, useEffect } from 'react'
//import CarShopService from '../services/CarShopService';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';
import ModalSchedule from './ModalSchedule';



const BuyACar = ({ carList, setCarList }) => {
  console.log('ChildComponent appointments:', carList);


  const handleDelete = (id) => {

    const updatedCarList = carList.filter(car => car.id !== id);
    setCarList(updatedCarList);   
  };

 
  return (
    <div className="App">
      <Container>
        <div><h1 className="header">The Car Shop</h1></div>
        <p>Select from our inventory below:</p>
        <Row>
          {carList?.map((car, i) => (

            <Col md="auto" key={car.id} className='d-md-flex'>
              <div key={i} className="car-card">
                <div className="col p-3 border bg-light">
                  <div>
                    <span>{car.id}</span>
                    <img alt={car.model} src={require("./car.png")} width="150px" />
                  </div>
                  <span>Brand: {car.brand} </span><br></br>
                  <span>Model: {car.model}</span> <br /><br />   
                  <span>Price: {car.price}</span><br /><br />
                  <ModalSchedule carList={carList}/>
<button onClick={(e) => handleDelete(car.id)} className="btn">🗑</button>
                </div>
                <div className="appointments border p-3">
                 
                    <strong>Scheduled Appointments</strong><br></br>
                    {car.appointment? ( 
                      <div>
                      
                        {car.appointment?.map((appt,i) => (
                            <li key={i}> {appt.date.substring(5, 7) + "/" + appt.date.substring(8, 10) + " @ " + appt.date.substring(16, 11) + "PM"}  </li>                      
                      ))}
                       
                      </div>
                    ) : "There are no appointments"}

                  
                  <br></br>
                </div>
              </div>
            </Col>
          )
          )}
        </Row>
      </Container>
      <Row>
        <Col className='d-md-flex' > </Col>
      </Row>
    </div>
  );
};

export default BuyACar;


