import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios for API requests
import "./MovieCard.css";

const MovieCard = ({ movie, user }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        // Check if the movie is in the user's favorites
        if (user && user.favorite_movies) {
            setIsFavorite(user.favorite_movies.includes(movie.id));
        }
    }, [movie.id, user]);

    const API_URL = "https://amy-flix-movie-app-ce4aa0da3eb4.herokuapp.com";

    const addToFavorites = async () => {
        if (!user) {
            alert("User is not authenticated!");
            return;
        }

        try {
            const response = await axios.post(
                `${API_URL}/users/${user.username}/movies/${movie.id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            setIsFavorite(true);
            alert("Movie added to favorites!");
        } catch (error) {
            console.error("Error adding movie to favorites:", error);
            alert("Failed to add to favorites.");
        }
    };

    const removeFromFavorites = async () => {
        if (!user) {
            alert("User is not authenticated!");
            return;
        }

        try {
            const response = await axios.delete(
                `${API_URL}/users/${user.username}/movies/${movie.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            setIsFavorite(false);
            alert("Movie removed from favorites.");
        } catch (error) {
            console.error("Error removing movie from favorites:", error);
            alert("Failed to remove from favorites.");
        }
    };

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
                    {isFavorite ? (
                        <button
                            className="btn btn-danger w-100 mt-2"
                            onClick={removeFromFavorites}
                        >
                            Remove from Favorites
                        </button>
                    ) : (
                        <button
                            className="btn btn-success w-100 mt-2"
                            onClick={addToFavorites}
                        >
                            Add to Favorites
                        </button>
                    )}
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
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
        favorite_movies: PropTypes.array.isRequired,
    }).isRequired,
};

export default MovieCard;
