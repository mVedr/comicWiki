"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
function Country({ params }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/comic/${parseInt(params.id)}/country/`)
      .then((data) => setData(data.data))
      .catch((err) => setError(err.response.data.detail))
      .finally(setIsLoading(false));
  }, []);

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {data ? <h2>{data.name}</h2> : <h3>No Country Set</h3>}
      <FloatingLabel className="mb-3" label="ISO A2 Code">
        <Form.Control type="text"></Form.Control>
      </FloatingLabel>

      <Button>Update Country</Button>
    </div>
  );
}

export default Country;
