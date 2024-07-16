import React from 'react';
import { Card, Button } from 'react-bootstrap';
import CarImg from '../assets/car.png';
import CarDetailsModal from './CarDetailsModal';
import CarShopService from '../services/CarShopService';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function CarCard({ car, getCars, setCarList, carList }) {
    const service = new CarShopService();

    const handleApptDelete = async (apptId, carId) => {
        console.log(`Appointment Id: ${apptId}, Car Id: ${carId}`);

        try {
            const updatedCarList = carList.map(c => {
                if (c.id === carId) {
                    return {
                        ...c,
                        appointment: c.appointment.filter(appt => appt.apptId !== apptId)
                    };
                }
                return c;
            });

            setCarList(updatedCarList);

            await service.updateCar(carId, { appointment: updatedCarList.find(c => c.id === carId)?.appointment});
            console.log("Appointment deleted successfully");
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    return (
        <Container>
            <Row className='pt-4 justify-content-center'>
                <Col md="auto">
                    <Card className="shadow-sm" style={{ borderRadius: '0px' }}>
                        <Card.Img variant="top" className="img-fluid" src={CarImg} />
                        <Card.Body>
                            <Card.Title className="text-center mb-3">{car.year} {car.model}</Card.Title>
                            <CarDetailsModal car={car} setCarList={setCarList} getCars={getCars} />
                        </Card.Body>
                        <Card.Footer>
                            <div className='appointments'>
                                <p>Appointments</p>
                                <ul className='list-unstyled'>
                                    {car.appointment?.map((appt, i) => {
                                        const date = new Date(appt.date);
                                        const formattedDate = `${date.getMonth() + 1}/${date.getDate()} @ ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                                        return (
                                            <li key={i} className='my-1'>
                                                {formattedDate} <Button onClick={() => handleApptDelete(appt.apptId, car.id)}>🗑</Button>
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
