import React, { useState } from 'react';
import { Col, Row, Button, Container } from 'react-bootstrap';
import CarShopService from '../services/CarShopService';
import CarImg from '../assets/car.png';
import CarUpdate from './CarUpdate';
import './MyCarsForSale.css'; // Ensure custom styles are loaded

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
          These are the cars you have listed for sale in the shop.
          <br />
          <br />
        </>
      ) : (
        "There are no cars for sale at this time. Please list some."
      )}
      <Row>
        {carList?.map((car, i) => (
          <Col md="auto" key={car.id} className="d-md-flex">
            <div className="car-card shadow-sm p-3 mb-4 bg-white rounded">
              <div className="col p-3 border bg-light rounded">
                <span>{car.id}</span>
                <img alt={car.model} src={CarImg} className="img-fluid mb-3" style={{ width: '150px' }} />
                <br />
                {editingCarId === car.id ? (
                  <CarUpdate car={car} toggleView={toggleView} getCars={getCars} />
                ) : (
                  <div>
                    <strong>Brand:</strong> {car.brand || 'Brand not available'}
                    <br />
                    <strong>Model:</strong> {car.model || 'Model not available'}
                    <br />
                    <strong>Miles:</strong> {car.miles ? car.miles.toString() : 'Miles not available'}
                    <br />
                    <strong>Year:</strong> {car.year ? car.year.toString() : 'Year not available'}
                    <br />
                    <strong>Price:</strong> {car.price || 'Price not available'}
                    <br />
                    <br />
                    <div className='d-flex justify-content-between'>
                      <Button variant="danger" className="me-2" onClick={() => handleDelete(car.id)}>
                        Delete
                      </Button>
                      <Button variant="primary" onClick={() => toggleView(car.id)}>
                        Edit
                      </Button>
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
