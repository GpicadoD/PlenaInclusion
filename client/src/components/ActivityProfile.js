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
    return (
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
                        src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                        alt='Generic placeholder image'
                        fluid />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <Card.Title>Danny McLoan</Card.Title>
                      <Card.Text>Senior Journalist</Card.Text>
  
                      <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                        style={{ backgroundColor: '#efefef' }}>
                        <div>
                          <p className="small text-muted mb-1">Articles</p>
                          <p className="mb-0">41</p>
                        </div>
                        <div className="px-3">
                          <p className="small text-muted mb-1">Followers</p>
                          <p className="mb-0">976</p>
                        </div>
                        <div>
                          <p className="small text-muted mb-1">Rating</p>
                          <p className="mb-0">8.5</p>
                        </div>
                      </div>
                      <div className="d-flex pt-1">
                        <Button outline className="me-1 flex-grow-1">Chat</Button>
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
    )
}

export default ActivityProfile;