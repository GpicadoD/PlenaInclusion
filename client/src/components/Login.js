import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import PlenaInclusionLogo from '../../src/img/logo_plena-inclusion.png';

const Login = () => {
    const [newUserNif, setnewUserNif] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/loginNewUser', {
                newUserNif: newUserNif,
                password: password
            });
            history("/protodash", { state: { newUserNif } });
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        {/*<section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Auth} className="box">
                                <div className="field mt-5">
                                    <label className="label">UserNIF</label>
                                    <div className="controls">
                                        <input type="username" className="input" placeholder="Username" value={newUserNif} onChange={(e) => setnewUserNif(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </section>*/},
        <div style={{
            backgroundImage: `url("https://sirc.ca/wp-content/uploads/2020/03/AdobeStock_298604606-scaled.jpeg")`,
            backgroundSize: "cover",
        }}>
            <Row className='bg-success bg-opacity-25 justify-content-center'>
                <Col className="form-container vh-100 d-flex justify-content-center align-items-center"  xs="12" sm="12" md="5" lg="5" xl="5">
                    <Form onSubmit={Auth} className='bg-white text-white bg-opacity-75 p-3 mb-5 lg-10' style={{ borderRadius: '50px', padding: '50px' }}>
                        <Form.Group className="field mt-4 mb-4">
                            <Col className="container pl-2 col-12">
                                <Row>3
                                    <div className="d-flex justify-content-center mt-4 mb-4"> {/* Agregado: Centrar imagen */}
                                        <Image src={PlenaInclusionLogo} alt="" height={70} /> {/* Modificado: Ajustar altura de la imagen */}
                                    </div>
                                </Row>
                                <Row>
                                    <Form.Label className="d-flex justify-content-center" style={{ fontSize: 25, fontWeight: '600', color: '#3b6060' }}>NIF DEL USUARIO</Form.Label>
                                    <Form.Control className="mx-auto w-75" type="username" placeholder="12345678A" value={newUserNif} onChange={(e) => setnewUserNif(e.target.value)} style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', background: 'none' }} />
                                    <Form.Label className="d-flex justify-content-center mt-4" style={{ fontSize: 25, fontWeight: '600', color: '#3b6060' }}>CONTRASEÑA</Form.Label>
                                    <Form.Control className="mx-auto w-75" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', background: 'none', color: 'white' }} />
                                </Row>
                                <Row>
                                    <div className="d-flex justify-content-center align-items-center mt-4">
                                        <Button variant="success" type="submit" className="mx-auto w-75" style={{ borderColor: '#00820B', borderRadius: '10px', borderWidth: '2px', backgroundColor: '#00820B', fontSize: 15, fontStyle: 'italic', fontWeight: '600', color: 'white' }}>
                                            Entrar
                                        </Button>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="form-check-container d-flex flex-column align-items-center mt-3">
                                        <Form.Check className="custom-checkbox" label="Recordar usuario" style={{ fontSize: 10, fontStyle: 'italic', fontWeight: '600', color: '#3b6060' }} />
                                        <Form.Check className="custom-checkbox" label={<u>Has olvidado contraseña?</u>} style={{ fontSize: 10, fontStyle: 'italic', fontWeight: '600', color: '#3b6060', textDecoration: 'underline' }} />
                                    </div>
                                </Row>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Login;
