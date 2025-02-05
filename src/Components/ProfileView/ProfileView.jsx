import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';  
import './ProfileView.css';

const API_URL = "https://amy-flix-movie-app-ce4aa0da3eb4.herokuapp.com";

const ProfileView = () => {
    const token = localStorage.getItem('token'); 
    const [user, setUser] = useState(null);
    const [movies, setMovies] = useState([]); 
    const [favoriteMovies, setFavoriteMovies] = useState([]); 

    const [newUserData, setNewUserData] = useState({
        name: '',
        email: '',
        birthday: '',
    });

    useEffect(() => {
        if (!token) return;

        axios.get(`${API_URL}/movies`, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => console.error("Error fetching movies:", error));

        axios.get(`${API_URL}/users/me`, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                setUser(response.data);
                setNewUserData({
                    name: response.data.name || '',
                    email: response.data.email || '',
                    birthday: response.data.birthday || '',
                });

                localStorage.setItem("user", JSON.stringify(response.data));
            })
            .catch(error => console.error("Error fetching user data:", error));

    }, []);  

    useEffect(() => {
        if (user?.favorite_movies) {
            setFavoriteMovies(movies.filter(m => user.favorite_movies.includes(m._id)));
        }
    }, [user, movies]);  

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        axios.put(`${API_URL}/users/${user.username}`, newUserData, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
            setUser(response.data);
            alert("Profile updated successfully!");
            localStorage.setItem("user", JSON.stringify(response.data));
        })
        .catch(error => {
            console.error("Error updating profile", error);
            alert("Failed to update profile.");
        });
    };

    const handleDeleteProfile = () => {
        axios.delete(`${API_URL}/users/${user.username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
            alert("Profile deleted successfully");
            localStorage.clear();
            window.location.href = "/signup";
        })
        .catch(error => console.error("Error deleting profile", error));
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
            <div className="profile-box">
                <h2>User Information</h2>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Birthday:</strong> {user.birthday ? new Date(user.birthday).toLocaleDateString() : "N/A"}</p>
                <button className="delete-button" onClick={handleDeleteProfile}>Delete Profile</button>
            </div>

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

            <div className="favorite-movies-container">
                <h2>Your Favorite Movies</h2>
                <div className="favorite-movies-list">
                    {favoriteMovies.length > 0 ? (
                        favoriteMovies.map(movie => (
                            <MovieCard key={movie._id} movie={movie} user={user} setUser={setUser} />
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
