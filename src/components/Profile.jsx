import React from "react";
import { Button, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import profileimg from '../assets/account.png';
import editimg from '../assets/editing.png';
import homeimg from '../assets/home.png';
import reviewimg from '../assets/movie-reel.png';
import '../components/Homecss.css';

import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoimg from '../assets/logo.png';
import { auth, db } from '../firebase';
const IMAGE_API = 'https://image.tmdb.org/t/p/w500/';


import { Modal } from 'react-bootstrap';



export default function Profile() {







    const [review, setReview] = useState();
    const [rating, setRating] = useState();
    const [showDialog, setShowDialog] = useState(false);

    const [movies, setMovies] = useState([]);
    const location = useLocation();



    let email = auth.currentUser.email;



    useEffect(() => {
        const firebaseFunction = async () => {

            console.log(email);


            const collectionReference = collection(db, "users");
            const q = query(collectionReference, where("user", "==", email));

            try {
                const response = await getDocs(q);
                const movieList = [];

                response.forEach((user) => {

                    movieList.push(user.data());

                });



                setMovies(movieList);
            } catch (error) {
                console.error("Error fetching movies: ", error);
            }
        };

        firebaseFunction();
    }, []);

    const navigate = useNavigate()
    const clickhandel = () => {
        navigate('/Home');
        console.log(auth.currentUser.email)
    }
    const allreview = () => {
        navigate('/allreview');
        console.log(email);
    }
    const moviedetails = (userData) => {
        navigate('/Movie/' + userData.id, { state: userData })
    }
    const deletereview = (userData) => {
        const documentRefrence = doc(db, "users", userData)
        deleteDoc(documentRefrence).then(response => {
            console.log('data deleted')
        })
    }
    const handleShow = () => {
        setShowDialog(true);
        console.log(auth.currentUser.email)
    }
    const handleClose = () => {
        setShowDialog(false);
    }

    return (
        <div>
            <Navbar style={{ backgroundColor: '#5C469C' }}>
                <Container >
                    <Navbar.Brand href="#home" style={{ color: "white", fontFamily: 'Bebas Neue', fontSize: '30px' }} >
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
                    <Button onClick={clickhandel} style={{ marginBottom: '10px', backgroundColor: '#D4ADFC' }}><img src={homeimg} style={{ height: '30px' }} /></Button>
                    <Button onClick={allreview} style={{ marginBottom: '10px', backgroundColor: '#D4ADFC' }}><img src={reviewimg} style={{ height: '30px' }} /></Button>

                    <Button style={{ marginBottom: '10px', backgroundColor: '#512B81' }}><img src={profileimg} style={{ height: '30px' }} /></Button>
                </Container>
                <Container className="containersss" style={{ width: '93%', height: '90vh', backgroundColor: '#200E3A', color: 'white', padding: '20px' }}>

                    <h2 style={{ marginBottom: '20px' }}>User : {email}</h2>
                    <div className="movie-grid">



                        {movies.map((movie, index) => (
                            <div key={index} className="containersss" style={{ background: '#0F2167', marginBottom: '20px', width: '90%', padding: '15px', display: "flex", flexDirection: "column", borderRadius: '10px' }}>
                                <Row>
                                    <Container style={{ width: '70%' }}>
                                        <h6 >{movie.review}</h6>
                                        <div style={{ display: "flex", flexDirection: 'column', marginTop: '5px', alignContent: 'baseline' }}>
                                            <h5 style={{ marginRight: '10px', }}>{movie.user}</h5>
                                            <h5>User Rating : {movie.rating}</h5>

                                        </div>
                                        <div style={{ display: "flex", marginTop: '5px', alignContent: 'baseline' }}>
                                            <Button onClick={() => deletereview(movie.uniqueId)}>delete</Button>
                                            <Button onClick={handleShow}  style={{ marginRight: '10px', backgroundColor: '#D4ADFC', width: '50px' }}><img src={editimg} style={{ height: '25px' }} /></Button>
                                        </div>




                                    </Container >
                                    <Container style={{ width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img onClick={() => moviedetails(movie)} src={IMAGE_API + movie.poster_path} style={{ height: '200px' }} />

                                    </Container >

                                </Row>

                            </div>
                        ))}

                    </div>

                </Container>
                <Modal show={showDialog} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>hhh</Modal.Title>
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
                
            </Row>


        </div>
    )
}