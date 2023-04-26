import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

const ProtoDash = () => {
    const [comAct, setComAct] = useState([]);

    var curr = new Date();
    var date = curr.toISOString().substring(0,10);
    curr.setDate(curr.getDate() + 7);
    const [startDate, setStartDate] = useState(date);
    date = curr.toISOString().substring(0,10);
    const [endDate, setEndDate] = useState(date);

    const navigation = useNavigate();

    
}
export default ProtoDash;