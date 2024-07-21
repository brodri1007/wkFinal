import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start mt-5">
      <Container className="p-3">
        <Row>
          <Col>
            © 2024 The CarShop: 
            <a className="text-dark" href="/"> thecarshop.com</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;