import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CarShopService from '../services/CarShopService';


/**
 * CarUpdate. This component allows the user to update car details and submit the updated data to a service.
 * 
 * @param {String} car Car to be displayed.
 * @param {Boolean Function} toggleView Function to re-render the UI after Appointment is deleted. 
 * @param {Function} getCars This function calls the allCars method of the CarShopService 
 * instance to fetch the list of all cars. It then updates the carList state with the fetched data.
 *
 */

export default function CarUpdate({ car, toggleView, getCars }) {

//The state variables are initialized with the current car details, allowing them to be edited.
  const [id] = useState(car.id);
  const [brand, setBrand] = useState(car.brand);
  const [model, setModel] = useState(car.model);
  const [miles, setMiles] = useState(car.miles);
  const [year, setYear] = useState(car.year);
  const [price, setPrice] = useState(car.price);

  const service = new CarShopService();

//The updatedCar object is constructed with the state variables to send the updated data.
  const updatedCar = {
    id,
    brand,
    model,
    miles,
    year,
    price,
  };


  //This function handles updating the car data using the CarShopService. It also calls getCars to refresh the car list after a successful update.
  const updateCarData = async (id, data) => {
    try {
      await service.updateCar(id, data);
      console.log('Car updated successfully');
      getCars();
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };


  //The form submission is handled here, preventing the default form action, calling the update function, and toggling the view back.
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
