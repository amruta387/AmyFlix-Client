import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBarView from "../NavBarView/NavBarView";
import ProfileView from "../ProfileView/ProfileView";
import MovieCard from "../MovieCard/MovieCard";
import MovieView from "../MovieView/MovieView";
import LoginView from "../LoginView/LoginView";
import SignupView from "../SignupView/SignupView";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./MainView.css";

const API_URL = "https://amy-flix-movie-app-ce4aa0da3eb4.herokuapp.com";

const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("All");

    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
    };

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
    };

    // Fetch all movies
    const fetchMovies = (token) => {
        fetch(`${API_URL}/movies`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch movies");
                return response.json();
            })
            .then((data) => {
                const transformedMovies = data.map((movie) => ({
                    id: movie._id,
                    title: movie.title,
                    description: movie.genre.description,
                    poster: movie.poster,
                    genre: movie.genre.name,
                    director: movie.director.name,
                    releaseYear: movie.release_year,
                }));
                setMovies(transformedMovies);
                setFilteredMovies(transformedMovies);

                // Extract unique genres
                const uniqueGenres = [...new Set(transformedMovies.map((movie) => movie.genre))];
                setGenres(uniqueGenres);
            })
            .catch((error) => console.error("Error fetching movies:", error));
    };

    // Filter movies by selected genre
    const handleGenreChange = (event) => {
        const selectedGenre = event.target.value;
        setSelectedGenre(selectedGenre);

        if (selectedGenre === "All") {
            setFilteredMovies(movies);
        } else {
            const filtered = movies.filter((movie) => movie.genre === selectedGenre);
            setFilteredMovies(filtered);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchMovies(token);
        }
    }, [user]);

    return (
        <Router>
            <NavBarView user={user} onLogout={handleLogout} />
            <Container className="mt-4">
                {/* Genre Filter Dropdown */}
                {user && (
                    <Form.Group controlId="genreFilter" className="mb-3">
                        <Form.Label>Sort by Genre:</Form.Label>
                        <Form.Control as="select" value={selectedGenre} onChange={handleGenreChange}>
                            <option value="All">All Genres</option>
                            {genres.map((genre, index) => (
                                <option key={index} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                )}

                <Routes>
                    {!user ? (
                        <>
                            <Route path="/login" element={<LoginView onLoggedIn={handleLogin} />} />
                            <Route path="/signup" element={<SignupView />} />
                            <Route path="*" element={<LoginView onLoggedIn={handleLogin} />} />
                        </>
                    ) : (
                        <>
                            <Route
                                path="/"
                                element={
                                    <Row>
                                        {filteredMovies.length > 0 ? (
                                            filteredMovies.map((movie) => (
                                                <Col sm={6} md={4} lg={3} key={movie.id}>
                                                    <MovieCard movie={movie} user={user} />
                                                </Col>
                                            ))
                                        ) : (
                                            <p className="text-center">No movies found.</p>
                                        )}
                                    </Row>
                                }
                            />
                            <Route path="/movie/:id" element={<MovieView />} />
                            <Route path="/profile" element={<ProfileView />} />
                        </>
                    )}
                </Routes>
            </Container>
        </Router>
    );
};

export default MainView;
