// These lines of code import necessary libraries and modules for the component to work.
// Specifically, it imports React, useState, and useEffect from the 'react' library,
// axios for making API requests, and several components from the 'react-bootstrap' library.
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from 'react'

// Define the AddNewUser component
const AddNewUser = () => {

    // Define state variables using the useState hook
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
    const [userNIF, setUserNif] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [msg, setMsg] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const history = useNavigate();


    // Function to add a new user
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
            console.log({ newPassword });
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    // Function to refresh the token
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
        } catch (error) {
            if (error.response) {
                history(-1);
            }
        }
    }

      // Create an instance of axios with interceptors for JWT authentication

    const axiosJWT = axios.create();
axiosJWT.interceptors.request.use(async (config) => {
  try {
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
  } catch (error) {
    return Promise.reject(error);
  }
});

    useEffect(() => {   
        console.log("useEffects ok");
        refreshToken();
    }, []);
  
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
                                    <p className="text-center" style={{ fontSize: 30, fontStyle: 'italic', fontWeight: '600', color: '#3b6060' }}>CREAR NUEVO USUARIO</p>
                                </div>
                                <Row>
                                    <Col md={3}>
                                        <div className="d-flex flex-column align-items-center">
                                            <Form.Label className="text-center" style={{ fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: '#3b6060' }}>NIF del Usuario</Form.Label>
                                            <Form.Control type="username" placeholder="12345678A" value={userNIF} onChange={(e) => setUserNif(e.target.value)} style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', background: 'none' }} />
                                        </div>
                                        <div className="d-flex flex-column align-items-center">
                                            <Form.Label className="text-center" style={{ fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: '#3b6060' }}>Fecha Nacimiento</Form.Label>
                                            <Form.Control type="username" placeholder="1999-10-5" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', background: 'none' }} />
                                        </div>
                                        <div className="d-flex flex-column align-items-center">
                                            <Form.Label className="text-center" style={{ fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: '#3b6060' }}>Numero telefono</Form.Label>
                                            <Form.Control type="text" placeholder="654372645" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', background: 'none' }} />
                                        </div>
                                        <div className="d-flex flex-column align-items-center">
                                            <Form.Label className="text-center" style={{ fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: '#3b6060' }}>Genero</Form.Label>
                                            <Form.Control type="username" placeholder="Hombre" value={gender} onChange={(e) => setGender(e.target.value)} style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', background: 'none' }} />
                                        </div>
                                    </Col>
                                    <Col md={9}>
                                        <Row className="justify-content-between">
                                            <Col>
                                                <div className="d-flex flex-column align-items-center">
                                                    <Form.Label className="text-center" style={{ fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: '#3b6060' }}>Nombre del Usuario</Form.Label>
                                                    <Form.Control type="username" placeholder="Alvaro" value={name} onChange={(e) => setName(e.target.value)} style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', background: 'none' }} />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-between">
                                            <Col>
                                                <div className="d-flex flex-column align-items-center">
                                                    <Form.Label className="text-center" style={{ fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: '#3b6060' }}>Apellido del Usuario</Form.Label>
                                                    <Form.Control type="text" placeholder="Rodriguez" value={lastname} onChange={(e) => setLastName(e.target.value)} style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', background: 'none' }} />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-between align-items-end">
                                            <Col>
                                                <div className="d-flex flex-column align-items-center">
                                                    <Form.Label className="text-center" style={{ fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: '#3b6060' }}>ID de la imagen</Form.Label>
                                                    <Form.Control type="username" placeholder="1" value={name} onChange={(e) => setName(e.target.value)} style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', background: 'none' }} />
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
                                                    <Form.Label className="text-center" style={{ fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: '#3b6060' }}>Email del Usuario</Form.Label>
                                                    <Form.Control type="username" placeholder="Juan_Rodriguez@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', background: 'none' }} />
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="d-flex flex-column align-items-end">
                                                    <Button variant="success" type="submit" className="border-dark w-100" style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', backgroundColor: '#00820B', fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: 'white' }}>
                                                        AÑADIR USUARIO
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

export default AddNewUser;