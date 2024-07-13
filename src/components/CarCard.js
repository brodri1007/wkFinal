import React from 'react';
import { Card, Button } from 'react-bootstrap';
import CarImg from './car.png';
import CarDetailsModal from './CarDetailsModal';
import CarShopService from '../services/CarShopService';


function CarCard({ car, getCars, setCarList, carList }) {

    const service = new CarShopService();

    const handleDelete = (id) => {
        const updatedCarList = carList.filter(car => car.id !== id);
        setCarList(updatedCarList);
        service.deleteCar(id);
    };


    return (

        <Card className="mb-4">

            <Card.Img variant="top" className="img-fluid" src={CarImg} width="100px" />

            <Card.Body>
                <Card.Title>{car.year} {car.model} {car.sellerId}</Card.Title>
                <CarDetailsModal car={car} setCarList={setCarList} getCars={getCars} /><span> </span>
                <Button variant="primary" onClick={(e) => handleDelete(car.id)}>🗑</Button>

            </Card.Body>

            <Card.Footer>
                <div className='appointments'><p className='fw-normal fs-5 text'> Appointments</p>
                    <ul>
                        {car.appointment?.map((appt, i) => (

                            <li key={i}> {(appt.date.substring(5, 7) + "/" + appt.date.substring(8, 10) + " @ " + appt.date.substring(16, 11)).substring(10, 8) > 11 ?
                                appt.date.substring(5, 7) + "/" + appt.date.substring(8, 10) + " @ " + appt.date.substring(16, 11) + " PM" :
                                appt.date.substring(5, 7) + "/" + appt.date.substring(8, 10) + " @ " + appt.date.substring(16, 11) + " AM"}  </li>

                        ))
                        }

                    </ul>
                </div>
            </Card.Footer>

        </Card>
    );
}

export default CarCard;