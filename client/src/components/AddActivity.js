import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import jwt_decode from "jwt-decode";

const AddNewActivity = () => {
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
    const [activityId, setActivityId] = useState('');
    const [nameAct, setNameAct] = useState('');
    const [idPublicType, setIdPublicType] = useState('');
    const [idTheme, setIdTheme] = useState('');
    const [idImgAct, setIdImgAct] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [idPeriod, setIdPeriod] = useState('');
    const [idCreator, setIdCreator] = useState('');
    const [msg, setMsg] = useState('');
    const navigation = useNavigate();
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [NifCom, setNifCom] = useState( '1'/*location.state.newUserNif*/);

    const Add = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/AddnewActivities', {
                activityId: activityId,
                nameAct: nameAct,
                idPublicType: idPublicType,
                idTheme: idTheme,
                idImgAct: idImgAct,
                startDate: startDate,
                finishDate: finishDate,
                idPeriod: idPeriod,
                idCreator: idCreator
            });
            console.log("Activity added successfully!");
        } catch (error) {
            console.log(error);
        }
    };
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
            if (error.response) {
                navigation("/");
            }
        }
    }

    return (
        <div style={{
            backgroundImage: `url("https://sirc.ca/wp-content/uploads/2020/03/AdobeStock_298604606-scaled.jpeg")`,
            backgroundSize: "cover"
        }}>
            <div className='bg-success bg-opacity-25'>
                <div className="form-container vh-100 d-flex justify-content-center align-items-center">
                    <Form onSubmit={Add} className='bg-white text-grey bg-opacity-75 p-3 mb-5' style={{ borderRadius: '50px', padding: '50px' }}>
                        <Form.Group className="field mt-4 mb-4">
                            <div className="Formulario_usuario container pl-2 ">
                                <div className="d-flex justify-content-center">
                                    <p className="text-center" style={{ fontSize: 30, fontStyle: 'italic', fontWeight: '600', color: '#3b6060' }}>CREAR NUEVA ACTIVIDAD</p>
                                </div>
                                <Row>
                                    <Col md={3}>
                                        <div className="d-flex flex-column align-items-center">
                                            <Form.Label className="text-center" style={{ fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: '#3b6060' }}>Fecha Inicio</Form.Label>
                                            <Form.Control type="username" placeholder="1999-10-5" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', background: 'none' }} />
                                        </div>
                                        <div className="d-flex flex-column align-items-center">
                                            <Form.Label className="text-center" style={{ fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: '#3b6060' }}>Fecha Final</Form.Label>
                                            <Form.Control type="username" placeholder="1999-10-9" value={finishDate} onChange={(e) => setFinishDate(e.target.value)} style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', background: 'none' }} />
                                        </div>
                                        <div className="d-flex flex-column align-items-center">
                                            <Form.Label className="text-center" style={{ fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: '#3b6060' }}>ID del periodo</Form.Label>
                                            <Form.Control type="text" placeholder="1" value={idPeriod} onChange={(e) => setIdPeriod(e.target.value)} style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', background: 'none' }} />
                                        </div>
                                        <div className="d-flex flex-column align-items-center">
                                            <Form.Label className="text-center" style={{ fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: '#3b6060' }}>ID del creador</Form.Label>
                                            <Form.Control type="username" placeholder="1" value={idCreator} onChange={(e) => setIdCreator(e.target.value)} style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', background: 'none' }} />
                                        </div>
                                    </Col>
                                    <Col md={9}>
                                        <Row className="justify-content-between">
                                            <Col>
                                                <div className="d-flex flex-column align-items-center">
                                                    <Form.Label className="text-center" style={{ fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: '#3b6060' }}>ID de la Actividad</Form.Label>
                                                    <Form.Control type="username" placeholder="1" value={activityId} onChange={(e) => setActivityId(e.target.value)} style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', background: 'none' }} />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-between">
                                            <Col>
                                                <div className="d-flex flex-column align-items-center">
                                                    <Form.Label className="text-center" style={{ fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: '#3b6060' }}>Nombre de la actividad</Form.Label>
                                                    <Form.Control type="text" placeholder="Futbol" value={nameAct} onChange={(e) => setNameAct(e.target.value)} style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', background: 'none' }} />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-between align-items-end">
                                            <Col>
                                                <div className="d-flex flex-column align-items-center">
                                                    <Form.Label className="text-center" style={{ fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: '#3b6060' }}>ID tipo de la actividad</Form.Label>
                                                    <Form.Control type="username" placeholder="1" value={idPublicType} onChange={(e) => setIdPublicType(e.target.value)} style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', background: 'none' }} />
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="d-flex flex-column align-items-center">
                                                    <Button variant="success" type="submit" className="border-dark w-100" style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', backgroundColor: '#ff8b02', fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: 'white' }}>
                                                        AÑADIR IMAGEN
                                                    </Button>
                                                </div>
                                            </Col>

                                        </Row>
                                        <Row className="justify-content-between align-items-end">
                                            <Col>
                                                <div className="d-flex flex-column align-items-center">
                                                    <Form.Label className="text-center" style={{ fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: '#3b6060' }}>ID del tema</Form.Label>
                                                    <Form.Control type="username" placeholder="1" value={idTheme} onChange={(e) => setIdTheme(e.target.value)} style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', background: 'none' }} />
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="d-flex flex-column align-items-end">
                                                    <Button variant="success" type="submit" className="border-dark w-100" style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', backgroundColor: '#00820B', fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: 'white' }}>
                                                        AÑADIR AACTIVIDAD
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                            </div>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    )
}

