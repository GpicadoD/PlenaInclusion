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
        setComAct(response.data);
        console.log(comAct[0].activityId);
    }

    useEffect(() => {
        console.log("useEffects ok");
        defaultDate();
        getComActs(new Event('firstTime'));
        console.log(comAct);
    }, []);

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
                        {/* <Form.Control
                            type="search"
                            placeholder="Search by name"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Form.Control
                            type="search"
                            placeholder="Search by duration"
                            className="me-2"
                            aria-label="Search"
                        /> */}
                        <Button variant="outline-success" type="submit">Buscar</Button>
                    </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* <h1>Welcome Back: {user.name}</h1>
            <h1>Next activities:</h1>*/}
            {comAct.length == 0 &&
                <h2 className="noActivity">
                    No tienes ninguna actividad en las fechas seleccionadas.
                </h2>
            }
            
            {<Row xs={1} md={4} className="g-4 mt-1 mb-5">
                {comAct.map((activities) => (//Es un for each no se asusten
                    <Col key={activities.activityId}>
                        <Card className={`box-shadow`} key={activities.activityId}>
                            <Card.Body>
                                <Card.Title><span style={{ fontWeight: 'bold' }}>Nombre:</span> {activities.periodicActs[0].NifOrg}</Card.Title>
                                <Card.Text><span style={{ fontWeight: 'bold' }}>Hora de inicio:</span> {activities.ActDate}</Card.Text>
                                <div className='mt-4 text-center'>
                                    <Button className='succes'>
                                        ¡Apuntate!
                                    </Button>
                                    {/*<Button disabled={activitiesByUserDate.activity.countdown < 0} name="deleteButton" variant="danger" onClick={(e) => BeforeDeleteAlert(e, activitiesByUserDate.activity.id)}>
                                        Abandonar
                                    </Button>*/}
                                </div>
                            </Card.Body>
                            {/* Paint countdown timer to begin the activity
                            {(() => {
                                switch (true) {
                                    case (activitiesByUserDate.activity.countdown > 0):   return <Card.Footer className="text-muted">¡Quedan {activitiesByUserDate.activity.countdown} días!</Card.Footer>;
                                    case (activitiesByUserDate.activity.countdown == 0):  return <Card.Footer className="text-muted">¡Es hoy!</Card.Footer>;
                                    default:     return <Card.Footer className="text-muted">¡Fue hace {activitiesByUserDate.activity.countdown * -1} días!</Card.Footer>
                                }
                            })()*/}
                            
                        </Card>
                    </Col>
                ))}
                </Row>}
        </div>
    )

    
}
export default ProtoDash;