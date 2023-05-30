import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import CardImg from 'react-bootstrap/esm/CardImg';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const UserProfile = () => {
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
  const [NifCom, setNifCom] = useState( '1'/*location.state.newUserNif*/);
  const[userNIF,setUserNif] = useState('');
  const[userName,setUserName] = useState('');
  const[userLastName, setUserLastName] = useState ('');
  const[email,setUserEmail] = useState('');
  const[userBirthDate,setuserBirthDate] = useState('');
  const[phoneNumber,setphoneNumber] = useState('');
  const[password,setuserPassword] = useState('');
  const[userGender,setUserGender] = useState('');
  const[oldPassword, setOldPassword] = useState('');
  const[newPassword, setNewPassword] = useState('');
  const[confirmPassword, setConfirmPassword] = useState('');
  const[msg, setMsg] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const navigation = useNavigate();
  const [shown, setShown] = React.useState(false);
  const switchShown = () => setShown(!shown);
  const Show = async (e) => {
      e.preventDefault();
      try{
        const response = await axios.post('/newUser',{
              userNIF: NifCom
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
const UpdatePass = async (e) => {
  e.preventDefault();
  try{
    const response = await axios.post('/updatePassword',{
          newUserNif: NifCom,
          oldUserPass: oldPassword,
          newUserPass: newPassword,
          confirmPass: confirmPassword
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
          navigation(-1);
      }
  }
}
useEffect(() => {   

refreshToken();
}, []);
useEffect(() => {   
  refreshToken();
  Show(new Event ('First'));
}, [NifCom]);

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
                      <div className="flex-grow-1 xl-5 lg-5 ms-0 ms-md-5" style={{ fontStyle: 'italic' }}>
                        <Card.Text className='fs-1'>
                          <span style={{ fontWeight: 'bold' }}>Name:</span><span style={{ fontWeight: 'bold' }}>{userName}</span>
                          <span style={{ fontWeight: 'bold' }}>lastname:</span><span style={{ fontWeight: 'bold' }}>{userLastName}</span>
                        </Card.Text>
                        <Row className="d-flex justify-content-start rounded-3 p-1 xs-12">
                          <Col className="lg-4 col-md-4 sm-4 col-12">
                            <p className="text-muted mb-0"><span>NIF:</span> </p>
                            <p><span style={{ fontWeight: '600' }}>{userNIF}</span></p>
                          </Col>
                          <Col className="lg-4 col-md-4 sm-4 col-12">
                            <p className="text-muted mb-0"><span>Gender:</span> </p>
                            <p><span style={{ fontWeight: '600' }}>{userGender}</span></p>  
                          </Col>
                          <Col className="lg-4 col-md-4 sm-4 col-12">
                            <p className="text-muted mb-0"><span>Email:</span> </p>
                            <p><span style={{ fontWeight: '600' }}>{email}</span></p>
                          </Col>
                        </Row>
                        <Row className="d-flex justify-content-start rounded-3 p-2 mb-2">
                          <Col className="col-md-12 px-12">
                            <p className="text-muted mb-1"><span>Dirección:</span> 
                            <p><span style={{ fontWeight: '600' }}>{userNIF}</span></p>
                            </p>    
                          </Col>
                        </Row>
                        </div>
                      </Col>
                    </Row>
                    <Row className="lg-4 md-4 xs-12 pt-md-2 pb-md-4 px-md-4 fs-4 fs-md-5 fs-lg-6 fs-xl-7 flex-grow-1 ms-0 ms-md-12 d-flex align-items-end" style={{ color: '#3b6060', fontStyle: 'italic' }}>
                      <Col className="col-md-4 col-12">
                        <p className="text-muted mb-1"><span>Fecha de nacimiento:</span> </p>
                        <p className='mb-0'><span style={{ fontWeight: '600' }}>{userBirthDate}</span></p> 
                        <Button onClick={switchShown} className='w-100 border-3' variant="success mt-3" style={{ fontWeight: '600', fontStyle: 'italic', borderRadius: '15px' } }>{shown ? "MOSTRAR CONTRASEÑA":"MOSTRAR CONTRASEÑA"}</Button>{' '}
                      </Col>
                      <Col className="col-md-4 col-12">
                        <p className="text-muted mt-3 mb-1"><span>Contraseña:</span></p>
                        <Form.Control type={shown ? 'text' : 'password'} placeholder="Nueva Contraseña" onChange={(e) => setNewPassword(e.target.value)} />
                        <Form.Control className='mt-3' type={shown ? 'text' : 'password'} placeholder="Confirmar Nueva Contraseña" onChange={(e) => setConfirmPassword(e.target.value)} />
                      </Col>
                      <Col className="col-md-4 col-12">
                        <Form.Control type={shown ? 'text' : 'password'} placeholder="Antigua Contraseña" onChange={(e) => setOldPassword(e.target.value)} />
                        <Button onClick={UpdatePass} className='w-100 rounded-10 boton-naranja' variant="success mt-3" style={{ fontWeight: '600', fontStyle: 'italic', borderRadius: '15px' }}>CAMBIAR CONTRASEÑA</Button>{' '}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div> 
      )
}
export default UserProfile;