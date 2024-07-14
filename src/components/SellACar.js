import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import MyCarsForSale from './MyCarsForSale';
import CarShopService from '../services/CarShopService';

function SellACar({ carList, setCarList, getCars }) {
  const service = new CarShopService();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [miles, setMiles] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [sellerId] = useState("0938773");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      getCars();

      // Clear form fields
      setBrand("");
      setModel("");
      setMiles("");
      setYear("");
      setPrice("");
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <div className="App app-background">
      <Container>
        <h1>Sell your car with us</h1>
        <p>Carshop will find a buyer for your car in less than 24 hours, guaranteed!</p>
        <p>Enter your car's information below and let our super smart engine find a buyer.</p>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="model">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="miles">
                <Form.Label>Miles</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="How many miles"
                  value={miles}
                  onChange={(e) => setMiles(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="year">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Add a Car
              </Button>
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
