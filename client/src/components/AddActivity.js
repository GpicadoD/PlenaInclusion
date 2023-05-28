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
}

export default AddNewActivity;