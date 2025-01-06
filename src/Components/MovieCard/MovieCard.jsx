import React from "react";

const MovieCard = ({ movie, onClick }) => {
    return (
        <div onClick={onClick} style={{ cursor: "pointer", margin: "10px", border: "1px solid #ccc", padding: "10px" }}>
            <h3>{movie.title}</h3>
        </div>
    );
};

export default MovieCard;
