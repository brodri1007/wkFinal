
import React, { useState, useEffect } from 'react';
import NavigationBar from './components/NavigationBar';
import CarShopService from './services/CarShopService';
import Home from '../src/components/Home';
import BuyACar from '../src/components/BuyACar';
import SellACar from '../src/components/SellACar';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
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

    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />    
        <Route path="/buy">
          <Route index element={<BuyACar carList={carList} setCarList={setCarList} getCars={getCars} />} />
          {/* <Route path=":id" element={<ModalSchedule carList={carList} setCarList={setCarList}/>} /> muted */}
        </Route>
        <Route path="/sell" element={<SellACar carList={carList} setCarList={setCarList} getCars={getCars} />} />       
      </Routes>   
        <Footer />
    </>

  
  );
};

export default App;

