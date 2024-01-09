import { default as React, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";


const IMAGE_API = 'https://image.tmdb.org/t/p/w500/';

export default function Cast() {

    const [cast, setCast] = useState([]);
    const location = useLocation();
    const { id } = location.state;

    useEffect(() => {
        const apiKey = 'dd2e28b6c8ff10c5a8a9521272e2cad9'; // Replace with your TMDb API key


        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then((data) => {
                setCast(data.cast);
            })
            .catch((error) => {
                console.error('There was a problem fetching the data: ', error);
            });
    }, []);
    return (

        <div >
            <h2>Cast & Crew</h2>
            <div className="containers">
            {cast.map((member) => (
                     <div key={member.id} >

                     <Card  style={{ width: '7rem', padding: 2, height: 190, margin:4, backgroundColor: '#0F2167', color: 'white' }}>

                         <Card.Img src={IMAGE_API + member.profile_path} height={100} ></Card.Img>
                         <Card.Title>{member.name}</Card.Title>

                     </Card>

                 </div>

                   
                ))}

            </div>
            
                


        </div>
        
    )
}