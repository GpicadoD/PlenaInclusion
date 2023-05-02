import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

const AddNewUser = () => {
    const [userNIF, setUserNif] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [msg, setMsg] = useState('');
    const history = useNavigate();

    const Add = async (e) => {
        e.preventDefault();
        try {
            var newPassword = await axios.post('/registernewuser', {
                userNIF: userNIF,
                name: name,
                lastname: lastname,
                email: email,
                birthdate: birthdate,
                phoneNumber: phoneNumber,
                gender: gender,
            });
            console.log({newPassword});
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
                                        <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>NIF del Usuario</Form.Label>
                                        <Form.Control type="username" placeholder="12345678A" value={userNIF} onChange={(e) => setUserNif(e.target.value)} />
                                        <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>Nombre del Usuario</Form.Label>
                                        <Form.Control type="username" placeholder="Juan" value={name} onChange={(e) => setName(e.target.value)} />
                                        <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>Apellido del Usuario</Form.Label>
                                        <Form.Control type="username" placeholder="Rodriguez" value={lastname} onChange={(e) => setLastName(e.target.value)} />
                                        <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>Email del Usuario</Form.Label>
                                        <Form.Control type="username" placeholder="Juan_Rodriguez@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </Col>
                                    <Col>
                                        <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>Fecha de nacimiento</Form.Label>
                                        <Form.Control type="username" placeholder="1990-12-12" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                                        <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>Número de teléfono</Form.Label>
                                        <Form.Control type="text" placeholder="999 99 99 99" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                        <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>Género</Form.Label>
                                        <Form.Control type="username" placeholder="Hombre" value={gender} onChange={(e) => setGender(e.target.value)} />
                                    </Col>
                                </Row>
                                    <div className= "d-flex justify-content-center align-items-center mt-3">
                                <Button variant="success" type="submit" className= "border-dark w-100">
                                    Añadir usuario
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

export default AddNewUser;