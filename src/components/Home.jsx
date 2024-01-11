import React from "react";
import { Button, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import profileimg from '../assets/account.png';
import homeimg from '../assets/home.png';
import reviewimg from '../assets/movie-reel.png';
import '../components/Homecss.css';

import { useNavigate } from "react-router-dom";
import logoimg from '../assets/logo.png';
import { auth } from '../firebase';
import NowPlaying from "./NowPlaying";
import Popular from "./Popular";
import Toprated from "./Toprated";
import Upcoming from "./Upcoming";





export default function Home() {
    const navigate = useNavigate()
    const clickhandel=() => {   
        navigate('/Home');
        console.log(auth.currentUser.email)
    }
    const allreview=() => {   
        navigate('/allreview');
        
    }
    const profile=() => {   
        navigate('/profile');
        
    }



    return (
        <div>
            <Navbar style={{ backgroundColor: '#5C469C'}}>
                <Container >
                    <Navbar.Brand href="#home" style={{color: "white",fontFamily:'Bebas Neue', fontSize:'30px'}} >
                        <img
                            alt=""
                            src={logoimg}
                            width="50"
                            height="40"
                            className="d-inline-block align-top"
                        />{' '}
                        BOXOFFICE
                        
                       
                    </Navbar.Brand>
                    <Button style={{ backgroundColor: '#D4ADFC',color:'black' }} onClick={() => navigate('/login')} className='Logout-btn'>Logout</Button>
                </Container>

            </Navbar>
            <Row>
                <Container style={{ width: '7%',height:'90vh', backgroundColor: '#0F2167', color: 'white', padding: '20px' }}>
                    <Button onClick={clickhandel} style={{ marginBottom: '10px', backgroundColor: '#512B81' }}><img src={homeimg} style={{ height: '30px' }} /></Button>
                    <Button onClick={allreview} style={{ marginBottom: '10px', backgroundColor: '#D4ADFC' }}><img src={reviewimg} style={{ height: '30px' }} /></Button>

                    <Button onClick={profile} style={{ marginBottom: '10px', backgroundColor: '#D4ADFC' }}><img src={profileimg} style={{ height: '30px' }} /></Button>
                </Container>
                <Container className="containersss"   style={{ width: '93%',height:'90vh',  backgroundColor: '#200E3A', color: 'white', padding: '20px' }}>
                   <NowPlaying/>
                   <Toprated/>
                   <Upcoming/>
                   <Popular/>
                  
                

                </Container>
            </Row>


        </div>
    )
}