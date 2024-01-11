import React from "react";
import { Button, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import profileimg from '../assets/account.png';
import homeimg from '../assets/home.png';
import reviewimg from '../assets/movie-reel.png';
import '../components/Homecss.css';

import { doc, updateDoc } from 'firebase/firestore';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoimg from '../assets/logo.png';
import { auth, db } from '../firebase';






export default function Edit() {
    const navigate = useNavigate()

    const [reviews, setReview] = useState();
    const [ratings, setRating] = useState();

    const location = useLocation();

    const { title, review,uniqueId } = location.state;



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

    const edit = () => {
        console.log(uniqueId)
        async function editDataInFirestore(collectionName, documentId, newData) {
            const documentRef = doc(db, collectionName, documentId);

            try {
                await updateDoc(documentRef, newData);
                console.log('Data updated successfully');
            } catch (error) {
                console.error('Error updating data:', error);
            }
        }

        // Example usage:
        const collectionName = 'users'; // Replace with your collection name
        const documentId = uniqueId ; // Replace with the document ID you want to edit
        const newData = {
            // Replace with the fields you want to update and their new values
           review :reviews,
           rating : ratings,
        };

        editDataInFirestore(collectionName, documentId, newData);

        navigate('/profile')

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

                    <Button onClick={profile} style={{ marginBottom: '10px', backgroundColor: '#512B81' }}><img src={profileimg} style={{ height: '30px' }} /></Button>
                </Container>
                <Container className="containersss" style={{ width: '93%', height: '90vh', backgroundColor: '#200E3A', color: 'white', padding: '20px' }}>
                    <h1>{title}</h1>
                    <textarea style={{ height: '370px', width: '95%', backgroundColor: '#0F2167', color: 'white', padding: '20px', border: 'none', borderRadius: '10px' }} onChange={(e) => setReview(e.currentTarget.value)}>{review}</textarea>
                    <h2>Rating : <input style={{ width: '7%', backgroundColor: '#0F2167', color: 'white', padding: '5px', border: 'none', borderRadius: '10px' }} type="number" onChange={(e) => setRating(e.currentTarget.value)}  ></input> </h2>
                    <Button onClick={edit} style={{ backgroundColor: '#512B81' }}>Update</Button>


                </Container>
            </Row>


        </div>
    )
}