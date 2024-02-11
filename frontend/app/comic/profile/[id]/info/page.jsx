"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

function PersonalInfo({ params }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState(1);
  const [dateOfDeath, setDateOfDeath] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/comics/${parseInt(params.id)}`)
      .then((response) => {
        setDateOfBirth(response.data.dob);
        setDateOfDeath(response.data.dod);
        setStatus(response.data.isAlive);
        setAge(response.data.age);
        setName(response.data.name);
        setData(response.data);
        //console.log(response.data);
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
        twitterUrl: data.twitterUrl,
        instaUrl: data.instaUrl,
        dob: dateOfBirth,
        youtubeUrl: data.youtubeUrl,
        name: name,
        wikifeetUrl: data.wikifeetUrl,
        desc: data.desc,
        onlyFansUrl: data.onlyFansUrl,
        age: age,
        wikifeetScore: data.wikifeetScore,
        isAlive: data.isAlive,
        country_id: data.country_id,
        dod: dateOfDeath,
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
        alignContent: "center",
        justifyContent: "center",
        margin: 12,
      }}
    >
      <FloatingLabel label="Name" className="mb-3">
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel label="Date Of Birth (YYYY-MM-DD)" className="mb-3">
        <Form.Control
          type="text"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel label="Age" className="mb-3">
        <Form.Control
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </FloatingLabel>
      <Form.Select
        className="mb-3"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value={1}>Alive</option>
        <option value={0}>Dead</option>
      </Form.Select>
      <FloatingLabel label="Date Of Death (YYYY-MM-DD)" className="mb-3">
        <Form.Control
          type="text"
          value={dateOfDeath}
          disabled={status === "1"}
          onChange={(e) => setDateOfDeath(e.target.value)}
        />
      </FloatingLabel>
      <Button variant="primary" onClick={handleUpdate}>
        Update
      </Button>
    </div>
  );
}

export default PersonalInfo;
