import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CarShopService from '../services/CarShopService';

export default function CarUpdate({ car, toggleView, getCars }) {
  const [id] = useState(car.id);
  const [brand, setBrand] = useState(car.brand);
  const [model, setModel] = useState(car.model);
  const [miles, setMiles] = useState(car.miles);
  const [year, setYear] = useState(car.year);
  const [price, setPrice] = useState(car.price);

  const service = new CarShopService();

  const updatedCar = {
    id,
    brand,
    model,
    miles,
    year,
    price,
  };

  const updateCarData = async (id, data) => {
    try {
      await service.updateCar(id, data);
      console.log('Car updated successfully');
      getCars();
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCarData(id, updatedCar);
    toggleView(id);
  };

  return (
    <Container>
      <div className='row' id={id}>
        <div className='col'>
          <Form onSubmit={handleSubmit} className="p-4 bg-light border rounded">
            <input
              type="hidden"
              id="id"
              name="id"
              value={id}
            />
            <Form.Group controlId="brand" className="mb-3">
              <Form.Label>Brand:</Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="model" className="mb-3">
              <Form.Label>Model:</Form.Label>
              <Form.Control
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="miles" className="mb-3">
              <Form.Label>Miles:</Form.Label>
              <Form.Control
                type="number"
                value={miles}
                onChange={(e) => setMiles(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="year" className="mb-3">
              <Form.Label>Year:</Form.Label>
              <Form.Control
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="price" className="mb-3">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button type="submit" variant="primary">Update Car</Button>
              <Button variant="secondary" onClick={() => toggleView(car.id)}>Close</Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
}
