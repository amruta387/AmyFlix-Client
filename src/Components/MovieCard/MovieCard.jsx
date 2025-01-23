import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
    return (
        <Card className="movie-card h-100 shadow-sm">
            <Card.Img
                variant="top"
                src={movie.poster}
                alt={`${movie.title} poster`}
                className="movie-poster"
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="text-center">{movie.title}</Card.Title>
                <div className="mt-auto">
                    <Link to={`/movie/${movie.id}`} className="btn btn-primary w-100">
                        View Details
                    </Link>
                    
                </div>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
    }).isRequired,
};

export default MovieCard;
