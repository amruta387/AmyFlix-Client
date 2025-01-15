import React, { useState, useEffect } from "react";
import "./MainView.css";
import MovieCard from "../MovieCard/MovieCard";
import MovieView from "../MovieView/MovieView";
import LoginView from "../LoginView/LoginView";
import SignupView from "../SignupView/SignupView";

const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    // Handle login
    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        setShowLogin(false); // Hide the login view after successful login
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
    };

    // Fetch movies
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

    // Non-authenticated view with Login and Signup buttons
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
                    <button className="auth-button" onClick={() => setShowLogin(true)}>
                        Login
                    </button>
                    <button className="auth-button signup-button" onClick={() => setShowSignup(true)}>
                        Signup
                    </button>
                </div>
            </div>
        );
    }

    // Authenticated user view
    if (selectedMovie) {
        const similarMovies = movies.filter(
            (movie) => movie.genre === selectedMovie.genre && movie.id !== selectedMovie.id
        );

        return (
            <div className="movie-view-container">
                <MovieView
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)}
                />
                <hr />
                <h2 className="similar-movies-heading">Similar Movies</h2>
                <div className="similar-movies-grid">
                    {similarMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onClick={() => setSelectedMovie(movie)}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="main-view-container">
            <header className="main-view-header">
                <h1>Bollywood Movies</h1>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </header>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onClick={() => setSelectedMovie(movie)}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainView;