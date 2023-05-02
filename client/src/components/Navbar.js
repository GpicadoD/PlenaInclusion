import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Image from 'react-bootstrap/Image';

const Barra = () => {
    return (
        <Navbar className='Barra' sticky="top" bg="success" expand="lg">
        <Container className='Barra_menu'>
            <Navbar.Brand href='/'>
                <Image src="./logo_plena_inclusion.png" alt="" height={30}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-75">
                <Nav.Link href="/dashboard">DASHBOARD</Nav.Link>
                <Nav.Link href="/addnewuser">ADD USER</Nav.Link>
                <Nav.Link href="/addactivity">ADD ACTIVITY</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        <Container>
            <Navbar.Brand href='/'>
                <img src="../img/logo_plena-inclusion.png" alt=""/>
            </Navbar.Brand>
            <Nav className="me-25">
                <Nav.Link href="/activityprofile">PROFILE</Nav.Link>
            </Nav>
        </Container>
        </Navbar>
    )
}

export default Barra;