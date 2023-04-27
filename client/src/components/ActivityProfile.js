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
  const[userEmail,setUserEmail] = useState('');
  const[userBirthDate,setuserBirthDate] = useState('');
  const[phoneNumber,setphoneNumber] = useState('');
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
                        src='https://pbs.twimg.com/media/FuGkh2SX0AEYeHT.png'
                        alt='Generic placeholder image'
                        fluid />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <Card.Text><span style={{ fontWeight: 'bold' }}>Name:</span> {userName}</Card.Text>
                      <Card.Text><span style={{ fontWeight: 'bold' }}>lastname:</span> {userLastName}</Card.Text>
                        <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                          style={{ backgroundColor: '#efefef' }}>
                        <div>
                          <p className="small text-muted mb-1"><span style={{ fontWeight: 'bold' }}>userEmail:</span> {userEmail}</p>    
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