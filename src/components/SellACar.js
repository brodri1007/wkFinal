import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import MyCarsForSale from './MyCarsForSale';
import CarShopService from '../services/CarShopService';

function SellACar({ carList, setCarList, getCars }) {
  
  
      
  const service = new CarShopService();

  const [id, setId] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [miles, setMiles] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [sellerId, setSellerId] = useState("0938773");

  const handleSubmit = (e) => {

    e.preventDefault();

    const newCar = {
      id: carList.length + 1, // Generate a new ID based on the length of the list
      brand: brand,
      model: model,
      miles: miles,
      year: year,
      price: price,
      sellerId: sellerId
    };

    if (!newCar.brand || !newCar.model || !newCar.miles || !newCar.year || !newCar.price) {
      alert("Please enter the car's information to continue.");
      return;
    }

    service.addCar(newCar);
    setCarList([...carList, newCar]);

    // Clear form fields
    setId("");
    setBrand("");
    setModel("");
    setMiles("");
    setYear("");
    setPrice("");
  };

  return (
    <div className="App">
      <Container>
        <h1>Sell your car with us</h1>
        <p>Carshop will find a buyer for your car in less than 24 hours, guaranteed!</p>
        <span>Enter your car's information below and let our super smart engine find a buyer.</span><br></br><br></br>
        <div className='row'>
          <div className='col'>
            <form onSubmit={handleSubmit}>
              <input
                type="hidden"
                id="id"
                name="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <input
                type="hidden"
                id="sellerId"
                name="sellerId"
                value={sellerId}
              />
              <label htmlFor="brand">Brand</label>
              <input
                placeholder='Enter the brand'
                type="text"
                id="brand"
                name="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <label htmlFor="model">Model</label>
              <input
                placeholder='Enter the model'
                type="text"
                id="model"
                name="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
              <label htmlFor="miles">Miles</label>
              <input
                placeholder='How many miles'
                type="text"
                id="miles"
                name="miles"
                value={miles}
                onChange={(e) => setMiles(e.target.value)}
              />
              <label htmlFor="year">Year</label>
              <input
                placeholder='Enter the Year'
                type="text"
                id="year"
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              <label htmlFor="price">Price</label>
              <input
                placeholder='Enter a price'
                type="text"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <button type="submit">Add a Car</button>
            </form>
          </div>
        </div>
      </Container>
      <br /><br />
      <MyCarsForSale carList={carList} setCarList={setCarList} getCars={getCars} />
    </div>
  );
}

export default SellACar;
