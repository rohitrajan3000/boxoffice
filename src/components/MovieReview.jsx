import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase";

export default function MovieReview() {
    const [movies, setMovies] = useState([]);
    const location = useLocation();
    const {id} = location.state;

    useEffect(() => {
        const firebaseFunction = async () => {
            const collectionReference = collection(db, "users");
            const q = query(collectionReference, where("Movieid", "==", id));

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
        <div>
            <h1>Movie Review</h1>

            {movies.map((movie, index) => (

                <div  className="containerrrrr" style={{ background: '#0F2167', height: '150px', margin: '5px', width: '95%',padding:'20px',display:"flex",justifyContent:'center',alignItems:'center',flexDirection:"column", borderRadius:'10px', overflow: "scroll" }}>
                    <h6>{movie.review}</h6>
                    <div style={{display:"flex",justifyContent:"center",marginTop:'5px'}}>
                        <h5 style={{marginRight:'90px'}}>{movie.user}</h5>
                        <h5>User Rating : {movie.rating}</h5>
                    </div>
                </div>

            ))}

        </div>
    );
}
