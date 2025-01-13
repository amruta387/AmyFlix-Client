import React, { useState } from "react";
import "./LoginView.css";

const LoginView = ({ onLoggedIn, onSignupClicked }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();

        fetch("https://amy-flix-movie-app-ce4aa0da3eb4.herokuapp.com/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data); // Notify parent about successful login
                } else {
                    setError("Invalid credentials. Please try again.");
                }
            })
            .catch((error) => {
                setError("Something went wrong. Please try again later.");
                console.error("Error logging in:", error);
            });
    };

    return (
        <div className="login-view-container">
            <h2>Login to AmyFlix</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Log In</button>
            </form>
            
        </div>
    );
};

export default LoginView;
