import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { DarkModeToggle } from './DarkModeToggle';

export function NavBar() {
  return (
    <div>
      <Navbar expand="md" className="navbar__container">
        <Container className="justify-content-between">
          <Navbar.Brand className="pointer">
            <img
              src="/assets/logo.png"
              alt="logo"
              style={{ marginRight: '10px', height: 20 }}
            />
            Reminders App
          </Navbar.Brand>
          <DarkModeToggle />
        </Container>
      </Navbar>
    </div>
  );
}
