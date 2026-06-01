const express = require("express");
const path = require("path");
const movies = require("./movies_metadata.json");

const app = express();

// Test route
app.get("/api/ping", (req, res) => {
  res.send("pong!");
});

// Get all movies
app.get("/api/movies", (req, res) => {
  res.json(movies);
});

// Get movie by ID
app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find(
    (m) => m.id === parseInt(req.params.id)
  );

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found"
    });
  }

  res.json(movie);
});

// Express port-switching logic
let port;

if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;

  app.use(express.static(path.join(__dirname, "../build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../build", "index.html")
    );
  });
} else {
  port = 3001;
}

const listener = app.listen(port, () => {
  console.log(
    `Express server is running on port ${listener.address().port}`
  );
});