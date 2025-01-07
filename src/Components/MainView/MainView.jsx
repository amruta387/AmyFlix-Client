import React, { useState } from "react";
import "./MainView.css";
import MovieCard from "../MovieCard/MovieCard";
import MovieView from "../MovieView/MovieView";

const MainView = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);

    const movies = [
        {
            id: 1,
            title: "Jawan",
            description: "A man with a mission confronts his past as he takes on a journey of redemption and justice.",
            poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/igPVDl7X2WNYBnvnC0O0oQKXSpF.jpg",
            genre: "Action, Drama",
            director: "Atlee Kumar",
        },
        {
            id: 2,
            title: "Rocky Aur Rani Kii Prem Kahaani",
            description: "A quirky love story where opposites attract, navigating family dynamics and personal growth.",
            poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/fFWTc3o5gO3Heq6nPqOnjOaOBvv.jpg",
            genre: "Romantic Comedy, Drama",
            director: "Karan Johar",
        },
        {
            id: 3,
            title: "Pathaan",
            description: "An exiled RAW agent joins forces with his team to save India from a dangerous threat.",
            poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/kGgB1AiOogVfAmMokukr9kIJZCJ.jpg",
            genre: "Action, Thriller",
            director: "Siddharth Anand",
        },
    ];
    

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    return (
        <div>
            <h1 className="main-view-title">Bollywood Movies</h1>
            <div className="main-view-container">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onClick={() => setSelectedMovie(movie)}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainView;
