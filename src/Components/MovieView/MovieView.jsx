import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import "./MovieView.css";

const MovieView = ({ movie, onBackClick }) => {
    return (
        <Container className="movie-view">
            <Row className="justify-content-center">
                <Col md={6} className="text-center">
                    <Image src={movie.poster} alt={`${movie.title} poster`} fluid className="mb-4" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 className="text-center mb-4">{movie.title}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ul className="movie-details">
                        <li><strong>Description:</strong> {movie.description}</li>
                        <li><strong>Genre:</strong> {movie.genre}</li>
                        <li><strong>Director:</strong> {movie.director}</li>
                        <li><strong>Release Year:</strong> {movie.releaseYear}</li>
                    </ul>
                </Col>
            </Row>
            <Row className="justify-content-center mt-4">
                <Col md={3} className="text-center">
                    <Button variant="primary" onClick={onBackClick}>Back</Button>
                </Col>
            </Row>
        </Container>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        releaseYear: PropTypes.string.isRequired, // Add releaseYear to the shape
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
