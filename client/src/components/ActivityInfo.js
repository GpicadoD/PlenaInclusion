import React, { useState } from 'react';
import { Container, Row, Col, Card, CardImg, Button, Form } from 'react-bootstrap';
import futbol from '../../src/img/futbol.jpeg'
import axios from 'axios';


const ActivityInfo = () => {
  
    const [activityId, setActivityId] = useState('');
    const [nameAct, setNameAct] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [Description, setDescription] = useState('');
    const [Limit, setLimit] = useState('');
    const [msg, setMsg] = useState('');

    const Show = async (e) => {
      console.log("NewActivityOK")
      e.preventDefault();
      try{
        const response = await axios.post('/ActivityInfo', {
          activityId: activityId
        }
        )
        console.log(response.data);
        setActivityId(response.data.activityId);
        setNameAct(response.data.nameAct);
        setStartDate(response.data.startDate);
        setFinishDate(response.data.finishDate);
        setDescription(response.data.Description);
        setLimit(response.data.Limit);
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

  return (
    <div className="vh-100" style={{ backgroundColor: '#9de2ff' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="5" className="mt-5">
            <Card style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4">
                <div className="d-flex text-black" style={{display: 'flex'}}>
                  <div className="flex-shrink-0">
                    <CardImg
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={futbol}
                      alt="Activity image"
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                      <Card.Text><span style={{ fontWeight: 'bold' }}>NameAct:</span> {nameAct}</Card.Text>
                      <Card.Text><span style={{ fontWeight: 'bold' }}>Description:</span> {Description}</Card.Text>
                        <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                          style={{ backgroundColor: '#efefef' }}>
                          <div>
                            <p className="small text-muted mb-1"><span style={{ fontWeight: 'bold' }}>startDate:</span> {startDate}</p>    
                          </div>
                          <div className="px-3">
                            <p className="small text-muted mb-1"><span style={{ fontWeight: 'bold' }}>finishDate:</span> {finishDate}</p>    
                          </div>
                    </div>
                    <div>
                      <Card.Text><span style={{ fontWeight: 'bold' }}>Limit:</span> {Limit}</Card.Text>
                    </div>
                    <Form onSubmit={Show} className='bg-success text-white bg-opacity-50 border border-dark rounded w-25 shadow-lg p-3 mb-5 rounded'style={{minWidth: "250px"}}>
                            <Form.Group className="field mt-4 mb-4">
                              <div className="container pl-2 ">
                                <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>ActivityId</Form.Label>
                                <Form.Control type="username" placeholder="1" value={activityId} onChange={(e) => setActivityId(e.target.value)} />
                                <Button variant="success" type="submit" className= "border-dark w-100">
                                    Entrar
                                </Button> 
                              </div>
                            </Form.Group> 
                    </Form>
                    <Form onSubmit={Update} className='bg-success text-white bg-opacity-50 border border-dark rounded w-25 shadow-lg p-3 mb-5 rounded'style={{minWidth: "250px"}}>
                            <Form.Group className="field mt-4 mb-4">
                              <div className="container pl-2 ">
                                
                                <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>activityId</Form.Label>
                                <Form.Control type="username" placeholder="1" value={activityId} onChange={(e) => setActivityId(e.target.value)} />
                                
                                <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>NameAct</Form.Label>
                                <Form.Control type="username" placeholder="Futbol" value={nameAct} onChange={(e) => setNameAct(e.target.value)} />

                                <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>Description</Form.Label>
                                <Form.Control type="username" placeholder="*" value={Description} onChange={(e) => setDescription(e.target.value)} />
                                <Button variant="success" type="submit" className= "border-dark w-100">
                                    Actualizar
                                </Button> 
                              </div>
                            </Form.Group> 
                      </Form>
                    <div className="d-flex pt-1">
                      <Button outline className="me-1 flex-grow-1">
                        Chat
                      </Button>
                      <Button className="flex-grow-1">Follow</Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ActivityInfo;