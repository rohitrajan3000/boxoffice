import { default as React } from "react";
import { Button, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from "react-router-dom";
import profileimg from '../assets/account.png';
import homeimg from '../assets/home.png';
import reviewimg from '../assets/movie-reel.png';
import '../components/Homecss.css';

import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import logoimg from '../assets/logo.png';
import { auth, db } from "../firebase";
import Cast from "./Cast";
import Similarm from "./Similarm";
import MovieReview from "./movieReview";
const IMAGE_API = 'https://image.tmdb.org/t/p/w500/';






export default function Movie() {
    const [review, setReview] = useState();
    const [rating, setRating] = useState();


    const location = useLocation();
    const { title, overview, poster_path, id, release_date } = location.state;
    const [showDialog, setShowDialog] = useState(false);


    const navigate = useNavigate()
    
  const handleClose = () => {
    setShowDialog(false);
    const firebaseFunction = async () => {
      let user = auth.currentUser.email;
      function generateUniqueId() {
        const timestamp = new Date().getTime();
        const randomPart = Math.floor(Math.random() * 10000);
        return `${timestamp}-${randomPart}`;
      }
      
      // Example usage:
      const uniqueId = generateUniqueId();
      console.log(uniqueId);
      const documentRefrence = collection(db, "users");

      const docData = {
        uniqueId:uniqueId,
        user: user,
        review: review,
        rating: rating,
        release_date: release_date,
        id: id,
        overview: overview,
        poster_path: poster_path,
        title: title,
      };

      try {
        await setDoc(doc(documentRefrence, uniqueId.toString()), docData); // Assuming id is a string
        console.log('Data added successfully');
      } catch (error) {
        console.error('Error adding data:', error);
      }
     
    };

    firebaseFunction();
  };
    const handleShow = () => {
        setShowDialog(true);
        console.log(auth.currentUser.email)
    }

    const clickhandel = () => {
        navigate('/Home');
    }

    const allreview=() => {   
        navigate('/allreview');
        
    }
    const profile=() => {   
        navigate('/profile');
        
    }

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
                    <Button onClick={clickhandel} style={{ marginBottom: '10px', backgroundColor: '#512B81' }}><img src={homeimg} style={{ height: '30px' }} /></Button>
                    
                    <Button onClick={allreview} style={{ marginBottom: '10px', backgroundColor: '#D4ADFC' }}><img src={reviewimg} style={{ height: '30px' }} /></Button>
                    <Button onClick={profile}  style={{ marginBottom: '10px', backgroundColor: '#D4ADFC' }}><img src={profileimg} style={{ height: '30px' }} /></Button>

                </Container>
                <Container className="containersss" style={{ width: '93%', height: '90vh', backgroundColor: '#200E3A', color: 'white', padding: '20px' }}>
                    <Row>
                        <Col style={{ margin: '10px', width: '50%' }} >
                            <img src={IMAGE_API + poster_path} />
                            <h1 style={{ marginTop: '20px', marginBottom: '20px' }}>{title}</h1>
                            <div>
                                {overview}
                                <h6 style={{ marginTop: '10px' }}>Relese date : {release_date}</h6>

                            </div>

                            <Button onClick={handleShow} style={{ marginTop: '20px', marginBottom: '20px' }}>Post Review</Button>
                            <Cast />
                            <Similarm />


                        </Col>
                        <Col>
                            <Modal show={showDialog} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{title}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <textarea placeholder="Write Your Review" style={{ width: '100%', height: '150px', border: 'none' }} onChange={(e) => setReview(e.currentTarget.value)} />
                                    Rating <input style={{ width: '40px', border: 'none' }} type="number" onChange={(e) => setRating(e.currentTarget.value)} /> outoff 5

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={handleClose}>
                                        Submit
                                    </Button>
                                    {/* Add other buttons or actions as needed */}
                                </Modal.Footer>
                            </Modal>
                            <MovieReview/>

                        </Col>
                    </Row>





                </Container>
            </Row>


        </div>
    )
}