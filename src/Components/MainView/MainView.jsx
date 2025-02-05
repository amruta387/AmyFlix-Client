import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBarView from "../NavBarView/NavBarView";
import ProfileView from "../ProfileView/ProfileView";
import MovieCard from "../MovieCard/MovieCard";
import MovieView from "../MovieView/MovieView";
import LoginView from "../LoginView/LoginView";
import SignupView from "../SignupView/SignupView";
import "./MainView.css";
import { Container, Row, Col } from "react-bootstrap";

const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
    };

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
    };

    const fetchMovies = (token) => {
        fetch("https://amy-flix-movie-app-ce4aa0da3eb4.herokuapp.com/movies", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch movies");
                }
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
            })
            .catch((error) => console.error("Error fetching movies:", error));
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchMovies(token);
        }
    }, [user]);

    const renderMovieList = () => (
        <Container>
            <Row>
                {movies.map((movie) => (
                    <Col sm={6} md={4} lg={3} key={movie.id}>
                        <MovieCard movie={movie} user={user} />
                    </Col>
                ))}
            </Row>
        </Container>
    );

    return (
        <Router>
            <NavBarView user={user} onLogout={handleLogout} />
            <Routes>
                {!user ? (
                    <>
                        <Route path="/login" element={<LoginView onLoggedIn={handleLogin} />} />
                        <Route path="/signup" element={<SignupView />} />
                        <Route path="*" element={<LoginView onLoggedIn={handleLogin} />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={renderMovieList()} />
                        <Route path="/movie/:id" element={<MovieView />} />
                        <Route path="/profile" element={<ProfileView />} />
                    </>
                )}
            </Routes>
        </Router>
    );
};

export default MainView;
