import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Button } from 'react-bootstrap';

export function HomePage() {
  return (
    <div className="masthead">
      <Container>
        <Row className="text-center">
          <Col as="h1" md="12">
            <img
              src="/assets/logo.png"
              alt="logo"
              style={{ marginBottom: 12, height: 100 }}
            />
            Reminders App
          </Col>
          <Col as="h2" md="12">
            Welcome to Reminders App
          </Col>
          <Col md="12">
            <Button as={Link} to="/reminders" variant="info">
              Take me to reminders
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
