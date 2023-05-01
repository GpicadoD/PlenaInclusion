import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Barra = () => {
    return (
        <Navbar sticky="top" bg="success" expand="lg">
        <Container>
            <Navbar.Brand href='/'>
                <img src="/img/logo_plena-inclusion.png" alt=""/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/dashboard">Actividades</Nav.Link>
                <Nav.Link href="/addnewuser">Añadir Usuario</Nav.Link>
                <Nav.Link href="/addactivity">Añadir Actividad</Nav.Link>
                <NavDropdown title="Login" id="basic-nav-dropdown">
                <NavDropdown.Item href="/activityprofile">
                    Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                    Separated link
                </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default Barra;