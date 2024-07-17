import React, { useState } from 'react';
import { Col, Row, Button, ButtonGroup, Container } from 'react-bootstrap';
import CarShopService from '../services/CarShopService';
import CarImg from '../assets/car.png';
import CarUpdate from './CarUpdate';
import './MyCarsForSale.css'; // Ensure custom styles are loaded
import CarDetailsModal from './CarDetailsModal';

export default function MyCarsForSale({ carList, setCarList, getCars }) {
  const service = new CarShopService();
  const [editingCarId, setEditingCarId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await service.deleteCar(id);
      getCars();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const toggleView = (id) => {
    setEditingCarId(editingCarId === id ? null : id);
  };

  return (

    <Container>
      <h1 className="header">Your Cars</h1>

      {carList.length > 0 ? (
        <>
         <div className="d-flex justify-content-center"> These are the cars you have listed for sale in the shop.</div>
          <br />
          <br />
        </>
      ) : (
        "There are no cars for sale at this time. Please list some."
      )}

<Row className="d-flex justify-content-center">
        {carList?.map((car, i) => (
          <Col sm="auto" key={car.id} className="d-sm-flex ">
            <div className="car-card shadow-sm p-2 mb-4 bg-white rounded">
              <div className="col border bg-light rounded">
                <span>{car.id}</span>
                <img alt={car.model} src={CarImg} className="img-fluid mb-3" style={{ width: '200px' }} />
                <br />
                {editingCarId === car.id ? (
                  <CarUpdate car={car} toggleView={toggleView} getCars={getCars} />
                ) : (
                  <div className="text-center">
                    <strong>Brand:</strong> {car.brand || 'Brand not available'}
                    <br />
                    <strong>Model:</strong> {car.model || 'Model not available'}
                    <br />
                    <strong>Miles:</strong> {car.miles ? car.miles.toString() : 'Miles not available'}
                    <br />
                    <strong>Year:</strong> {car.year ? car.year.toString() : 'Year not available'}
                    <br />
                    <strong>Price:</strong> ${car.price || 'Price not available'}
                    <br />
                    <br />
                    <div className="d-flex justify-content-center">
                      <ButtonGroup aria-label="car ctions" size="lg" className="mb-2">
                        <Button variant="danger" onClick={() => handleDelete(car.id)}>Delete</Button>
                        <Button variant="secondary" onClick={() => toggleView(car.id)}>Edit</Button>                       
                      </ButtonGroup>                      
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
