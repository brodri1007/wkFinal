import React from 'react';
import { Card, Button } from 'react-bootstrap';
import CarImg from '../assets/car.png';
import CarDetailsModal from './CarDetailsModal';
import CarShopService from '../services/CarShopService';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function CarCard({ car, getCars, setCarList, carList }) {

  const service =  new CarShopService();


  const handleApptDelete = (date) => { //We have to primary key for the appointments in the API, so I'm trying to delete the appointments by date/time
   


    try {
      const updatedCarList = carList.map(c => { //Filter the carList to find the car id

        if (c.id === car.id) {
          return {
            ...c, //Filter the list except the test drive appointment with the specified date
            appointment: c.appointment.filter(appt => appt.date !== date)
          };
        }   
      
        return console.log("C:" + c); //Return the filtered list. 
      });

      setCarList(updatedCarList);  //Update UI  
      service.updateCar(car.id, updatedCarList);  //Update the API to reflect the deleted appointment.
     
      
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

    return (
        <Container className='d-block'>
            <Row className='row row-cols-4'>
                <Col md="auto" className="row row-cols-44">
                    <Card className="justify-content-center shadow-sm" style={{ borderRadius: '15px' }}>
                        <Card.Img variant="top" className="img-fluid" src={CarImg} />
                        <Card.Body>
                            <Card.Title className="text-center mb-3">{car.year} {car.model}</Card.Title>
                            <div className="">
                                <CarDetailsModal car={car} setCarList={setCarList} getCars={getCars} />                                
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            
                            <div className='appointments'>
                                <p className='fluid'>Appointments</p>
                                <ul className='list-unstyled'>
                                    {car.appointment?.map((appt, i) => {//Loop over appointments and print with formatted date
                                        const date = new Date(appt.date);
                                        const formattedDate = `${date.getMonth() + 1}/${date.getDate()} @ ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                                        return (
                                            <li key={i} className='my-1 fluid'>
                                                {formattedDate} <Button onClick={() => handleApptDelete(appt.date)}>🗑</Button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>


   
  );
}

export default CarCard;
