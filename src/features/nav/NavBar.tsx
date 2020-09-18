import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

export function NavBar() {
  return (
    <div>
      <Navbar expand="md" variant="dark" className="navbar__container">
        <Container>
          <Navbar.Brand className="pointer">
            <img
              src="/assets/logo.png"
              alt="logo"
              style={{ marginRight: '10px', height: 20 }}
            />
            Reminders App
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}
