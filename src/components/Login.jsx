
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { auth } from '../firebase';


import { useNavigate } from "react-router-dom";
import LoginImg from '../assets/Logo.png';

export default function SignUp() {


    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    async function handelLogin() {
       
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            
        })
        navigate('/home')
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

        

    }



    return (
        <div className="auth-container">
            <Container >
                <Row>
                    <Col className="inner-Container"><img src={LoginImg} height={490} />
                    </Col>
                    <Col className="inner-Container">
                        <h1 className="title">BOX OFFICE</h1>

                        <Card className="log" style={{ width: '25rem', padding: 25 }}  >
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.currentTarget.value)} />

                                    </Form.Group>


                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.currentTarget.value)} />
                                    </Form.Group>



                                    <Button variant="primary" type="onSubmit" className="Login-bt" onClick={handelLogin}>
                                        LogIn
                                    </Button >
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 25 }}>
                                        Join The Club ? <a style={{ color: 'white' }} href="/signup"> SignUp</a></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}