import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


// The function Barra with the elements that make it works, with an exported CSS to have style
const Barra = () => {
    const navigation = useNavigate();

    const LogOut = async (e) => {
        e.preventDefault();
        console.log('hola');
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

    const options = {
        title: 'Confirmacion',
        message: '¿Estas seguro de cerrar sesión?',
        buttons: [
            {
            label: 'Si',
            onClick: () => LogOut
            },
            {
            label: 'No',
            onClick: () => alert('Click No')
            }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        keyCodeForClose: [8, 32],
        willUnmount: () => {},
        afterClose: () => {},
        onClickOutside: () => {},
        onKeypress: () => {},
        onKeypressEscape: () => {},
        overlayClassName: "overlay-custom-class-name"
    };
    return (
        <Navbar className='Barra' sticky="top" expand="lg">
        <Container className='Barra_menu w-100 ms-5'>
            <Navbar.Brand href='/'>
                <Image className='me-2' src="./logo_plena_inclusion.png" alt="" height={30}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="">
                <Nav.Link className='me-3 link_nav' href="/dashboard">DASHBOARD</Nav.Link>
                <Nav.Link className='me-3 link_nav' href="/addnewuser">ADD USER</Nav.Link>
                <Nav.Link className='me-3 link_nav' href="/addnewactivity">ADD ACTIVITY</Nav.Link>
            </Nav>
            <Nav className=''>
            <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                    <Navbar.Brand href='/' className='me-1'>
                        <img className='imagen_profile' src="./avatar_default.png" alt=""/>
                    </Navbar.Brand>
                    <Nav.Link className='white fs-5 me-3 link_nav' style={{fontWeight: 600}}>USER</Nav.Link>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="/activityprofile" style={{fontWeight: 600}}><Nav.Link className='submenu' href="/activityprofile">PROFILE</Nav.Link></Dropdown.Item>
                    <Dropdown.Item href="#/action-1" style={{fontWeight: 600}} type="submit" onClick={(e) => confirmAlert(options)}><Nav.Link className='submenu'>LOGOUT</Nav.Link></Dropdown.Item>
                     /*
                    <Dropdown.Item href="/userProfile" style={{fontWeight: 600}}><Nav.Link className='submenu' href="/activityprofile">PROFILE</Nav.Link></Dropdown.Item>
                    <Dropdown.Item href="#/action-1" style={{fontWeight: 600}}><Nav.Link className='submenu' onClick={LogOut}>LOGOUT</Nav.Link></Dropdown.Item>
                    */
                </Dropdown.Menu>
            </Dropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

// With this, the component can be exported to the App.js
export default Barra;