

import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CarCard from './CarCard';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


/**
 * This component displays a list of cars that are avaible for sale({carList}).
 * It uses the CarCard component to display each car with its scheduled appointments
 *   
 * @param {Function} getCars This function calls the allCars method of the CarShopService 
 * instance to fetch the list of all cars. It then updates the carList state with the fetched data.
 * @param {Function} setCarList Function to update local storage.
 * @param {Array} carList The current list of cars that are available.   
 * @returns Container with the list of existing cars for sale or none and a button to add cars.
 */

const BuyACar = ({ carList, setCarList, getCars }) => {

  return (
    <main className="p-5 text-center app-background">
      <h1>Find Your Perfect Car</h1>
      {/* Map over the carList array and if there are any cars, display the cars to the UI.*/}
       {/* If there are no cars, display a message and a button to add car for sale*/}
        {carList.length > 0 ? (
          <h3 className="lead text-primary">Browse through our extensive collection of new and used cars.</h3>
        ) : (
          
          <>
            <p>There are no cars for sale at this time. Please list some.</p>
            <div className="col-12 my-3">
              <Button variant="primary">
                <Link className="text-white" to="/sell">Sell a car</Link>
              </Button>
            </div>
          </>
        )}
      <div className="pb-6"></div>
      <Row className="d-flex justify-content-center">
        {carList?.map((car, i) => (
          <Col key={i}>
            <CarCard car={car} setCarList={setCarList} getCars={getCars} carList={carList} />
          </Col>
        ))}
      </Row>
    </main>
  );
};

export default BuyACar;
