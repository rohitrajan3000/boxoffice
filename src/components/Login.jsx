
import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import { useNavigate } from "react-router-dom";
import LoginImg from '../assets/Logo.png';

export default function SignUp() {


    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    async function handelLogin() {
        createUserWithEmailAndPassword(auth , email , password ).then((userCreds) => {
            console.log(userCreds.user)

            
        })
        navigate('/home')

    }
    


    return (
        <div className="auth-container">
            <Container >
                <Row>
                    <Col className="inner-Container"><img src={LoginImg} height={490} />
                    </Col>
                    <Col className="inner-Container">
                        <h1 className="title">BOX OFFICE</h1>

                        <Card style={{ width: '25rem', padding: 25 }}  >
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.currentTarget.value)} />

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="current-password" placeholder="Password" onChange={(e) => setPassword(e.currentTarget.value)} />
                                    </Form.Group>



                                    <Button variant="primary" type="submit" className="Login-bt" onClick={handelLogin}>
                                        SignUo
                                    </Button >
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 25 }}>
                                        Already have an account ? <a href="/home">Login</a></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}