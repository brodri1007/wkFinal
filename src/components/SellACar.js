import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import MyCarsForSale from './MyCarsForSale';
import CarShopService from '../services/CarShopService';
import InputGroup from 'react-bootstrap/InputGroup';

function SellACar({ carList, setCarList, getCars}) {

  const service = new CarShopService();
  const [validated, setValidated] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [miles, setMiles] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [sellerId] = useState("0938773");

  const handleSubmit = async (e) => {

    e.preventDefault();

    function ClearFormFields() {
      // Clear form fields
      setBrand("");
      setModel("");
      setMiles("");
      setYear("");
      setPrice("");
    }

    const newCar = {
      id: carList.length + 1, // Generate a new ID based on the length of the list
      brand,
      model,
      miles,
      year,
      price,
      sellerId
    };

    if (!newCar.brand || !newCar.model || !newCar.miles || !newCar.year || !newCar.price) {
      alert("Please enter the car's information to continue.");
      return;
    }

    try {
      await service.addCar(newCar);
      setCarList([...carList, newCar]);
      ClearFormFields();

    } catch (error) {
      console.error("Error adding car:", error);
    }

  };

  return (
    <div className="App app-background">
      <Container className='d-block'>
        <h1>Sell your car with us</h1>
        <h3 className='lead text-primary'>Carshop will find a buyer for your car in less than 24 hours, guaranteed!</h3><br></br><br></br>
        <p>Enter your car's information below and let our super smart engine find a buyer.</p>
        <Row>
          <Col>
            <Form className='card p-4' validated={validated} onSubmit={handleSubmit}>
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
                <Form.Group as={Col} md="4" >
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
              <Button variant="primary" type="submit">Add a Car</Button>
            </Form>

          </Col>
        </Row>
      </Container>
      <br /><br />
      <MyCarsForSale carList={carList} setCarList={setCarList} getCars={getCars} />
    </div>
  );
}

export default SellACar;
