import { React } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CarCard from './CarCard';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const BuyACar = ({ carList, setCarList, getCars }) => {
  

  return (
    <>
      <div className="row p-5 text-center app-background">
        <h1>Find Your Perfect Car</h1>        
          {carList.length > 0 ? "Browse through our extensive collection of new and used cars."
            : <> {"There are no cars for sale at this time. Please list some."} 
                <div className="col-12">
                  <br></br>
                  <Button variant="primary" type="">
                      <Link className="btn btn-primary" to="/sell">Sell a car</Link>
                  </Button>
                </div>
              </>
           }
          <div className='pb-6'></div>
        
        <Row className="d-fluid justify-content-center">
          {carList?.map((car, i) => (
            <Col key={i} >
              <CarCard car={car} setCarList={setCarList} getCars={getCars} carList={carList} />
            </Col>
          ))}
        </Row>
      </div>
    </>

  );
};

export default BuyACar;


