import React from "react";
import "./MovieView.css";

const MovieView = ({ movie, onBackClick }) => {
    return (
        <div className="movie-view">
            <h1>{movie.title}</h1>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <p><strong>Description:</strong> {movie.description}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};

export default MovieView;
