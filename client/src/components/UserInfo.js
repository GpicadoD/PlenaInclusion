import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import CardImg from 'react-bootstrap/esm/CardImg';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import users from '../../src/img/users.jpeg'

const UserInfo = () => {
    return (
      <div className="vh-100" style={{ backgroundColor: '#9de2ff' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="5" className="mt-5">
            <Card style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0"></div>
                  <div className="flex-shrink-0">
                    <CardImg
                      src={users}
                      alt = 'Imagen usuario'                       />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title>Ricardo fuentes</Card.Title>
                    <Card.Text>17455934D</Card.Text>
                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#efefef' }}>
                      <div>
                        <p className="small text-muted mb-1">Correo electronico</p>
                        <p className="mb-0">RichardSource@hotmail.com</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">Fecha Nacimiento</p>
                        <p className="mb-0">20-04-1990</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Telefono</p>
                        <p className="mb-0">653321987</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Numero de emergencia</p>
                        <p className="mb-0">976264351</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Genero</p>
                        <p className="mb-0">M</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      <Button outline className="me-1 flex-grow-1">Cambiar contraseña</Button>
                      <Button className="flex-grow-1">Regenerar contraseña</Button>
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

export default UserInfo;
