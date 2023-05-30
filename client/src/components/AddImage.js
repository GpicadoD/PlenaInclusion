import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/esm/Row';

const AddImage = () => {
    const [userNIF, setUserNif] = useState('');
    const [image, setImage] = useState('');
    const [data, setData] = useState('');
    const [selectedImages, setSelectedImages] = useState('');
    const [previewImages, setPreviewImages] = useState('');
    const [msg, setMsg] = useState('');
    const history = useNavigate();

    const PreviewImg = async (e) => {
        try {
          setSelectedImages(e.target.files[0]);
          const inputFile = e.target.files[0];
          if (inputFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
              setPreviewImages([e.target.result]);
            };
            reader.readAsDataURL(inputFile);
          }
        } catch (error) {
          console.error(error);
        }
    };

    const Add = async (e) => {
        try {
          e.preventDefault();
          console.log(previewImages);
          const formData = new FormData();
          formData.append('file', selectedImages);
      
          axios.post('/upload', formData)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        } catch (error) {
          console.error(error);
        }
    };
        
    return (
        <div style={{ 
            backgroundImage: `url("https://sirc.ca/wp-content/uploads/2020/03/AdobeStock_298604606-scaled.jpeg")`,
            backgroundSize: "cover"
        }}>
            <div className='bg-success bg-opacity-25'>
                <div className= "form-container vh-100 d-flex justify-content-center align-items-center">
                    <Form onSubmit={Add} className='bg-success text-white bg-opacity-50 border border-dark rounded w-50 shadow-lg p-3 mb-5 rounded'>
                        <Form.Group className="field mt-4 mb-4">
                            <div className="Formulario_usuario container pl-2 ">
                                <Row>
                                        <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>Imagen Actividad</Form.Label>
                                        <Form.Control className="mb-3" type="file" id="input-files" onChange={PreviewImg} />
                                </Row>
                                <Row>
                                    <div className="container pl-2 d-flex justify-content-center">
                                        {previewImages && <img src={previewImages} style={{maxWidth: "200px"}}/>}
                                    </div>
                                </Row>
                                    <div className= "d-flex justify-content-center align-items-center mt-3">
                                <Button variant="success" type="submit" className= "border-dark w-100">
                                    Añadir Imagen
                                </Button> 
                                </div> 
                            </div>
                        </Form.Group> 
                    </Form>
                </div>  
            </div>
        </div>
    )
}


export default AddImage;