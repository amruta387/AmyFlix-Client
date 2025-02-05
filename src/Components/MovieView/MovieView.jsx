import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Only useParams is used here
import { Container, Row, Col, Button, Image, Spinner } from "react-bootstrap";
import "./MovieView.css";

const MovieView = () => {
    const { id } = useParams(); // Get the movie ID from the URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track error state

    useEffect(() => {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage

        if (!token) {
            setError("Authorization token is missing. Please log in again.");
            setLoading(false);
            return;
        }

        // Fetch the movie details using the ID from the URL
        fetch(`https://amy-flix-movie-app-ce4aa0da3eb4.herokuapp.com/movies/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch movie details");
                }
                return response.json();
            })
            .then((data) => {
                setMovie({
                    title: data.title,
                    description: data.genre.description,
                    poster: data.poster,
                    genre: data.genre.name,
                    director: data.director.name,
                    releaseYear: data.release_year,
                });
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                    <h3>Error</h3>
                    <p>{error}</p>
                    <a href="/" className="btn btn-primary">
                        Back
                    </a>
                </div>
            </div>
        );
    }

    return (
        <Container className="movie-view py-5">
            <Row className="justify-content-center">
                <Col md={6} className="text-center">
                    <Image src={movie.poster} alt={`${movie.title} poster`} fluid className="mb-4 shadow" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 className="text-center mb-4">{movie.title}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ul className="movie-details list-unstyled">
                        <li>
                            <strong>Description:</strong> {movie.description}
                        </li>
                        <li>
                            <strong>Genre:</strong> {movie.genre}
                        </li>
                        <li>
                            <strong>Director:</strong> {movie.director}
                        </li>
                        <li>
                            <strong>Release Year:</strong> {movie.releaseYear}
                        </li>
                    </ul>
                </Col>
            </Row>
            <Row className="justify-content-center mt-4">
                <Col md={3} className="text-center">
                    {/* Use a simple anchor tag to navigate back */}
                    <a href="/" className="btn btn-primary">
                        Back
                    </a>
                </Col>
            </Row>
        </Container>
    );
};

export default MovieView;
