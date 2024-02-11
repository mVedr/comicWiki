"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

function AddMovie({ params }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movieTitle, setMovieTitle] = useState("");
  const [characterPlayed, setCharacterPlayed] = useState("");
  const [youtubeURL, setYoutubeURL] = useState("");
  const [movieDescription, setMovieDescription] = useState("");

  const handleSubmit = () => {
    setIsLoading(true);
    if (movieTitle.length > 0 && characterPlayed.length > 0) {
      axios
        .post(`http://localhost:8000/comic/movies/${parseInt(params.id)}`, {
          name: movieTitle,
          comicCharacterName: characterPlayed,
          url: youtubeURL,
          description: movieDescription,
        })
        .then((response) => {
          setIsLoading(false);
          router.push(`/comic/profile/${parseInt(params.id)}/movies/`);
        })
        .catch((err) => {
          // Handle errors
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setError("Fill required details");
    }
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
      <Form.Group className="mb-3" controlId="movieTitle">
        <Form.Label>Movie Title</Form.Label>
        <Form.Control
          type="text"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="characterPlayed">
        <Form.Label>Character Played</Form.Label>
        <Form.Control
          type="text"
          value={characterPlayed}
          onChange={(e) => setCharacterPlayed(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="youtubeURL">
        <Form.Label>Youtube URL</Form.Label>
        <Form.Control
          type="text"
          value={youtubeURL}
          onChange={(e) => setYoutubeURL(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="movieDescription">
        <Form.Label>Movie Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
          value={movieDescription}
          onChange={(e) => setMovieDescription(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>
        Add Movie
      </Button>
    </div>
  );
}

export default AddMovie;
