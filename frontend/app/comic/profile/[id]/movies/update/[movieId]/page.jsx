"use client"
import React, { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

function UpdateMovie() {
  const [movieTitle, setMovieTitle] = useState("");
  const [characterPlayed, setCharacterPlayed] = useState("");
  const [youtubeURL, setYoutubeURL] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  
  const handleUpdate = () => {
    // Perform update logic here
    console.log("Movie Title:", movieTitle);
    console.log("Character Played:", characterPlayed);
    console.log("Youtube URL:", youtubeURL);
    console.log("Movie Description:", movieDescription);
  };

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
      <FloatingLabel controlId="youtubeURL" label="Youtube URL" className="mb-3">
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
