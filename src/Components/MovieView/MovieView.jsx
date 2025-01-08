import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
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

MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
