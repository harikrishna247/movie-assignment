import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("/api/movies");
      const data = await response.json();
      setMovies(data);
    }

    getData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Movies ({movies.length})</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>{movie.title}</h3>
            <p>
              <strong>Tagline:</strong>{" "}
              {movie.tagline || "No tagline available"}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average}/10
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;