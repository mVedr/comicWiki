"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
function UpdateComic({ params }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const numId = parseInt(params.id);
    axios
      .get(`http://localhost:8000/comics/${numId}`)
      .then(function (res) {
        setData(res.data);
        console.log(res.data);
      })
      .catch(function (err) {
        setError(err.response.data.detail);
      })
      .finally(() => setIsLoading(false));
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "5px",
      }}
    >
      <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
        <Form.Control type="text" placeholder="Name" value={data.name} />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="DOB (yyyy-mm-dd)"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="DOB" value={data.dob} />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Age"
        className="mb-3"
        value={data.age}
      >
        <Form.Control type="number" placeholder="Age" />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingTextarea2"
        label="Decription"
        className="mb-3"
      >
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: "120px", width: "420px" }}
          value={data.desc}
        />
      </FloatingLabel>
      <Button variant="primary">Update</Button>
    </div>
  );
}

export default UpdateComic;
