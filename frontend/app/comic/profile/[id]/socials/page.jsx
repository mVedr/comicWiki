"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

function Socials({ params }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [instaUrl, setInstaUrl] = useState("");
  const [wikifeetUrl, setWikifeetUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [onlyFansUrl, setOnlyFansUrl] = useState("");
  const [wikifeetScore, setWikifeetScore] = useState(0);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/comics/${parseInt(params.id)}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        setInstaUrl(res.data.instaUrl);
        setWikifeetUrl(res.data.wikifeetUrl);
        setTwitterUrl(res.data.twitterUrl);
        setWikifeetScore(res.data.wikifeetScore);
        setYoutubeUrl(res.data.youtubeUrl);
        setOnlyFansUrl(res.data.onlyFansUrl);
      })
      .catch((err) => {
        setError(err.response.data.detail);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleUpdate = () => {
    setIsLoading(true);
    axios
      .put(`http://localhost:8000/comics/${parseInt(params.id)}`, {
        name: data.name,
        dob: data.dob,
        desc: data.desc,
        age: data.age,
        isAlive: data.isAlive,
        dod: data.dod,
        twitterUrl: twitterUrl,
        instaUrl: instaUrl,
        youtubeUrl: youtubeUrl,
        wikifeetUrl: wikifeetUrl,
        onlyFansUrl: onlyFansUrl,
        wikifeetScore: wikifeetScore.toString(),
      })
      .then((response) => {})
      .catch((err) => {
        setError(err.response.data.detail);
      })
      .finally(() => setIsLoading(false));
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
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <FloatingLabel
        label="YouTube URL" // Label for the YouTube URL field
        style={{
          margin: 4,
        }}
      >
        <Form.Control
          type="text"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)} // Update YouTube URL state
        />
      </FloatingLabel>

      <FloatingLabel
        label="Instagram URL"
        style={{
          margin: 4,
        }}
      >
        <Form.Control
          type="text"
          value={instaUrl}
          onChange={(e) => setInstaUrl(e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel
        label="Twitter URL" // Label for the YouTube URL field
        style={{
          margin: 4,
        }}
      >
        <Form.Control
          type="text"
          value={twitterUrl}
          onChange={(e) => setTwitterUrl(e.target.value)} // Update YouTube URL state
        />
      </FloatingLabel>

      <FloatingLabel
        label="Wikifeet URL"
        style={{
          margin: 4,
        }}
      >
        <Form.Control
          type="text"
          value={wikifeetUrl}
          onChange={(e) => setWikifeetUrl(e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel
        label="Wikifeet Score"
        style={{
          margin: 4,
        }}
      >
        <Form.Control
          type="number"
          value={wikifeetScore}
          onChange={(e) => setWikifeetScore(parseInt(e.target.value))}
        />
      </FloatingLabel>

      <Button variant="primary" onClick={handleUpdate}>
        Update
      </Button>
    </div>
  );
}

export default Socials;
