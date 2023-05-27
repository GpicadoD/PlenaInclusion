import React, { useState, useEffect } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/esm/Card';
import { Buffer } from 'buffer';

const ShowImage = () => {
    const [listImages, setListImages] = useState([]);

    const GetImg = async (e) => {
        e.preventDefault();
        const listIMG = await axios.post("/getImg");
        console.log("Imagenes:");
        console.log(listIMG.data);
        setListImages(listIMG.data);
    };


    useEffect(() => {   
        console.log("useEffects ok");
        GetImg(new Event(''));

    }, []);

        
    return (
        <div style={{ 
            backgroundImage: `url("https://sirc.ca/wp-content/uploads/2020/03/AdobeStock_298604606-scaled.jpeg")`,
            backgroundSize: "cover"
        }}>
            <div className='bg-success bg-opacity-25'>
                <div className= "form-container vh-100 d-flex justify-content-center align-items-center">
                    {<Row xs={1} md={4} className="g-4 mt-1 mb-5">
                        {listImages.map((image) => (//Es un for each no se asusten
                            <Col key={image.idImgOrg}>
                                <Card className={`box-shadow`} key={image.idImgOrg}>
                                <Card.Img
                                        src={`data:image/jpeg;base64,${Buffer.from(image.ImgOrg).toString('base64')}`}
                                        alt={image.name}
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>}
                </div>  
            </div>
        </div>
    )
}


export default ShowImage;