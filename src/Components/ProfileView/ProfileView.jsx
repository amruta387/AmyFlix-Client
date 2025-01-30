import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';  // Import the MovieCard component
import './ProfileView.css';

const API_URL = "https://amy-flix-movie-app-ce4aa0da3eb4.herokuapp.com";

const ProfileView = () => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const [user, setUser] = useState(null);
    const [newUserData, setNewUserData] = useState({
        name: '',
        email: '',
        birthday: '',
    });
    const [movies, setMovies] = useState([]); // Store all movies
    const [favoriteMovies, setFavoriteMovies] = useState([]); // Store filtered favorite movies

    useEffect(() => {
        // Fetch logged-in user data
        axios.get(`${API_URL}/users/me`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setUser(response.data);
                setNewUserData({
                    name: response.data.name || '',
                    email: response.data.email || '',
                    birthday: response.data.birthday || '',
                });

                // Filter favorite movies based on user's favorite movie IDs
                if (response.data.favorite_movies && movies.length > 0) {
                    const favoriteMoviesList = movies.filter(m =>
                        response.data.favorite_movies.includes(m._id)
                    );
                    setFavoriteMovies(favoriteMoviesList);
                }
            })
            .catch(error => {
                console.error("Error fetching user data", error);
            });

        // Fetch all movies
        axios.get(`${API_URL}/movies`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setMovies(response.data);  // Store all movies
            })
            .catch(error => {
                console.error("Error fetching movies data", error);
            });
    }, [movies.length]);  // Depend on the movies state to re-fetch

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        axios.put(`${API_URL}/users/${user.username}`, newUserData, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setUser(response.data);
                alert("Profile updated successfully!");
            })
            .catch(error => {
                console.error("Error updating profile", error);
                alert("Failed to update profile.");
            });
    };

    const handleDeleteProfile = () => {
        axios.delete(`${API_URL}/users/${user.username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                alert("Profile deleted successfully");
                localStorage.clear();
                window.location.href = "/signup";
            })
            .catch(error => {
                console.error("Error deleting profile", error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUserData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    if (!user) return <p>Loading user data...</p>;

    return (
        <div className="profile-container">
            {/* User Info Display */}
            <div className="profile-box">
                <h2>User Information</h2>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Birthday:</strong> {user.birthday ? new Date(user.birthday).toLocaleDateString() : "N/A"}</p>
                <button className="delete-button" onClick={handleDeleteProfile}>Delete Profile</button>
            </div>

            {/* Update Profile Form */}
            <div className="profile-box">
                <h2>Update Profile</h2>
                <form onSubmit={handleUpdateProfile}>
                    <label>Name:</label>
                    <input type="text" name="name" value={newUserData.name} onChange={handleChange} />

                    <label>Email:</label>
                    <input type="email" name="email" value={newUserData.email} onChange={handleChange} />

                    <label>Birthday:</label>
                    <input type="date" name="birthday" value={newUserData.birthday} onChange={handleChange} />

                    <button type="submit">Save Changes</button>
                </form>
            </div>

            {/* Display Favorite Movies */}
            <div className="favorite-movies-container">
                <h2>Your Favorite Movies</h2>
                <div className="favorite-movies-list">
                    {favoriteMovies.length > 0 ? (
                        favoriteMovies.map(movie => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))
                    ) : (
                        <p>You have no favorite movies yet.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default ProfileView;
