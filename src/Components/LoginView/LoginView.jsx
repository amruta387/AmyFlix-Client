import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Spinner, Container } from "react-bootstrap";
import "./LoginView.css";

const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                "https://amy-flix-movie-app-ce4aa0da3eb4.herokuapp.com/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                }
            );
            const data = await response.json();
            
            if (data.token) {
                // Create a complete user object with favorite movies
                const userObject = {
                    username: username,
                    token: data.token,
                    favorite_movies: data.user?.favorite_movies || []
                };

                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(userObject));
                onLoggedIn(userObject);
            } else {
                setError("Invalid credentials. Please try again.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="login-view-container mt-5">
            <h2 className="text-center">Login to AmyFlix</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="loginUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        aria-label="Username"
                    />
                </Form.Group>
                <Form.Group controlId="loginPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-label="Password"
                    />
                </Form.Group>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                <div className="text-center mt-4">
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : "Log In"}
                    </Button>
                </div>
            </Form>
            <p className="text-center mt-3">
                Don't have an account?{" "}
                <span
                    onClick={() => navigate("/signup")}
                    className="toggle-link"
                    tabIndex={0}
                >
                    Sign Up
                </span>
            </p>
        </Container>
    );
};

export default LoginView;
