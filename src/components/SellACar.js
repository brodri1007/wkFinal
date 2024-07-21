import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import MyCarsForSale from './MyCarsForSale';
import CarShopService from '../services/CarShopService';

/**
 * SellACar This component handles the form submission for adding a new car and listing it for sale.  * 
 * @param {Object} carList The ID of the car to be updated.
 * @param {String} setCarList The ID of the appointment to be deleted.  
 * @returns {Function} getCars The updated car data.
 * @throws {Error} If there is an error updating the car.
*/

const { v4: uuidv4 } = require('uuid');
//Uses uuidv4 to generate unique IDs for the new car and seller ID.
const uuid = uuidv4();

function SellACar({ carList, setCarList, getCars }) {

  //Instantiate Car service to manipulate API
  const service = new CarShopService();

  //Declare state variables for new Car listing
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [miles, setMiles] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');

  //The form submission is handled here, preventing the default form action, calling the addCar function. 
  const handleSubmit = async (e) => {

    e.preventDefault();

      //Creates newCar object to be passed to the addCar function and use state hooks to manage form input values.
      //Convert input values to appropriate types (integer, float). 
    const newCar = {
      id: uuid, // Generate a new ID based on the length of the list
      brand,
      model,
      miles: parseInt(miles), // Convert miles to integer
      year: parseInt(year), // Convert year to integer
      price: parseFloat(price), // Convert price to float
      sellerId: uuid,
    };

    try {
      await service.addCar(newCar);
      setCarList([...carList, newCar]);
      clearFormFields();
    } catch (error) {
      console.error('Error adding car:', error);
      // Display error message)
    }
  };

  //After a successful submission, clear the form fields with clearFormFields.
  const clearFormFields = () => {
    setBrand('');
    setModel('');
    setMiles('');
    setYear('');
    setPrice('');
  };

  return (
    <div className="App">
      <Container className="d-block">
        <h1>Sell your car with us</h1>
        <h3 className="lead text-primary">Carshop will find a buyer for your car in less than 24 hours, guaranteed!</h3>
        <br />
        <br />
        <p>Enter your car's information below and let our super smart engine find a buyer.</p>
        {/* Use Bootstrap components (Container, Form, Row, Col, InputGroup) for layout and styling. */}
        <Row>
          <Col>
            <Form className="card p-4" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter the brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter the model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Miles</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      placeholder="How many miles"
                      value={miles}
                      onChange={(e) => setMiles(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="4">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
              
                Add a Car
              
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <MyCarsForSale carList={carList} setCarList={setCarList} getCars={getCars} />
    </div>
  );
}

export default SellACar;
