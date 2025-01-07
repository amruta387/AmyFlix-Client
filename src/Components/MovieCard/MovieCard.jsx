import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movie, onClick }) => {
    return (
        <div className="movie-card" onClick={onClick}>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
        </div>
    );
};

export default MovieCard;