/*
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

const AddNewActivity = () => {
    const [activityId, setActivityId] = useState('');
    const [nameAct, setNameAct] = useState('');
    const [idPublicType, setIdPublicType] = useState('');
    const [idTheme, setIdTheme] = useState('');
    const [idImgAct, setImgAct] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [idPeriod, setIdPeriod] = useState('');
    const [idCreator, setIdCreator] = useState('');
    const [msg, setMsg] = useState('');
    const history = useNavigate();

    const Add = async (e) => {
        e.preventDefault();
        try {
            var newActivity = await axios.post('/addnewactivities', {
                activityId: activityId,
                nameAct: nameAct,
                idPublicType: idPublicType,
                idTheme: idTheme,
                idImgAct: idImgAct,
                startDate: startDate,
                finishDate: finishDate,
                idPeriod: idPeriod,
                idCreator: idCreator,
            });
            console.log({newActivity});
            } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
        
    return (
        <div style={{ 
            backgroundImage: `url("https://sirc.ca/wp-content/uploads/2020/03/AdobeStock_298604606-scaled.jpeg")`,
            backgroundSize: "cover"
        }}>
            <div className='bg-success bg-opacity-25'>
                <div className= "form-container vh-100 d-flex justify-content-center align-items-center">
                    <Form onSubmit={Add} className='bg-success text-white bg-opacity-50 border border-dark rounded w-50 shadow-lg p-3 mb-5 rounded'>
                        <Form.Group className="field mt-4 mb-4">
                            <div className="Formulario_usuario container pl-2 ">
                                <Row>
                                    <Col>
                                        <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>ID de la actividad</Form.Label>
                                        <Form.Control type="username" placeholder="3214123" value={activityId} onChange={(e) => setActivityId(e.target.value)} />
                                        <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>Nombre de la actividad</Form.Label>
                                        <Form.Control type="username" placeholder="Fútbol 2" value={nameAct} onChange={(e) => setNameAct(e.target.value)} />
                                        <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>ID del tipo de Actividad</Form.Label>
                                        <Form.Control type="username" placeholder="1" value={idPublicType} onChange={(e) => setIdPublicType(e.target.value)} />
                                        <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>ID del tema</Form.Label>
                                        <Form.Control type="username" placeholder="1" value={idTheme} onChange={(e) => setIdTheme(e.target.value)} />
                                        <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>ID de la imagen</Form.Label>
                                        <Form.Control type="username" placeholder="1" value={idImgAct} onChange={(e) => setImgAct(e.target.value)} />
                                    </Col>
                                    <Col>
                                        <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>Inicio de fecha</Form.Label>
                                        <Form.Control type="username" placeholder="2023-12-12" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                        <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>Final de fecha</Form.Label>
                                        <Form.Control type="text" placeholder="2023-12-24" value={finishDate} onChange={(e) => setFinishDate(e.target.value)} />
                                        <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>ID del periodo</Form.Label>
                                        <Form.Control type="username" placeholder="1" value={idPeriod} onChange={(e) => setIdPeriod(e.target.value)} />
                                        <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>ID del creador</Form.Label>
                                        <Form.Control type="username" placeholder="1234" value={idCreator} onChange={(e) => setIdCreator(e.target.value)} />
                                    </Col>
                                </Row>
                                    <div className= "d-flex justify-content-center align-items-center mt-3">
                                <Button variant="success" type="submit" className= "border-dark w-100">
                                    Añadir actividad
                                </Button> 
                                </div> 
                            </div>
                        </Form.Group> 
                    </Form>
                </div>  
            </div>
        </div>
    )
}*/

export default AddNewActivity;