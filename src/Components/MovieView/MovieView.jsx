import React from "react";

const MovieView = ({ movie, onBackClick }) => {
    return (
        <div style={{ padding: "20px", border: "1px solid #ccc", margin: "20px" }}>
            <h1>{movie.title}</h1>
            <img src={movie.poster} alt={`${movie.title} poster`} style={{ width: "200px" }} />
            <p><strong>Description:</strong> {movie.description}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <button onClick={onBackClick} style={{ marginTop: "20px" }}>Back</button>
        </div>
    );
};

export default MovieView;
