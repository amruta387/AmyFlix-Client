import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import "./MovieCard.css";

const MovieCard = ({ movie, onClick }) => {
    return (
        <Card className="movie-card h-100">
            <Card.Img variant="top" src={movie.poster} alt={`${movie.title} poster`} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Button variant="primary" onClick={onClick} className="view-details-btn">
                    View Details
                </Button>
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
    onClick: PropTypes.func.isRequired,
};

export default MovieCard;
