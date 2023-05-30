import React, { useState, useEffect } from 'react';
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
import futbol from '../../src/img/futbol.jpeg'
import '../App.css';
import {useLocation} from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import jwt_decode from "jwt-decode";

// ProtoDash is a dashboard made from 0 to better understand its function, first it uses the ComAct and set it for later in the return
const ProtoDash = () => {
    const [user, setUser] = useState({
        userNIF: '1',
        name: '',
        lastname:'',
        email:'',
        birthdate:'',
        phoneNumber:'',
        gender:'',
        accessToken:''
    });
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
    const [NifCom, setNifCom] = useState( 1/*location.state.newUserNif*/);
    const [idAct, setidAct] = useState("");
    const [actDate, setactDate] = useState("");

    const navigation = useNavigate();

    const [join, setJoin] = useState(false);
    
    const axiosJWT = axios.create();
    const defaultDate = async () => {
    try {
        var curr = new Date();
        var startDate = curr.toISOString().substring(0,10);
        curr.setDate(curr.getDate() + 7);
        var endDate = curr.toISOString().substring(0,10);
        setStartDate(startDate); setEndDate(endDate);
    } catch (error) {
        console.log(error);
    }};

    const getUser = async (e) => {
    e.preventDefault();
    const response = await axios.post('/getcompact', {
        userNIF: NifCom
    });
    setUser(response.data);
    }

    // This gets the ComActs from the database in the getcompact and then respond with a more specific information
    const getComActs = async (e) => {
    try {
        console.log("Comacts ok");
        e.preventDefault();
        const response = await axiosJWT.post('/getcompact', {
            startDate: startDate,
            endDate: endDate,
            NifCom: NifCom
        });
        console.log('GetComActs:');
        console.log(response.data);
        setComAct(response.data);
    } catch (error) {
        //console.log(error);
    }};
    // This choose the period of dates for the user
    const getPeriodic = async (e) => {
    try {
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
    } catch (error) {
        setNifCom("ErrorPeriodict:");
        console.log(error);
    }};
    const getAct = async (e) => {
        e.preventDefault();
        getPeriodic(e);
        getComActs(e);
    };
    // This adds the ComActs and the users
    const addComActs = async (e, activities) => {
        try {
            console.log("AddedComacts ok");
            e.preventDefault();
            console.log(activities);
            await axios.post('/insertCompact', {
                idAct: activities.activityId,
                idUser: NifCom,
                actDate: activities.actDate
            });
            setJoin(true);
        } catch (error) {
        console.log(error);
    }};
    const refreshToken = async () => {
        try {
            const response = await axios.get('/token');
            setToken(response.data.accessToken);
            //console.log(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUser({
                ...user, // Copy other fields
                userNIF: decoded.userNIF,
                name: decoded.name
            });
            setExpire(decoded.exp);
            console.log(decoded.userNIF);
            setNifCom("NifCom:");
            setNifCom(decoded.userNIF);
        } catch (error) {
            console.log(error);
        }
    };
    const toActivityInfo = async (e) => {
        console.log(e);
        navigation("/ActivityInfo", {state:{e}});
    }
    

    // Siempre que se realice una peticion segura se ejcuta esta
    // funcion que actualiza el accessToken si es necesario
    // y en config añade los headers y los datos para las queries
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime() || expire == undefined) {
            const response = await axios.get('/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUser({
                ...user, // Copy other fields
                userNIF: decoded.userNIF,
            });
            config.params = {
                userNIF: decoded.userNIF
            }
            setExpire(decoded.exp);
        } else {
            config.headers.Authorization = `Bearer ${token}`;
            config.params = {
                userNIF: user.userNIF
            }
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    
    const added = async (e) => {
        setJoin(false);
    }

    const test = async (e) => {
        setJoin(true);
    }

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
    useEffect(() => {   
        console.log("useEffects ok");
        refreshToken();
        defaultDate();
    }, []);
    useEffect(() => {   
        console.log("Join ok");
        defaultDate();
        getAct(new Event('firstTime'));
        added();
    }, [join]);
    useEffect(() => {   
        getAct(new Event('firstTime'));
    }, [startDate, endDate]);

return (
    <div className="container p-5 mw-100" style={{ backgroundColor: '#dde8e8', color: '#3b6060' }}>
        <div className='p-5 text-center'>
            <h1 className='mb-3' style={{ fontSize: 30, fontWeight: 'bold' }}>Mis actividades</h1>
        </div>
        <Navbar className="border-bottom border-gray px-5 pb-5">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                </Nav>
                <Form className="d-flex flex-column flex-md-row">
                    {/* Añadir ID de usuario temporal */}
                    <Form.Control className="me-md-2 mb-2 mb-md-0" type="date" placeholder="Fecha de inicio" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <Form.Control className="me-md-2" type="date" placeholder="Fecha de fin" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Tabs
            defaultActiveKey="nearAct"
            id="uncontrolled-tab-example"
            className="mb-3 px-5"
            >
            
            <Tab eventKey="nearAct" title="Próximas actividades">
            <Col xs="12" sm="12" md="12" lg="12" xl="12" className='px-5'>   
                {<Row xs={1} md={2} className="g-4 mt-1 mb-5">
                    {periodicAct.map((activities) => (//Es un for each no se asusten
                        <Col key={activities.activityId + activities.actDate +  activities.NifOrg}>
                            <Card className={`box-shadow`} key={activities.activityId + activities.actDate +  activities.NifOrg + activities.CompAct} style={{boxShadow: '13px 18px 8px 1px rgb(104 104 104 / 40%)' }}>
                            <Card.Img  className='card-img-top rounded-bottom p-0'
                                    style={{ borderRadius: '50px',
                                    objectFit: 'cover',
                                    height: '180px',
                                    zIndex: 1 }}
                                    src={futbol}
                                    alt="Activity image"
                                    fluid
                                    />
                                <Card.Body className='pt-4 pb-4 px-5'>
                                    <Card.Title><span style={{ fontWeight: 'bold' }}>Nombre:</span> {activities.newactivity.nameAct}</Card.Title>
                                    <Card.Text><span style={{ fontWeight: 'bold' }}>Fecha:</span> {activities.actDate.substring(0,10)}</Card.Text>
                                    <Card.Text><span style={{ fontWeight: 'bold' }}>Hora de inicio:</span> {activities.actDate.substring(11,16)}</Card.Text>
                                    <Card.Text><span style={{ fontWeight: 'bold' }}>Lugar:</span> {activities.actPlace}</Card.Text>
                                    <Card.Text><span style={{ fontWeight: 'bold' }}>Duración:</span> {activities.Duration}</Card.Text>
                                    {NifCom != 1 &&
                                        <Button onClick={e=>addComActs(e, activities)} className='w-100 border-3' variant="success mt-3" style={{ fontWeight: '600', fontStyle: 'italic', borderRadius: '15px' }}>APUNTARSE</Button>
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>}
                </Col>
                    {periodicAct.length == 0 && 
                        <h2 className="noActivity">
                            No tienes ninguna actividad en las fechas seleccionadas.
                        </h2>
                    }
            </Tab>
            {NifCom != 1 &&
                <Tab eventKey="signedAct" title="Apuntado">
                        <Col xs="12" sm="12" md="12" lg="12" xl="12" className='px-5'>
                            {<Row xs={1} md={2} className="g-4 mt-1 mb-5">
                                {comAct.map((activities) => (//Es un for each no se asusten
                                    <Col key={activities.activityId + activities.ActDate}>
                                        <Card className={`box-shadow`} key={activities.activityId + activities.ActDate} style={{ boxShadow: '13px 18px 8px 1px rgb(104 104 104 / 40%)' }}>
                                        <Card.Img  className='card-img-top rounded-bottom p-0'
                                            style={{ borderRadius: '50px',
                                            objectFit: 'cover',
                                            height: '180px',
                                            zIndex: 1 }}
                                            src={futbol}
                                            alt="Activity image"
                                            fluid
                                            />
                                            <Card.Body>
                                                <Card.Title><span style={{ fontWeight: 'bold' }}>Nombre:</span> {activities.periodicActs[0].newactivity.nameAct}</Card.Title>
                                                <Card.Text><span style={{ fontWeight: 'bold' }}>Fecha:</span> {activities.ActDate.substring(0,10)}</Card.Text>
                                                <Card.Text><span style={{ fontWeight: 'bold' }}>Hora de inicio:</span> {activities.ActDate.substring(11,16)}</Card.Text>
                                                <Card.Text><span style={{ fontWeight: 'bold' }}>Lugar:</span> {activities.periodicActs[0].actPlace}</Card.Text>
                                                <Card.Text><span style={{ fontWeight: 'bold' }}>Duración:</span> {activities.periodicActs[0].Duration}</Card.Text>
                                                <Button value={activities.activityId} onClick={(e) => toActivityInfo(e.target.value)} className='w-100 border-3' variant="success mt-3" style={{ fontWeight: '600', fontStyle: 'italic', borderRadius: '15px' }}>VER MÁS</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                            ))}
                            </Row>}
                        </Col>
                    {comAct.length == 0 && 
                        <h2 className="noActivity">
                            No tienes ninguna actividad en las fechas seleccionadas.
                        </h2>
                    }
                </Tab>
            }
        </Tabs>
        
    </div>
    /*
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
                    <div className='mt-4 text-center'>
                        <button className='Espero acordarme de cambiar esto' onClick={e=>LogOut(e) }>Reset</button>
                    </div>
                    <Form className="d-flex" onSubmit={getAct}>
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
                    {comAct.length == 0 && 
                        <h2 className="noActivity">
                            No tienes ninguna actividad en las fechas seleccionadas.
                        </h2>
                    }
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
                    {periodicAct.length == 0 && 
                        <h2 className="noActivity">
                            No tienes ninguna actividad en las fechas seleccionadas.
                        </h2>
                    }
                </Tab>
                
            </Tabs>
            
        </div>*/
    )    
}
export default ProtoDash;