import React from 'react';
import { Card, Button } from 'react-bootstrap';
import CarImg from './car.png';
import CarDetailsModal from './CarDetailsModal';
import CarShopService from '../services/CarShopService';

function CarCard({ car, getCars, setCarList, carList }) {

  const service = new CarShopService();

  const handleDelete = async (id) => {
    try {
      await service.deleteCar(id);
      getCars();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <Card className="mb-4 shadow-sm" style={{ borderRadius: '15px' }}>
      <Card.Img variant="top" className="img-fluid" src={CarImg} style={{ borderRadius: '15px 15px 0 0' }} />
      <Card.Body>
        <Card.Title className="text-center mb-3">{car.year} {car.model}</Card.Title>
        <div className="d-flex justify-content-between">
          <CarDetailsModal car={car} setCarList={setCarList} getCars={getCars} />
          <Button variant="danger" onClick={() => handleDelete(car.id)}>🗑</Button>
        </div>
      </Card.Body>

      <Card.Footer>
        <div className='appointments'>
          <p className='fw-normal fs-5'>Appointments</p>
          <ul className='list-unstyled'>
            {car.appointment?.map((appt, i) => {
              const date = new Date(appt.date);
              const formattedDate = `${date.getMonth() + 1}/${date.getDate()} @ ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
              return (
                <li key={i} className='my-2'>
                  {formattedDate} 
                </li>
              );
            })}
          </ul>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default CarCard;
