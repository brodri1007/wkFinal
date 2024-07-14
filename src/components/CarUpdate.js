import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CarShopService from '../services/CarShopService';

export default function CarUpdate({ handleClick, car, toggleView, getCars }) {

  const service = new CarShopService();

  const [id, setId] = useState(car.id);
  const [brand, setBrand] = useState(car.brand);
  const [model, setModel] = useState(car.model);
  const [miles, setMiles] = useState(car.miles);
  const [year, setYear] = useState(car.year);
  const [price, setPrice] = useState(car.price);

  const updatedCar = {
    id: id,
    brand: brand,
    model: model,
    miles: miles,
    year: year,
    price: price
  };

  const updateCarData = async (id, data) => {
    try {
      const updatedCar = await service.updateCar(id, data);
      console.log('Car updated successfully:', updatedCar);
      // Handle the successful update (e.g., update state or notify the user)
    } catch (error) {
      console.error('Error updating car:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updatedCar);
    updateCarData(id, updatedCar);
    getCars();
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
                type="text"
                value={miles}
                onChange={(e) => setMiles(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="year" className="mb-3">
              <Form.Label>Year:</Form.Label>
              <Form.Control
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="price" className="mb-3">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button type="submit" variant="primary" className="btn">Update Car</Button>
              <Button variant="secondary" onClick={() => toggleView(car.id)}>Close</Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
}
