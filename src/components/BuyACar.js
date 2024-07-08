import { React, useEffect } from 'react'
//import CarShopService from '../services/CarShopService';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';
import ModalSchedule from './ModalSchedule';



const BuyACar = ({ carList, setCarList }) => {
  
  const handleDelete = (id) => {
    const updatedCarList = carList.filter(car => car.id !== id);
    setCarList(updatedCarList);   
  };

 
  return (
    <div className="App">
      <Container>
        <div><h1 className="header">The Car Shop</h1></div>
        <p>Select from our inventory below:</p>
        <Row>
          {carList?.map((car,i) => (
            <div key={i} className="col p-3 border bg-light">
              {car.model}       
           <Col className='d-md-flex' > </Col>
        <ModalSchedule carlist={carList} id={car.id} setCarlist={setCarList}/>
           <button onClick={(e) => handleDelete(car.id)} className="btn">🗑</button>
        </div>  
          ))}
        </Row>   
      </Container>
    </div>
  );
};

export default BuyACar;


