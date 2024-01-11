import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../components/Homecss.css';
import { db } from "../firebase";

export default function MovieReview() {
    const [movies, setMovies] = useState([]);
    const location = useLocation();
    const {id} = location.state;

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

    return (
        <div style={{padding:'20px'}}>
            <h2>Movie Review</h2>

            {movies.map((movie, index) => (

                <div key={index} className="containersss" style={{ background: '#0F2167',marginBottom:'20px', width: '95%',padding:'15px',display:"flex",justifyContent:'inherit',alignItems:'center',flexDirection:"column", borderRadius:'10px' }}>
                    <h6 >{movie.review}</h6>
                    <div style={{display:"flex",justifyContent:'end',marginTop:'5px',alignContent:'baseline'}}>
                        <h5 style={{marginRight:'70px'}}>{movie.user}</h5>
                        <h5>User Rating : {movie.rating}</h5>
                    </div>
                </div>

            ))}

        </div>
    );
}
