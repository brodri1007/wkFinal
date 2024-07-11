import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import MyCarsForSale from './MyCarsForSale';
import CarShopService from '../services/CarShopService';



function SellACar({ carList, setCarList }) {
  const [formValues, setFormValues] = useState({
    id: "",
    brand: "",
    model: "",
    miles: "",
    year: "",
    price: "",
    sellerId: "0938773"
  });

  const [myCarList, setMyCarList] = useState([
    {
      model: "Accord",
      brand: "Honda",
      year: "2017",
      price: "23000",
      miles: "25654",
      id: "1",
      sellerId: "0938773"
    }
  ]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formValues.brand || !formValues.model || !formValues.miles || !formValues.year || !formValues.price) {
      alert("Please enter the car's information to continue.");
      return;
    }

    setMyCarList([...myCarList, formValues]);
    setFormValues({
      id: "",
      brand: "",
      model: "",
      miles: "",
      year: "",
      price: "",
      sellerId: ""
    });

    //console.log(myCarList);

    // API call can be added here if needed
    // fetch(API_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formValues),
    // });
  };

  return (
    <div className="App">
      <Container>
        <h1>Sell your car with us</h1>
        <p>Carshop will find a buyer for your car in less than 24 hours, guaranteed!</p>
        <span>Enter your car's information below and let our super smart engine find a buyer.</span>
        <div className='row'>
          <div className='col'>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="hidden"
                  id="id"
                  name="id"
                  value={myCarList.id++}
                />
                <input
                  type="hidden"
                  id="sellerId"
                  name="sellerId"
                  value={"0938773"}
                />
                <label htmlFor="brand"></label>
                <input
                  placeholder='Enter the brand'
                  type="text"
                  id="brand"
                  name="brand"
                  value={formValues.brand}
                  onChange={handleInputChange}
                />
                <label htmlFor="model"></label>
                <input
                  placeholder='Enter the model'
                  type="text"
                  id="model"
                  name="model"
                  value={formValues.model}
                  onChange={handleInputChange}
                />
                <input
                  placeholder='How many miles'
                  type="text"
                  id="miles"
                  name="miles"
                  value={formValues.miles}
                  onChange={handleInputChange}
                />
                <input
                  placeholder='Enter the Year'
                  type="text"
                  id="year"
                  name="year"
                  value={formValues.year}
                  onChange={handleInputChange}
                />
                <input
                  placeholder='Enter a price'
                  type="text"
                  id="price"
                  name="price"
                  value={formValues.price}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Add a Car</button>
            </form>
          </div>
        </div>
      </Container>
      <br /><br />
      <MyCarsForSale myCarList={myCarList} />
    </div>
  );
}

export default SellACar;