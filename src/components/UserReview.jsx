import React from "react";
import { Button, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import profileimg from '../assets/account.png';
import homeimg from '../assets/home.png';
import reviewimg from '../assets/movie-reel.png';
import '../components/Homecss.css';

import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoimg from '../assets/logo.png';
import star from '../assets/star.png';
import { auth, db } from '../firebase';
const IMAGE_API = 'https://image.tmdb.org/t/p/w500/';





export default function userReview() {






    const [movies, setMovies] = useState([]);
    const location = useLocation();

    const altText = 'Your Image';





    const { user, Movieid } = location.state;




    useEffect(() => {
        const firebaseFunction = async () => {

            console.log(Movieid);



            const collectionReference = collection(db, 'users');
            const q = query(collectionReference, where("user", "==", user));

            try {
                const response = await getDocs(q);
                const movieList = [];

                response.forEach((users) => {

                    movieList.push(users.data());

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

    }
    const profile = () => {
        navigate('/profile');

    }
    const moviedetails = (userData) => {
        navigate('/Movie/' + userData.id, { state: userData })
    }

    const ImageComponent = ({ imageSrc, altText }) => (
        <div>
            <img style={{ height: '20px',marginRight:'10px' }} src={imageSrc} alt={altText} />
        </div>
    );
    const PrintImages = ({ imageSrc, altText, count }) => {
        const images = [];

        for (let i = 0; i < count; i++) {
            images.push(<ImageComponent key={i} imageSrc={imageSrc} altText={`${altText} ${i + 1}`} />);
        }

        return <div style={{display:'flex'}}>{images}</div>;
    };






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
                    <Button onClick={allreview} style={{ marginBottom: '10px', backgroundColor: '#512B81' }}><img src={reviewimg} style={{ height: '30px' }} /></Button>
                    <Button onClick={profile} style={{ marginBottom: '10px', backgroundColor: '#D4ADFC' }}><img src={profileimg} style={{ height: '30px' }} /></Button>
                </Container>
                <Container className="containersss" style={{ width: '93%', height: '90vh', backgroundColor: '#200E3A', color: 'white', padding: '20px' }}>

                    <h2 style={{ marginBottom: '20px' }}>User : {user}</h2>
                    <div className="movie-grid">
                        {movies.map((movie, index) => (
                            <div key={index} className="containersss" style={{ background: '#0F2167', marginBottom: '20px', width: '90%', padding: '15px', display: "flex", flexDirection: "column", borderRadius: '10px' }}>
                                <Row>
                                    <Container style={{ width: '70%' }}>
                                        <h6 >{movie.review}</h6>
                                        <div style={{ display: "flex", flexDirection: 'column', marginTop: '5px', alignContent: 'baseline' }}>
                                            <h5 style={{ marginRight: '10px', }}>User : {movie.user}</h5>
                                            
                                            <div style={{ display: 'flex' }}>
                                                <PrintImages imageSrc={star} altText={altText} count={movie.rating} />
                                            </div>


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
            </Row>


        </div>
    )
}