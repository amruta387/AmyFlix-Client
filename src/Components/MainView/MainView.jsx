import React, { useState, useEffect } from "react";
import "./MainView.css"; 
import MovieCard from "../MovieCard/MovieCard";
import MovieView from "../MovieView/MovieView";

const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://amy-flix-movie-app-ce4aa0da3eb4.herokuapp.com/movies")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch movies");
                }
                return response.json();
            })
            .then((data) => {
                const transformedMovies = data.map((movie) => ({
                    id: movie._id,
                    title: movie.title,
                    description: movie.genre.description,
                    poster: movie.poster,
                    genre: movie.genre.name,
                    director: movie.director.name,
                }));
                setMovies(transformedMovies);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    }, []);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    return (
        <div className="main-view-container">
            <h1>Bollywood Movies</h1>
            <div className="movies-grid">
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
