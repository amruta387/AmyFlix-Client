import React, { useState } from "react";
import "./SignupView.css";

const SignupView = ({ onSignedUp }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("https://amy-flix-movie-app-ce4aa0da3eb4.herokuapp.com/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, email, name, birthday }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Signup failed");
                }
                return response.json();
            })
            .then(() => {
                alert("Signup successful! Please log in.");
                onSignedUp();
            })
            .catch((error) => console.error("Error signing up:", error));
    };

    return (
        <div className="signup-view-container">
            <h2>Registration</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username *</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password *</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="birthday">Birthday *</label>
                    <input
                        type="date"
                        id="birthday"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="signup-button">
                    Sign Up
                </button>
                <p className="toggle-form">
                    Already have an account?{" "}
                    <span onClick={onSignedUp} className="toggle-link">
                        Log In
                    </span>
                </p>
            </form>
        </div>
    );
};

export default SignupView;
