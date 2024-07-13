import { React, useEffect } from 'react'
import CarShopService from '../services/CarShopService';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';
import ModalSchedule from './ModalSchedule';



const BuyACar = ({ carList, setCarList, getCars }) => {
  


  const service = new CarShopService();



  const handleDelete = (id) => {
    const updatedCarList = carList.filter(car => car.id !== id);
    setCarList(updatedCarList);   
    service.deleteCar(id);
  };


 
 //console.log(JSON.stringify(carList))

  return (
    <div className="App">     
        <div className='header'><h1>The Car Shop</h1>
        <p>Select from our inventory below:</p></div>
        <div class="row row-cols-1 row-cols-md-2 g-4">
 
        {carList?.map((car,i) => (
            
            <div class="card-group">
               <div class="card">
                <div class="card-body">
                        <div key={i}><br></br>
                            <span>{car.id}</span><br></br>
                            <img alt={car.model} src={require("./car.png")} width="150px" /><br></br><br></br>
                            Brand: {car.brand}  <br></br>
                            Model: {car.model}  <br></br>
                            Yaar: {car.year}  <br></br>
                            Miles:  {car.miles}  <br></br>
                            Price:  ${car.price}      <br></br><br></br>
                        </div>
            </div>
           <div className='card p-3 border'> 
           <div class="card-footer"></div>
          <div className='appointments'><p className='fw-normal fs-4 text'> Appointments</p> 
          <ul>
           {car.appointment?.map((appt, i) => (
             <li key={i}> {appt.date.substring(5, 7) + "/" + appt.date.substring(8, 10) + " @ " + appt.date.substring(16, 11) + " PM"}  </li>
           ))}
           </ul>
           </div>
           
           
           </div>
           <br></br> 
           <ModalSchedule car={car} setCarList={setCarList} getCars={getCars}/>    
            <spam>  </spam> <Button variant="primary" onClick={(e) => handleDelete(car.id)}>🗑 Car </Button>
            </div>
        </div>  
      </div>
      
    </div>
  );
};

export default BuyACar;


 {/* {/* // <div className="App">
     
    //     <div className='header'><h1>The Car Shop</h1>
    //     <p>Select from our inventory below:</p></div>
    //     <Container>
    //     <Row > */}
    {/* //       {carList?.map((car,i) => ( */}
    //         <div key={i} className="col p-3 border bg-light"><br></br>
    //         <span>{car.id}</span><br></br>
    //           <img alt={car.model} src={require("./car.png")} width="150px" /><br></br><br></br>
    //           Brand: {car.brand}  <br></br>
    //           Model: {car.model}  <br></br>
    //           Yaar: {car.year}  <br></br>
    //           Miles:  {car.miles}  <br></br>
    //           Price:  ${car.price}      <br></br><br></br>               
    //        <Col> 
    */}
    //       <div className='appointments'><p className='fw-normal fs-4 text'> Appointments</p> 
    //       <ul>
    //        {car.appointment?.map((appt, i) => (
    //          <li key={i}> {appt.date.substring(5, 7) + "/" + appt.date.substring(8, 10) + " @ " + appt.date.substring(16, 11) + " PM"}  </li>
    //        ))}
    //        </ul>
    //        </div>
           
    //        </Col>
    //        <br></br> 
    //        <ModalSchedule car={car} setCarList={setCarList} getCars={getCars}/>
    
    //        <Button variant="primary" onClick={(e) => handleDelete(car.id)}>🗑 Car </Button>
    //     </div>  
    //       ))}
          
    //     </Row>   
    //     </Container>
    // </div>