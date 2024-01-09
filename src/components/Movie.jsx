import { default as React } from "react";
import { Button, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from "react-router-dom";
import profileimg from '../assets/account.png';
import homeimg from '../assets/home.png';
import reviewimg from '../assets/movie-reel.png';
import '../components/Homecss.css';

import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import logoimg from '../assets/logo.png';
import Cast from "./Cast";
import Similarm from "./Similarm";

const IMAGE_API = 'https://image.tmdb.org/t/p/w500/';






export default function Movie() {
    const location = useLocation();
    const { title, overview, poster_path, id } = location.state;
    const [showDialog, setShowDialog] = useState(false);

    const handleClose = () => setShowDialog(false);
    const handleShow = () => setShowDialog(true);






    return (
        <div>

            <Navbar style={{ backgroundColor: '#5C469C' }}>
                <Container >
                    <Navbar.Brand href="#Home" style={{ color: "white", fontFamily: 'Bebas Neue', fontSize: '30px' }} >
                        <img
                            alt=""
                            src={logoimg}
                            width="50"
                            height="40"
                            className="d-inline-block align-top"
                        />{' '}
                        BOXOFFICE
                    </Navbar.Brand>
                    <Button style={{ backgroundColor: '#D4ADFC', color: 'black' }} onClick={() => navigate('/login')} className='Logout-btn'>Logout</Button>
                </Container>

            </Navbar>
            <Row>
                <Container style={{ width: '7%', height: '90vh', backgroundColor: '#0F2167', color: 'white', padding: '20px' }}>
                    <Button style={{ marginBottom: '10px', backgroundColor: '#512B81' }}><img src={homeimg} style={{ height: '30px' }} /></Button>
                    <Button style={{ marginBottom: '10px', backgroundColor: '#D4ADFC' }}><img src={profileimg} style={{ height: '30px' }} /></Button>
                    <Button style={{ marginBottom: '10px', backgroundColor: '#D4ADFC' }}><img src={reviewimg} style={{ height: '30px' }} /></Button>
                </Container>
                <Container className="containersss" style={{ width: '93%', height: '90vh', backgroundColor: '#200E3A', color: 'white', padding: '20px' }}>
                    <Row>
                        <Col style={{ margin: '10px', width: '50%' }} >
                            <img src={IMAGE_API + poster_path} />
                            <h1 style={{ marginTop: '20px', marginBottom: '20px' }}>{title}</h1>
                            <div>
                                {overview}
                            </div>

                            <Button onClick={handleShow} style={{ marginTop: '20px', marginBottom: '20px' }}>Post Review</Button>
                            <Cast />
                            <Similarm />


                        </Col>
                        <Col>
                            <Modal  show={showDialog} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{title}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <textarea placeholder="Write Your Review" style={{width:'100%',height:'150px', border:'none'}}/>
                                    Rating <input style={{width:'40px',border:'none'}} type="number" /> outoff 5
                                    
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button  onClick={handleClose}>
                                        Submit
                                    </Button>
                                    {/* Add other buttons or actions as needed */}
                                </Modal.Footer>
                            </Modal>

                        </Col>
                    </Row>





                </Container>
            </Row>


        </div>
    )
}