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
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import {useLocation} from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import jwt_decode from "jwt-decode";

// ProtoDash is a dashboard made from 0 to better understand its function, first it uses the ComAct and set it for later in the return
const ProtoDash = () => {
    const [user, setUser] = useState([]);
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const location = useLocation();
    const [comAct, setComAct] = useState([]);
    const [periodicAct, setperiodicAct] = useState([]);

    // This sets the current date of the activity and then it adds a week
    var curr = new Date();
    var date = curr.toISOString().substring(0,10);
    curr.setDate(curr.getDate() + 7);
    const [startDate, setStartDate] = useState(date);

    // This sets the end date
    date = curr.toISOString().substring(0,10);
    const [endDate, setEndDate] = useState(date);
    
    // This sets the NIF of the user and then finds it in the database
    const [NifCom, setNifCom] = useState(location.state.newUserNif);
    const [idAct, setidAct] = useState("");
    const [actDate, setactDate] = useState("");

    const navigation = useNavigate();

    const [join, setJoin] = useState(false);
    
    const defaultDate = async () => {
        var curr = new Date();
        var startDate = curr.toISOString().substring(0,10);
        curr.setDate(curr.getDate() + 7);
        var endDate = curr.toISOString().substring(0,10);
        setStartDate(startDate); setEndDate(endDate);
    }

    const getUser = async (e) => {
    e.preventDefault();
    const response = await axios.post('/getcompact', {
        userNIF: NifCom
    });
    setUser(response.data);
    }

    // This gets the ComActs from the database in the getcompact and then respond with a more specific information
    const getComActs = async (e) => {
        console.log("Comacts ok");
        e.preventDefault();
        const response = await axios.post('/getcompact', {
            startDate: startDate,
            endDate: endDate,
            NifCom: NifCom
        });
        console.log('GetComActs:');
        console.log(response.data);
        setComAct(response.data);
    }
    // This choose the period of dates for the user
    const getPeriodic = async (e) => {
        console.log("Periodic ok");
        e.preventDefault();
        const response = await axios.post('/getperiodicActsByUserDate', {
            startDate: startDate,
            endDate: endDate,
            NifCom: NifCom
        });
        console.log('GetPeriodic:');
        console.log(response.data);
        setperiodicAct(response.data);
    }
    // This adds the ComActs and the users
    const addComActs = async (e, activities) => {
        console.log("AddedComacts ok");
        e.preventDefault();
        console.log(activities.actDate);
        await axios.post('/insertCompact', {
            idAct: activities.activityId,
            idUser: NifCom,
            actDate: activities.actDate
        });
        setJoin(true);
    }
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:3030/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUser({
                ...user, // Copy other fields
                userId: decoded.userId,
                name: decoded.name
            });
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigation("/");
            }
        }
    }
    const axiosJWT = axios.create();

    // Siempre que se realice una peticion segura se ejcuta esta
    // funcion que actualiza el accessToken si es necesario
    // y en config añade los headers y los datos para las queries
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime() || expire == undefined) {
            const response = await axios.get('http://localhost:3030/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUser({
                ...user, // Copy other fields
                userId: decoded.userId,
                name: decoded.name
            });
            config.params = {
                userId: decoded.userId
            }
            setExpire(decoded.exp);
        } else {
            config.headers.Authorization = `Bearer ${token}`;
            config.params = {
                userId: user.userId
            }
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    
    const added = async (e) => {
        setJoin(false);
    }
    
    useEffect(() => {   
        console.log("useEffects ok");
        refreshToken();
        defaultDate();
        getComActs(new Event('firstTime'));
        getPeriodic(new Event('firstTime'));
        added();
    }, [join]);

    return (
        <div className="container mt-5 top">
            <div className='p-5 text-center'>
                <h1 className='mb-3' style={{ fontSize: 30, fontWeight: 'bold' }}>Mis actividades</h1>
            </div>
            <Navbar className="border-bottom border-gray pb-5">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                    </Nav>
                    <Form className="d-flex" onSubmit={getComActs}>
                        {/*Añadir ID de usuario temporal*/}
                        <Form.Control className="me-2" type="date" placeholder="Date" 
                            value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <Form.Control className="me-2" type="date" placeholder="Date" 
                            value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        <Form.Control
                            type="search"
                            placeholder="Search by NIF"
                            className="me-2"
                            aria-label="Search"
                            value={NifCom} onChange={(e) => setNifCom(e.target.value)}
                        />
                        <Button variant="outline-success" type="submit">Buscar</Button>
                    </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Tabs
                defaultActiveKey="signedAct"
                id="uncontrolled-tab-example"
                className="mb-3"
                >
                <Tab eventKey="signedAct" title="Apuntado">
                    {<Row xs={1} md={4} className="g-4 mt-1 mb-5">
                        {comAct.map((activities) => (//Es un for each no se asusten
                            <Col key={activities.activityId + activities.ActDate}>
                                <Card className={`box-shadow`} key={activities.activityId + activities.ActDate}>
                                    <Card.Body>
                                        <Card.Title><span style={{ fontWeight: 'bold' }}>Nombre:</span> {activities.periodicActs[0].newactivity.nameAct}</Card.Title>
                                        <Card.Text><span style={{ fontWeight: 'bold' }}>Fecha:</span> {activities.ActDate.substring(0,10)}</Card.Text>
                                        <Card.Text><span style={{ fontWeight: 'bold' }}>Hora de inicio:</span> {activities.ActDate.substring(11,16)}</Card.Text>
                                        <Card.Text><span style={{ fontWeight: 'bold' }}>Lugar:</span> {activities.periodicActs[0].actPlace}</Card.Text>
                                        <Card.Text><span style={{ fontWeight: 'bold' }}>Duración:</span> {activities.periodicActs[0].Duration}</Card.Text>
                                        <div className='mt-4 text-center'>
                                            <Button className='succes'>
                                                Ver Más
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                    ))}
                    </Row>}
                </Tab>
                <Tab eventKey="nearAct" title="Próximas actividades">
                    {<Row xs={1} md={4} className="g-4 mt-1 mb-5">
                        {periodicAct.map((activities) => (//Es un for each no se asusten
                            <Col key={activities.activityId + activities.actDate +  activities.NifOrg}>
                                <Card className={`box-shadow`} key={activities.activityId + activities.actDate +  activities.NifOrg + activities.CompAct}>
                                    <Card.Body>
                                        <Card.Title><span style={{ fontWeight: 'bold' }}>Nombre:</span> {activities.newactivity.nameAct}</Card.Title>
                                        <Card.Text><span style={{ fontWeight: 'bold' }}>Fecha:</span> {activities.actDate.substring(0,10)}</Card.Text>
                                        <Card.Text><span style={{ fontWeight: 'bold' }}>Hora de inicio:</span> {activities.actDate.substring(11,16)}</Card.Text>
                                        <Card.Text><span style={{ fontWeight: 'bold' }}>Lugar:</span> {activities.actPlace}</Card.Text>
                                        <Card.Text><span style={{ fontWeight: 'bold' }}>Duración:</span> {activities.Duration}</Card.Text>
                                        <div className='mt-4 text-center'>
                                            <button className='Espero acordarme de cambiar esto' onClick={e=>addComActs(e, activities) }>¡Apuntate!</button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>}
                </Tab>
            </Tabs>
            {comAct.length == 0 && 
                <h2 className="noActivity">
                    No tienes ninguna actividad en las fechas seleccionadas.
                </h2>
            }
        </div>
    )    
}
export default ProtoDash;