import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import star from '../assets/star.png';
import '../components/Homecss.css';

import { db } from "../firebase";

export default function MovieReview() {
    const [movies, setMovies] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state;
    const altText = 'Your Image';

    useEffect(() => {
        const firebaseFunction = async () => {
            const collectionReference = collection(db, "users");
            const q = query(collectionReference, where("id", "==", id));

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



    const ImageComponent = ({ imageSrc, altText }) => (
        <div>
            <img style={{ height: '20px', marginRight: '10px' }} src={imageSrc} alt={altText} />
        </div>
    );
    const PrintImages = ({ imageSrc, altText, count }) => {
        const images = [];

        for (let i = 0; i < count; i++) {
            images.push(<ImageComponent key={i} imageSrc={imageSrc} altText={`${altText} ${i + 1}`} />);
        }

        return <div style={{ display: 'flex' }}>{images}</div>;
    };

    const handleUserClick = (userData) => {
        navigate('/userReview', { state: userData });
        
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Movie Review</h2>

            {movies.map((movie, index) => (

                <div key={index} className="containersss" style={{ background: '#0F2167', width: '95%', padding: '15px', display: "flex", justifyContent:'center', flexDirection: "column", borderRadius: '10px' }}>
                    <h6 >{movie.review}</h6>
                    <div style={{ display: "flex",flexDirection:'column', justifyContent: 'center', marginTop: '5px' }}>
                        <h5 onClick={() => handleUserClick( movie)}  style={{ marginRight: '70px',cursor:'pointer' }}>User : <i>{movie.user}</i></h5>
                       
                        <div >
                            <PrintImages imageSrc={star} altText={altText} count={movie.rating} />
                        </div>

                    </div>
                </div>

            ))}

        </div>
    );
}
