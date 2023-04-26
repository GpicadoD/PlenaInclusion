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

    const defaultDate = async () => {
        var curr = new Date();
        var startDate = curr.toISOString().substring(0,10);
        curr.setDate(curr.getDate() + 7);
        var endDate = curr.toISOString().substring(0,10);
        setStartDate(startDate); setEndDate(endDate);
    }

    const getComActs = async (e) => {
        console.log("Comacts ok");
        e.preventDefault();
        const response = await axios.post('/getcompact', {
                startDate: startDate,
                endDate: endDate 
            
        });
        console.log(response.data);
    }

    const ParseActivities = async (compActList) => {
        var currDate = new Date();
        compActList.forEach(compact => {
            participant.activity.countdown = days(new Date(participant.activity.date), currDate);
            participant.activity.date = participant.activity.date.substring(0,10);
        });
        return participants;
    }
    
    useEffect(() => {
        console.log("useEffects ok");
        defaultDate();
        getComActs(new Event('firstTime'));
    }, []);


    
}
export default ProtoDash;