import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Hero.css'; // Assuming you have a CSS file for custom styles

function Hero() {
  return (
    <Container fluid className="hero-section text-center p-5 app-background">
      <h1 className="hero-title">Welcome!</h1>
      <p className="hero-subtitle">Browse through our extensive collection of new and used cars.</p>
      <Row className="justify-content-center">
        <Col md={3} className="mx-2 my-2">
          <Card>
            <Card.Body>
              <Link className="nav-link" to="/buy">
                <Button variant="primary" className="mt-2">Buy a Car</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mx-2 my-2">
          <Card>
            <Card.Body>
              <Link className="nav-link" to="/sell">
                <Button variant="primary" className="mt-2">Sell a Car</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Hero;
