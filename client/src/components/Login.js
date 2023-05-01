import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

const Login = () => {
    const [newUserNif, setnewUserNif] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/loginNewUser', {
                newUserNif: newUserNif,
                password: password
            });
            history("/protodash", {state:{newUserNif}});
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        {/*<section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Auth} className="box">
                                <div className="field mt-5">
                                    <label className="label">UserNIF</label>
                                    <div className="controls">
                                        <input type="username" className="input" placeholder="Username" value={newUserNif} onChange={(e) => setnewUserNif(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </section>*/},
    <div style={{ 
        backgroundImage: `url("https://sirc.ca/wp-content/uploads/2020/03/AdobeStock_298604606-scaled.jpeg")`,
        backgroundSize: "cover",
    }}>
        <div className='bg-success bg-opacity-25'>
            <div className= "form-container vh-100 d-flex justify-content-center align-items-center">
                <Form onSubmit={Auth} className='bg-success text-white bg-opacity-50 border border-dark rounded w-25 shadow-lg p-3 mb-5 rounded'style={{minWidth: "250px"}}>
                    <Form.Group className="field mt-4 mb-4">
                        <div className="container pl-2 ">
                            <Form.Label className=" d-flex justify-content-center" style={{fontSize: 20}}>NIF del Usuario</Form.Label>
                            <Form.Control type="username" placeholder="12345678A" value={newUserNif} onChange={(e) => setnewUserNif(e.target.value)} />
                            <Form.Label className="d-flex justify-content-center mt-4" style={{fontSize: 20}}>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {/*No funciona el check, está creado para cuandose agregue el webtoken*/}
                            <Form.Check className="mt-3" label= "Recordar contraseña"/>
                            <div className= "d-flex justify-content-center align-items-center mt-3">
                                <Button variant="success" type="submit" className= "border-dark w-100">
                                    Entrar
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

export default Login;
