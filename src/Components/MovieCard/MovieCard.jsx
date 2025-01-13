import React from "react";
import PropTypes from "prop-types";
import "./MovieCard.css";

const MovieCard = ({ movie, onClick }) => {
    return (
        <div className="movie-card" onClick={onClick}>
            <img
                src={movie.poster}
                alt={`${movie.title} poster`}
                className="movie-card-poster"
            />
            <h3 className="movie-card-title">{movie.title}</h3>
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default MovieCard;
