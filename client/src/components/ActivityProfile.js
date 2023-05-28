import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import CardImg from 'react-bootstrap/esm/CardImg';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ActivityProfile = () => {
  const[userNIF,setUserNif] = useState('');
  const[userName,setUserName] = useState('');
  const[userLastName, setUserLastName] = useState ('');
  const[email,setUserEmail] = useState('');
  const[userBirthDate,setuserBirthDate] = useState('');
  const[phoneNumber,setphoneNumber] = useState('');
  const[password,setuserPassword] = useState('');
  const[userGender,setUserGender] = useState('');
  const[msg, setMsg] = useState('');
  
  const Show = async (e) => {
      e.preventDefault();
      try{
        const response = await axios.post('/newUser',{
              userNIF: userNIF
          }
        )
        console.log(response.data);
        setUserNif(response.data.userNIF);
        setUserName(response.data.name);
        setUserLastName(response.data.lastname);
        setuserBirthDate(response.data.birthdate.substring(0,10));
        setphoneNumber(response.data.phoneNumber);
        setUserEmail(response.data.email);
        setUserGender(response.data.gender);
      }
        catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }      
      }  
}
const Update = async (e) => {
  e.preventDefault();
  try{
    const response = await axios.post('/updateUser',{
          userNIF: userNIF,
          email: email,
          password: password
      }
    )
    console.log(response.data);
    setUserEmail(response.data.email);
    setuserPassword(response.data.password);
  }
    catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }      
  } 
}
return(
      <div className="" style={{ backgroundColor: '#dde8e8' }}>
        <Container>
          <Row className="justify-content-center">
            <Col xs="12" sm="12" md="12" lg="12" xl="12" className="mt-5 mb-5">
              <Card className='p-md-5 p-ms-md-2' style={{ borderRadius: '100px', boxShadow: '13px 18px 8px 1px rgb(104 104 104 / 40%)' }}>
                <Card.Body className='p-md-0 p-5'>
                  <Row className="pt-md-4 px-md-4 p-xs-0">
                    <Col className="d-flex flex-column mb-3 align-items-center col-md-3 xs-12">
                      <CardImg
                        style={{ width: '180px', borderRadius: '40px' }}
                        src='https://media.tenor.com/etE6CtE9mpIAAAAM/gerard-romero.gif'
                        alt='Generic placeholder image'
                        fluid />
                        <Button variant="success mt-3" style={{ fontWeight: '600', fontStyle: 'italic' }}>CAMBIAR FOTO DE PERFIL</Button>{' '}
                    </Col>
                    <Col className='col-md-9 col-sm-12 xs-12 fs-4 fs-md-5 fs-lg-6 fs-xl-7'>
                      <div className="flex-grow-1 xl-5 lg-5 ms-0 ms-md-5" style={{ color: '#3b6060', fontStyle: 'italic' }}>
                        <Card.Text className='fs-1'>
                          <span style={{ fontWeight: 'bold' }}>Name:</span><span style={{ fontWeight: 'bold' }}>{userName}</span>
                          <span style={{ fontWeight: 'bold' }}>lastname:</span><span style={{ fontWeight: 'bold' }}>{userLastName}</span>
                        </Card.Text>
                        <Row className="d-flex justify-content-start rounded-3 p-1 xs-12">
                          <Col className="lg-4 col-md-4 sm-4 col-12">
                            <p className="text-muted mb-0"><span>NIF:</span> {userNIF}</p>
                            <p><span style={{ fontWeight: '600' }}>PRUEBA</span></p>
                          </Col>
                          <Col className="lg-4 col-md-4 sm-4 col-12">
                            <p className="text-muted mb-0"><span>Gender:</span> {userGender}</p>
                            <p><span style={{ fontWeight: '600' }}>PRUEBA</span></p>  
                          </Col>
                          <Col className="lg-4 col-md-4 sm-4 col-12">
                            <p className="text-muted mb-0"><span>Email:</span> {email}</p>
                            <p><span style={{ fontWeight: '600' }}>PRUEBA</span></p>
                          </Col>
                        </Row>
                        <Row className="d-flex justify-content-start rounded-3 p-2 mb-2">
                          <Col className="col-md-12 px-12">
                            <p className="text-muted mb-1"><span>Dirección:</span> {userNIF}
                            <p><span style={{ fontWeight: '600' }}>PRUEBA</span></p>
                            </p>    
                          </Col>
                        </Row>
                        </div>
                      </Col>
                    </Row>
                    <Row className="lg-4 md-4 xs-12 pt-md-2 pb-md-4 px-md-4 fs-4 fs-md-5 fs-lg-6 fs-xl-7 flex-grow-1 ms-0 ms-md-12 d-flex align-items-end" style={{ color: '#3b6060', fontStyle: 'italic' }}>
                      <Col className="col-md-4 col-12">
                        <p className="text-muted mb-1"><span>Fecha de nacimiento:</span> {email}</p>
                        <p className='mb-0'><span style={{ fontWeight: '600' }}>PRUEBA</span></p> 
                        <Button className='w-100 border-3' variant="success mt-3" style={{ fontWeight: '600', fontStyle: 'italic', borderRadius: '15px' }}>MOSTRAR CONTRASEÑA</Button>{' '}
                      </Col>
                      <Col className="col-md-4 col-12">
                        <p className="text-muted mt-3 mb-1"><span>Contraseña:</span> {email}</p>
                        <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setuserPassword(e.target.value)} />
                        <Form.Control className='mt-3' type="password" placeholder="Contraseña" value={password} onChange={(e) => setuserPassword(e.target.value)} />
                      </Col>
                      <Col className="col-md-4 col-12">
                        <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setuserPassword(e.target.value)} />
                        <Button className='w-100 rounded-10 boton-naranja' variant="success mt-3" style={{ fontWeight: '600', fontStyle: 'italic', borderRadius: '15px' }}>CAMBIAR CONTRASEÑA</Button>{' '}
                      </Col>
                      {/*<Form onSubmit={Show} className='bg-success text-white bg-opacity-50 border border-dark rounded w-25 shadow-lg p-3 mb-5 rounded'style={{minWidth: "250px"}}>
                            <Form.Group className="field mt-4 mb-4">
                              <div className="container pl-2 ">
                                <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>NIF del Usuario</Form.Label>
                                <Form.Control type="username" placeholder="12345678A" value={userNIF} onChange={(e) => setUserNif(e.target.value)} />
                                <Button variant="success" type="submit" className= "border-dark w-100">
                                    Entrar
                                </Button> 
                              </div>
                            </Form.Group> 
                          </Form>

                          <Form onSubmit={Update} className='bg-success text-white bg-opacity-50 border border-dark rounded w-25 shadow-lg p-3 mb-5 rounded'style={{minWidth: "250px"}}>
                            <Form.Group className="field mt-4 mb-4">
                              <div className="container pl-2 ">
                                
                                <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>NIF del Usuario</Form.Label>
                                <Form.Control type="username" placeholder="12345678A" value={userNIF} onChange={(e) => setUserNif(e.target.value)} />
                                
                                <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>userEmail</Form.Label>
                                <Form.Control type="username" placeholder="12345678A" value={email} onChange={(e) => setUserEmail(e.target.value)} />
                                <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>userPassword</Form.Label>
                                <Form.Control type="username" placeholder="12345678A" value={password} onChange={(e) => setuserPassword(e.target.value)} />
                                <Button variant="success" type="submit" className= "border-dark w-100">
                                    Actualizar
                                </Button> 
                              </div>
                            </Form.Group> 
                          </Form>*/}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div> 
      )
}
export default ActivityProfile;