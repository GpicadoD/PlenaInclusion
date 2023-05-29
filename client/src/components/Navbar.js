import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Image from 'react-bootstrap/Image';

// The function Barra with the elements that make it works, with an exported CSS to have style
const Barra = () => {
    const navigation = useNavigate();
    const LogOut = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('/logout')
            console.log("log 1");
            console.log(response.data);
            navigation("/login");
        }
        catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
            }      
        } 
    };
    return (
        <Navbar className='Barra' sticky="top" expand="lg">
        <Container className='Barra_menu w-75 ms-5'>
            <Navbar.Brand href='/'>
                <Image className='me-4' src="./logo_plena_inclusion.png" alt="" height={30}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="">
                <Nav.Link className='me-4' href="/dashboard">DASHBOARD</Nav.Link>
                <Nav.Link className='me-4' href="/addnewuser">ADD USER</Nav.Link>
                <Nav.Link href="/addnewactivity">ADD ACTIVITY</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        <Container className='profile w-25 me-5 flex-row-reverse'>
            <Nav className="align-items-center">
            <Nav.Link onClick={LogOut}>LOGOUT</Nav.Link>
            <Navbar.Brand href='/' className='me-1'>
                <img className='imagen_profile' src="./avatar_default.png" alt=""/>
            </Navbar.Brand>
                <Nav.Link href="/activityprofile">PROFILE</Nav.Link>
            </Nav>
        </Container>
        </Navbar>
    )
}

// With this, the component can be exported to the App.js
export default Barra;