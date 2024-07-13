import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
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



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updatedCar);
    service.updateCar(id, updatedCar);
    getCars();
    toggleView(id);
  };

  return (
    <Container>
      <div className='row' id={id}>
        <div className='col'>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="hidden"
                id="id"
                name="id"
                value={id}
              />
              <label htmlFor="brand">Brand:</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="model">Model:</label>
              <input
                type="text"
                id="model"
                name="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="miles">Miles:</label>
              <input
                type="text"
                id="miles"
                name="miles"
                value={miles}
                onChange={(e) => setMiles(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="year">Year:</label>
              <input
                type="text"
                id="year"
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <Button type="submit" className="btn">Update Car</Button>
            <Button className="btn" onClick={() => toggleView(car.id)}>Close</Button>
          </form>
        </div>
      </div>
    </Container>
  );
}
