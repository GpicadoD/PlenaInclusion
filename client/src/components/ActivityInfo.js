
// These lines of code import necessary libraries and modules for the component to work.
// Specifically, it imports React and useState from the 'react' library, as well as several 
//components from the 'react-bootstrap' library, an image, and the 'axios' library for 
//making API requests. It also defines a functional component called 'ActivityInfo', 
//which renders some HTML elements and defines two functions: 'Show' and 'Update'.
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardImg, Button, Form } from 'react-bootstrap';
import futbol from '../../src/img/futbol.jpeg'
import axios from 'axios';
import { renderMatches, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import {useLocation} from 'react-router-dom';


const ActivityInfo = () => {
  const location = useLocation();
  // The 'useState' hooks initialize state variables for 'activityId', 
  // 'nameAct', 'startDate', 'finishDate', 'Description', 'Limit', and 'msg' respectively
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
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [Description, setDescription] = useState('');
    const [Limit, setLimit] = useState('');
    const [msg, setMsg] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const navigation = useNavigate();
    const [actID, setActID] = useState();
    // The 'Show' function makes an API request to the server with the 'activityId' state as a parameter, 
    //and sets the state variables for 'nameAct', 'startDate', 'finishDate', 'Description', 'Limit', and 'msg' with the returned data if the request is successful. 
    //If there is an error, it sets the 'msg' state variable with the error message.
    const Show = async (e) => {
      console.log("NewActivityOK")
      e.preventDefault();
      try{
        const response = await axios.post('/getnewAct', {
          activityId: actID
        });
        console.log(response);
        setActivityId(response.data.activityId);
        setNameAct(response.data.nameAct);
        setStartDate(response.data.startDate);
        if(response.data.finishDate !== null){
          setFinishDate(response.data.finishDate);
        } else {
          setFinishDate(response.data.startDate);
        }
        setDescription(response.data.Description);
        setLimit(response.data.Limit);
      }
        catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }      
      }  
    };
    
      // The 'Update' function makes an API request to the server with the 'activityId', 'nameAct', and 'Description' states as parameters,
      //and sets the state variables for 'nameAct' and 'Description' with the returned data if the request is successful. 
      //If there is an error, it sets the 'msg' state variable with the error message.
    const Update = async (e) => {
      e.preventDefault();
      try{
        const response = await axios.post('/UpdateActivities',{
              activityId: activityId,
              nameAct: nameAct,
              Description: Description
          }
        )
        console.log(response.data);
        setNameAct(response.data.nameAct);
        setDescription(response.data.Description);
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
          setExpire(decoded.exp);
      } catch (error) {
          if (error.response) {
              navigation("/");
          }
      }
  }
  useEffect(() => {
    setActID(location.state.e);
    refreshToken();
    
}, []);
useEffect(() => {
  Show(new Event ('First'));
  
}, [actID]);

    // Finally, the component returns a div that contains several child components that display information and allow the user to input new values for the 'activityId',
    // 'nameAct', and 'Description' state variables. It also displays the 'msg' state variable if there is an error.
  return (
    <div className="" style={{ backgroundColor: '#dde8e8' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs="12" sm="12" md="12" lg="12" xl="12" className="mt-5 mb-5">
            <Card className='' style={{ borderRadius: '100px', boxShadow: '13px 18px 8px 1px rgb(104 104 104 / 40%)' }}>
            <Card.Img  className='card-img-top rounded-bottom p-0'
                      style={{ borderRadius: '100px',
                      objectFit: 'cover',
                      height: '250px',
                      zIndex: 1 }}
                      src={futbol}
                      alt="Activity image"
                      fluid
                    />
              <Card.Body className="p-5">
                <Row className="d-flex text-black px-5" style={{display: 'flex'}}>
                  <Col className="d-flex flex-column mb-3 col-md-12 col-12">
                    <Row className='justify-content-center mb-4'>
                      <Card.Text className='col-md-7 col-12 mb-0'><span style={{ fontWeight: '600', fontStyle: 'italic', fontSize: '30px' }}>Nombre: {nameAct}</span></Card.Text>
                      <Button variant="success col-md-5 col-12" style={{ fontWeight: '600', fontStyle: 'italic' }}>CAMBIAR FOTO DE PERFIL</Button>{' '}
                    </Row>
                    <Row className='fs-4 fs-md-5 fs-lg-6 mb-1'>
                      <Col className="lg-3 col-md-3 sm-3 col-12">
                        <p className="text-muted mb-0"><span>Fecha Inicio: </span></p>
                        <p><span style={{ fontWeight: '600' }} >{startDate.substring(0,10)}</span></p>
                      </Col>
                      <Col className="lg-3 col-md-3 sm-3 col-12">
                        <p className="text-muted mb-0"><span>Fecha Inicio: </span></p>
                        <p><span style={{ fontWeight: '600' }}>{finishDate.substring(0,10)}</span></p>  
                      </Col>
                      <Col className="lg-3 col-md-3 sm-3 col-12">
                        <p className="text-muted mb-0"><span>Hora: </span></p>
                        <p><span style={{ fontWeight: '600' }}>{startDate.substring(11,19)}</span></p>
                      </Col>
                      <Col className="lg-3 col-md-3 sm-3 col-12">
                        <p className="text-muted mb-0"><span>Total:</span></p>
                        <p><span style={{ fontWeight: '600' }}>0/{Limit}</span></p>  
                      </Col>
                    </Row>
                    <Row className='fs-4 fs-md-5 fs-lg-6 fs-xl-7'>
                      <Col className="lg-9 col-md-9 sm-9 col-12">
                        <p className="text-muted mb-0"><span>Descripción:</span></p>
                        <p><span style={{ fontWeight: '600' }}>{Description}</span></p>
                      </Col>
                    </Row>
                    <Row className='fs-4 fs-md-5 fs-lg-6 fs-xl-7'>
                      <Col className="lg-3 col-md-3 sm-3 col-12">
                        <p className="text-muted mb-0"><span>{' '}</span></p>
                        <p><span style={{ fontWeight: '600' }}>{' '}</span></p>
                      </Col>
                      <Col className="lg-3 col-md-3 sm-3 col-12">
                        <p className="text-muted mb-0"><span>{' '}</span></p>
                        <p><span style={{ fontWeight: '600' }}>{' '}</span></p>  
                      </Col>
                      <Col className="lg-3 col-md-3 sm-3 col-12">
                        <p className="text-muted mb-0"><span>{' '}</span></p>
                        <p><span style={{ fontWeight: '600' }}>{' '}</span></p>
                      </Col>
                      <Col className="lg-3 col-md-3 sm-3 col-12 d.flex justify-content-end">
                        <Button className='w-100 border-3' variant="success mt-3" style={{ fontWeight: '600', fontStyle: 'italic', borderRadius: '15px' }}>APUNTARSE</Button>{' '}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ActivityInfo;