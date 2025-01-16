import React, { useState, useEffect } from "react";
import "./MainView.css";
import MovieCard from "../MovieCard/MovieCard";
import MovieView from "../MovieView/MovieView";
import LoginView from "../LoginView/LoginView";
import SignupView from "../SignupView/SignupView";
import { Container, Row, Col, Button } from "react-bootstrap";

const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        setShowLogin(false);
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

    if (!user) {
        if (showLogin) {
            return <LoginView onLoggedIn={handleLogin} 
                            onSignupClicked={() => { setShowSignup(true); setShowLogin(false); }} />;
        }

        if (showSignup) {
            return <SignupView onSignedUp={() => { setShowLogin(true); setShowSignup(false); }} />;
        }

        return (
            <div className="auth-container">
                <h1>Welcome to Bollywood Movies</h1>
                <p>New here? Sign up to get started. Already a member? Log in!</p>
                <div className="auth-buttons">
                    <Button variant="primary" onClick={() => setShowLogin(true)}>
                        Login
                    </Button>
                    <Button variant="success" onClick={() => setShowSignup(true)}>
                        Signup
                    </Button>
                </div>
            </div>
        );
    }

    if (selectedMovie) {
        const similarMovies = movies.filter(
            (movie) => movie.genre === selectedMovie.genre && movie.id !== selectedMovie.id
        );

        return (
            <Container>
                <MovieView
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)}
                />
                <hr />
                <h2>Similar Movies</h2>
                <Row>
                    {similarMovies.map((movie) => (
                        <Col sm={6} md={4} lg={3} key={movie.id}>
                            <MovieCard
                                movie={movie}
                                onClick={() => setSelectedMovie(movie)}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }

    return (
        <Container>
            <header className="main-view-header">
                <h1>Bollywood Movies</h1>
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
            </header>
            <Row>
                {movies.map((movie) => (
                    <Col sm={6} md={4} lg={3} key={movie.id}>
                        <MovieCard
                            movie={{...movie}}
                            onClick={() => setSelectedMovie(movie)}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default MainView;
