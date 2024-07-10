
import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import CarShopService from './services/CarShopService';
import Home from '../src/components/Home';
import About from '../src/components/About';
import Contact from '../src/components/Contact';
import BuyACar from '../src/components/BuyACar';
import SellACar from '../src/components/SellACar';
import DetailsPage from '../src/components/DetailsPage';
import { Routes, Route } from 'react-router-dom'
import './App.css';



const App = () => {

  const [carList, setCarList] = useState([]);
  let service = new CarShopService();

 // console.log(carList)
  //console.log("service: ", service)

  useEffect(() => {
    getCars();
  }, []);  // Empty dependency array means this runs only once

  function getCars() {
    service.allCars()
      .then(data => {
        setCarList(data);
        //console.log(data);
      })
  }

  //console.log("GetCars: " + getCars + " setCarList: " , setCarList, + "carLisr: " +  carList )

  return (

    <div>

      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/buy">
          <Route index element={<BuyACar carList={carList} setCarList={setCarList} getCars={getCars}/>} />
          {/* <Route path=":id" element={<ModalSchedule carList={carList} setCarList={setCarList}/>} /> muted */}
        </Route>
        <Route path="/sell" element={<SellACar carList={carList} setCarList={setCarList} />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;

