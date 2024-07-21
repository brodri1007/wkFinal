import React from 'react';
import { Card, Button, Col, Row, Container } from 'react-bootstrap';
import CarImg from '../assets/car.png';
import CarTesDriveModal from './CarTesDriveModal';
import CarShopService from '../services/CarShopService';


/**
 * CarCard. This component displays and individual car's image and details.
 * It checks for appointments, maps thru the appointments array of each car and displays any scheduled appointments. 
 * It also handles Appointment Deletion: The handleApptDelete function updates the local state 
 * first and then make a call to the API to update the backend.
 * 
 * @param {String} car Car to be displayed.
 * @param {Function} getCars This function calls the allCars method of the CarShopService 
 * instance to fetch the list of all cars. It then updates the carList state with the fetched data.
 * @param {Function} setCarList Function to update local storage.
 * @param {Array} carList The current list of cars that are available.   
 * @returns Container with car card for a single car.
 */

function CarCard({ car, getCars, setCarList, carList }) {

    //Instantiate Car service to manipulate API
    const service = new CarShopService();
    
    /**
    * handleApptDelete. Deletes the specified appointment ID.
    * @param {String} carId The ID of the car to be updated.
    * @param {String} apptId The ID of the appointment to be deleted.  
    * @returns Car's appointments UI with details and appointment info
    * @throws {Error} If there is an error updating the appointment.
    */
    const handleApptDelete = async (apptId, carId) => {

        try {
            // Filter carList to find the carId
            const updatedCarList = carList.map(c => {
                if (c.id === carId) {
                    return {
                        ...c,
                        // Filter the car's appointments and take out the appointment Id specified
                        appointment: c.appointment.filter(appt => appt.apptId !== apptId)
                    };
                }
                //Return the car without the specified appointment Id
                return c;
            });

            //Update the carList to excluded deleted appointment
            setCarList(updatedCarList);

            // Update the backend and log success if it does. Calls updateCard with the carId and the upated appointment information as the payload
            await service.updateCar(carId, { appointment: updatedCarList.find(c => c.id === carId)?.appointment });
            console.log("Appointment deleted successfully");
        } catch (error) {
            //If not catch the error and report it
            console.error('Error deleting appointment:', error);
        }
    };

// Container, Row, Col: Use Bootstrap grid to center the card and add padding.
    return (
        <Container>
            <Row className='pt-4 justify-content-center'>
                <Col md="auto">
                    <Card className="d-md-flex justify-content-center shadow-sm" style={{ borderRadius: '5px' }}>
                        <Card.Img variant="top" className="img-fluid" src={CarImg} alt="Car" />
                        <Card.Body>
                            <Card.Title className="text-center mb-3">
                                {car.year} {car.model}
                            </Card.Title>
                            {/*It uses the CarTesDriveModal component to provide link to view details and schedule new appointments */}
                            <CarTesDriveModal car={car} setCarList={setCarList} getCars={getCars} />
                        </Card.Body>
                        <Card.Footer>
                            <div className='appointments'>
                                {car.appointment.length > 0 ? (
                                    <p className='fs-6'>Appointments</p>
                                ) : (
                                    <p>There are no appointments</p>
                                )}
                                <ul className='list-unstyled'>
                                {/* Map the car's appointment array and return appointment, format date for diplay*/}
                                    {car.appointment?.map((appt, i) => {
                                        const date = new Date(appt.date);
                                        const formattedDate = `${date.getMonth() + 1}/${date.getDate()} @ ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                                        return (
                                            <li key={i} className='my-1 fluid'>
                                                 {/* List the appointment(s) and didplay a delete button */}
                                                {formattedDate} <Button variant="danger" size="sm" onClick={() => handleApptDelete(appt.apptId, car.id)}>🗑</Button>
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
