import React, { useState } from 'react';
import { Col, Row, Button, ButtonGroup, Container } from 'react-bootstrap';
import CarShopService from '../services/CarShopService';
import CarImg from '../assets/car.png';
import CarUpdate from './CarUpdate';
import CarDetailsModal from './CarDetailsModal';


/**
 * MyCarsForSale. This component lists cars, allows editing, viewing and deletion. * 
 * first and then make a call to the API to update the backend.
 * 
 
 * @param {Function} getCars This function calls the allCars method of the CarShopService 
 * instance to fetch the list of all cars. It then updates the carList state with the fetched data.
 * @param {Function} setCarList Function to update local storage.
 * @param {Array} carList The current list of cars that are available.   
 * @returns Container with car card for a single car.
 * 
 */

export default function MyCarsForSale({ carList, setCarList, getCars }) {

 //Instantiate Car service to manipulate API
  const service = new CarShopService();

   //useState for managing the editing state (editingCarId).
  const [editingCarId, setEditingCarId] = useState(null);

  //handleDelete async function attempts to delete a car and refreshes the car list.
  const handleDelete = async (id) => {
    try {
      await service.deleteCar(id);
      getCars();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  //toggleView function toggles the edit view for a specific car.
  const toggleView = (id) => {
    setEditingCarId(editingCarId === id ? null : id);
  };

  return (
    <Container>
      <h1>Your Cars</h1>

      {/* Checks if the carList has any cars. If not, displays a message. If there are cars, it maps over them and renders each car's details. */}
      {carList.length > 0 ? (
        <>
          <div className="d-flex justify-content-center">
            These are the cars you have listed for sale in the shop.
          </div>
          <br />
          <br />
        </>
      ) : (
        "There are no cars for sale at this time. Please list some."
      )}

      {/* Each car is rendered within a Row and Col layout. When in editing mode, it shows the CarUpdate component; otherwise, it displays the car details and actions. */}
      <Row className="d-flex justify-content-center">
        {carList.map((car) => (
          <Col sm="auto" key={car.id} className="d-sm-flex">
            <div className="car-card shadow-sm p-2 mb-4 bg-white rounded">
              <div className="col border bg-light rounded">                
                <img
                  alt={car.model}
                  src={CarImg}
                  className="img-fluid mb-3"
                  style={{ width: '200px' }}
                />
                <br />
                {editingCarId === car.id ? (
                  <CarUpdate car={car} toggleView={toggleView} getCars={getCars} />
                ) : (
                  <div className="text-center">
                    <strong>Brand:</strong> {car.brand || 'Brand not available'}
                    <br />
                    <strong>Model:</strong> {car.model || 'Model not available'}
                  
                    <br />
                    <br />
                    <div className="d-flex justify-content-center">
                      {/* Each car has buttons for "Delete", "Edit", and "View". The "View" button opens the CarDetailsModal component. */}
                      <ButtonGroup aria-label="car actions" size="sm" className="mb-2">
                        <Button variant="danger" onClick={() => handleDelete(car.id)}>Delete</Button>
                        <Button variant="secondary" onClick={() => toggleView(car.id)}>Edit</Button>
                        <CarDetailsModal car={car} setCarList={setCarList} getCars={getCars} />
                      </ButtonGroup>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
