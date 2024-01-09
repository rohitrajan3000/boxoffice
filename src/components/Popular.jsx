import { default as React, useState } from "react";
import { Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import '../components/Homecss.css';

import axios from "axios";
import { useEffect } from "react";


const MOVIE_API = 'https://api.themoviedb.org/3/movie/popular?api_key=dd2e28b6c8ff10c5a8a9521272e2cad9&language=en-US&page=1' ;
const IMAGE_API = 'https://image.tmdb.org/t/p/w500/';


export default function Popular(){
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(MOVIE_API).then((resp) => {
            setMovies(resp.data.results)
        })

    }, []);
    const clickhandel = (movie) => {

        navigate('/Movie/' + movie.id, { state: movie });

    }
    return(
        <div>
             <div>
                        <h3>Popular</h3>
                        <div className="containers">
                            {movies.map(movie => {

                                const id = movie.id;
                                return (
                                    <div key={movie.id} >

                                        <Card onClick={() => clickhandel(movie)} style={{ width: '12rem', padding: 5, height: 330, margin: 10, backgroundColor: '#0F2167', color: 'white' }}>

                                            <Card.Img src={IMAGE_API + movie.poster_path} height={250} ></Card.Img>
                                            <Card.Title>{movie.title}</Card.Title>

                                        </Card>

                                    </div>
                                )
                            })}
                        </div>

                    </div>
        </div>
    )
}