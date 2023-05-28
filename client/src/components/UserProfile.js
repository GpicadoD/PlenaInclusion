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

//This function gets the userNif from the html, sends it to the routes('/newUser') and executes the function 
//that is asocciated to '/newUser'. This function also sets all the info about the user
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

//This function gets the userNif, the email and the password from the html, sends it to the routes('/updateUser')
//and executes the function that is asocciated to '/newUser' that updates the email and password
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

const LogOut = async (e) => {
  e.preventDefault();
  try{
    const response = await axios.post('/logout',{
          userNIF: userNIF,
      }
    )
    console.log(response.data);
  }
    catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }      
  } 
}
return(
      <div className="vh-100" style={{ backgroundColor: '#9de2ff' }}>
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="5" className="mt-5">
              <Card style={{ borderRadius: '15px' }}>
                <Card.Body className="p-4">
                  <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                      <CardImg
                        style={{ width: '180px', borderRadius: '10px' }}
                        src='https://media.tenor.com/etE6CtE9mpIAAAAM/gerard-romero.gif'
                        alt='Generic placeholder image'
                        fluid />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <Card.Text><span style={{ fontWeight: 'bold' }}>Name:</span> {userName}</Card.Text>
                      <Card.Text><span style={{ fontWeight: 'bold' }}>lastname:</span> {userLastName}</Card.Text>
                        <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                          style={{ backgroundColor: '#efefef' }}>
                          <div>
                            <p className="small text-muted mb-1"><span style={{ fontWeight: 'bold' }}>userEmail:</span> {email}</p>    
                          </div>
                          <div className="px-3">
                            <p className="small text-muted mb-1"><span style={{ fontWeight: 'bold' }}>userGender:</span> {userGender}</p>    
                          </div>
                    </div>
                    <div>
                      <Card.Text><span style={{ fontWeight: 'bold' }}>birthdate:</span> {userBirthDate}</Card.Text>
                      <Card.Text><span style={{ fontWeight: 'bold' }}>phoneNumber:</span> {phoneNumber}</Card.Text>
                    </div>
                          <Form onSubmit={Show} className='bg-success text-white bg-opacity-50 border border-dark rounded w-25 shadow-lg p-3 mb-5 rounded'style={{minWidth: "250px"}}>
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
                          </Form>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div> 
      )
}
export default ActivityProfile;