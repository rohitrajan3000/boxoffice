import { default as React, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";


const IMAGE_API = 'https://image.tmdb.org/t/p/w500/';

export default function Similarm() {

    const [casts, setCasts] = useState([]);
    const location = useLocation();
    const { id } = location.state;
    const navigate = useNavigate();

    useEffect(() => {
        const apiKey = 'dd2e28b6c8ff10c5a8a9521272e2cad9'; 



        fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then((data) => {
                setCasts(data.results);
            })
            .catch((error) => {
                console.error('There was a problem fetching the data: ', error);

            });
    }, []);
    const clickhandel = (movie) => {

        navigate('/Movie/' + movie.id, { state: movie });
        window.location.reload();

    }
    return (

        <div >
            <h2 style={{marginTop:'20px'}}>Similar Movies</h2>
            <div className="containers">
            {casts.map((movie) => (
                     <div key={movie.id} >

                     <Card onClick={() => clickhandel(movie)}   style={{ width: '11rem', padding: 2, height: 330, margin:4, backgroundColor: '#0F2167', color: 'white' }}>

                     <Card.Img src={IMAGE_API + movie.poster_path} height={240} ></Card.Img>
                        
                         <Card.Title>{movie.title}</Card.Title>

                     </Card>

                 </div>

                   
                ))}

            </div>
            
                


        </div>
        
    )
}