"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
function UpdateMovie({ params }) {
  const [movieTitle, setMovieTitle] = useState("");
  const [characterPlayed, setCharacterPlayed] = useState("");
  const [youtubeURL, setYoutubeURL] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/movieById/${parseInt(params.movieId)}`)
      .then((response) => {
        setMovieTitle(response.data.name);
        setCharacterPlayed(response.data.comicCharacterName);
        setYoutubeURL(response.data.url);
        setMovieDescription(response.data.description);
      })
      .catch((err) => {
        setError(err.response.data.detail);
      })
      .finally(setIsLoading(false));
  }, []);

  const handleUpdate = () => {
    setIsLoading(false);
    axios
      .put(`http://localhost:8000/comic/movies/${parseInt(params.movieId)}`, {
        name: movieTitle,
        comicCharacterName: characterPlayed,
        url: youtubeURL,
        description: movieDescription,
      })
      .then((response) => {})
      .catch((err) => {
        setError(err.response.data.detail);
      })
      .finally(setIsLoading(false));
  };

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: 10,
      }}
    >
      <FloatingLabel
        controlId="movieTitle"
        label="Movie Title"
        className="mb-3"
      >
        <Form.Control
          type="text"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="characterPlayed"
        label="Character Played"
        className="mb-3"
      >
        <Form.Control
          type="text"
          value={characterPlayed}
          onChange={(e) => setCharacterPlayed(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="youtubeURL"
        label="Youtube URL"
        className="mb-3"
      >
        <Form.Control
          type="text"
          value={youtubeURL}
          onChange={(e) => setYoutubeURL(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel className="mb-3" label="Movie Description">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
          value={movieDescription}
          onChange={(e) => setMovieDescription(e.target.value)}
        />
      </FloatingLabel>
      <Button variant="primary" onClick={handleUpdate}>
        Update
      </Button>
    </div>
  );
}

export default UpdateMovie;
