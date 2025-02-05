import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MovieCard.css";

const API_URL = "https://amy-flix-movie-app-ce4aa0da3eb4.herokuapp.com";

const MovieCard = ({ movie, user, showFavoriteButton = true, isInProfileView = false }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (user?.favorite_movies) {
            setIsFavorite(user.favorite_movies.includes(movie.id));
        }
    }, [user?.favorite_movies, movie.id]);

    const addToFavorites = async () => {
        if (!showFavoriteButton) return;

        const token = localStorage.getItem("token");
        if (!token) {
            alert("No authentication token found. Please log in again.");
            return;
        }

        try {
            await axios.post(
                `${API_URL}/users/${user.username}/movies/${movie.id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setIsFavorite(true);

            const currentUser = JSON.parse(localStorage.getItem("user"));
            const updatedUser = {
                ...currentUser,
                favorite_movies: [...currentUser.favorite_movies, movie.id]
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));

            alert("Movie added to favorites!");
        } catch (error) {
            console.error("Error adding movie to favorites:", error);
            alert("Failed to add to favorites.");
        }
    };

    const removeFromFavorites = async () => {
        if (!showFavoriteButton) return;

        const token = localStorage.getItem("token");
        if (!token) {
            alert("No authentication token found. Please log in again.");
            return;
        }

        try {
            await axios.delete(
                `${API_URL}/users/${user.username}/movies/${movie.id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setIsFavorite(false);

            const currentUser = JSON.parse(localStorage.getItem("user"));
            const updatedUser = {
                ...currentUser,
                favorite_movies: currentUser.favorite_movies.filter(id => id !== movie.id)
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));

            alert("Movie removed from favorites.");
        } catch (error) {
            console.error("Error removing movie from favorites:", error);
            alert("Failed to remove from favorites.");
        }
    };

    return (
        <Card className="movie-card h-100 shadow-sm">
            <Card.Img variant="top" src={movie.poster} alt={`${movie.title} poster`} className="movie-poster" />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="text-center">{movie.title}</Card.Title>
                <div className="mt-auto">
                    {/* Only show "View Details" button if not in ProfileView */}
                    {!isInProfileView && (
                        <Link to={`/movie/${movie.id}`} className="btn btn-primary w-100">
                            View Details
                        </Link>
                    )}

                    {/* Show Add to Favorites or Remove from Favorites button */}
                    {showFavoriteButton && (
                        isFavorite ? (
                            <button className="btn btn-danger w-100 mt-2" onClick={removeFromFavorites}>
                                Remove from Favorites
                            </button>
                        ) : (
                            <button className="btn btn-success w-100 mt-2" onClick={addToFavorites}>
                                Add to Favorites
                            </button>
                        )
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
        favorite_movies: PropTypes.array.isRequired,
    }).isRequired,
    showFavoriteButton: PropTypes.bool,
    isInProfileView: PropTypes.bool // Prop to control the visibility of "View Details" button
};

export default MovieCard;
