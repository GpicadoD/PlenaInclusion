import React from 'react';
import { Container, Row, Col, Card, CardImg, Button } from 'react-bootstrap';
import futbol from '../../src/img/futbol.jpeg'
import entrenadora from '../../src/img/entrenadora.jpg'


const ActivityInfo = () => {
  
    const [userNIF, setUserNif] = useState('');
    const [nameAct, setNameAct] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [Description, setDescription] = useState('');
    const [Limit, setLimit] = useState('');
    const history = useNavigate();

    const getActivityInfo = async (e) => {
      console.log("NewActivityOK")
      e.preventDefault();
    
      const response = await axios.post('/ActivityInfo', {
        nameAct: nameAct,
        startDate: startDate,
        finishDate: finishDate,
        Description: Description,
        Limit: Limit,
       
        });
        console.log("GetActivityInfo");
        console.log(response.data);
    }
 

  return (
    <div className="vh-100" style={{ backgroundColor: '#9de2ff' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="5" className="mt-5">
            <Card style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4">
                <div className="d-flex text-black" style={{display: 'flex'}}>
                  <div>
                  <div className="flex-shrink-0">
                    <CardImg
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={futbol}
                      alt="Activity image"
                      fluid
                    />
                    <div className="d-flex align-items-center mt-3">
                      <CardImg
                        style={{ width: '180px', borderRadius: '10px' }}
                        src={entrenadora}
                        alt="Organizer profile image"
                        fluid
                      />
                  </div>
                  </div>
                  <div className="flex-grow-1 ms-3 text-center">
                    <Card.Title>Actividad de Futbol 7</Card.Title>
                    <Card.Text>Lugar: Pabellon siglo XXI</Card.Text>
                    <Card.Text>Inscritos: 24 personas</Card.Text>
                    <Card.Text>Organizador: Begoña Pérez</Card.Text>
                    </div>
                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2" style={{ backgroundColor: '#efefef' }}>
                      <div>
                        <p className="small text-muted mb-1">Fecha</p>
                        <p className="mb-0">2023-11-23</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">Hora de inicio</p>
                        <p className="mb-0">17:45</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Duración</p>
                        <p className="mb-0">2H</p>
                      </div>
                    </div>
                    <Card.Text className="mt-3">
                      Descripción: Partido de futbol de 7 contra 7  con 10 jugadores de recambio 
                      para cada equipo y personal especializado. El torneo durara 5 meses.
                      Que gane el mejor!!
                    </Card.Text>
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