import { React } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CarCard from './CarCard';


const BuyACar = ({ carList, setCarList, getCars }) => {
  

  return (
    <>
      <div className=" container-fluid row p-5 text-center  text-center Jumbotron app-background">
        <h1>Find Your Perfect Car</h1>
        <p>Browse through our extensive collection of new and used cars.</p>
      

        <Row className="d-flex justify-content-center">
          {carList?.map((car, i) => (
            <Col key={i} md={2}>
              <CarCard car={car} setCarList={setCarList} getCars={getCars} carList={carList} />
            </Col>
          ))}
        </Row>
     </div>
    </>

  );
};

export default BuyACar;


