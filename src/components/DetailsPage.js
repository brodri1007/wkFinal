import React from "react";
import { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';


export default function DetailsPage([{data}]) {
   
    // const id = data?.id;
    // alert(id)

    // const baseUrl = "https://6659cc10de346625136df8bb.mockapi.io/car/:" + {id};
   

    const [carDetails, setCarDetails] = useState([{"model":"dfgdfg","brand":"hgdfg","year":"gdsfgsdfgdf",
                                                   "price":"dsfgdfsg","miles":"gsfdgsd","id":"1"}]);

 

    // useEffect(() => {
    //     const getCars = async () => {
    //         try {
    //             const response = await fetch(baseUrl);
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok ' + response.statusText);
    //             }
    //             const data = await response.json();            
    //             setCarDetails(data);                
    
    //         } catch (error) {
    //             console.error('There has been a problem with your fetch operation:', error);
    //         }
    //     };    
    
    //     getCars();
    // })

    return (
        <Container>
        <div><h1 className="header">The Car Shop</h1></div>
        <p>Car details:</p>
          <Row>
                  
                      <Col md="auto" key={carDetails[0].id} className='d-md-flex'>
                          <div className="car-card">
                              <div className="col p-3 border bg-light">
                                  <div>
                                      <span>{carDetails[0].id}</span>
                                      <img alt={carDetails[0].model} src={require("./car.png")} width="150px" />
                                  </div>
                                  <span>Brand-Model: {carDetails[0].brand} {carDetails[0].model}</span>
                                  <br />
                                  <span>Miles: {carDetails[0].miles}</span><br />
                                  <span>Year: {carDetails[0].year.substring(0, 4)}</span><br />
                                  <span>Price: {carDetails[0].price}</span><br /><br />                                            

                              </div>
                              <br></br>
                          </div>
                      </Col>

          </Row>
        </Container>

    )
}