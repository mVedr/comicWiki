"use client";
import axios from "axios";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
function CreateComic() {
  // State variables to store form inputs
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // Function to handle form submission
  const handleSubmit = () => {
    // Display the entered information
    setIsLoading(false);
    axios
      .post("http://127.0.0.1:8000/comics", {
        name: name,
        dob: dob,
        desc: description,
        age: age,
        isAlive: true,
        dod: "",
        twitterUrl: "",
        instaUrl: "",
        youtubeUrl: "",
        wikifeetUrl: "",
        onlyFansUrl: "",
        wikifeetScore: "",
      })
      .then((res) => {
        setData(res.data);
       // console.log(res.data);
      })
      .catch(function (err) {
        setError(err.response.data.detail);
      })
      .finally(() => {
        setIsLoading(false);
        setDescription("");
        setDob("");
        setName("");
        setAge(0);
      });
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
    <>
    {
      data ? <Alert variant="success">{data.name} created!</Alert> : <></>
    }
      
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "5px",
        }}
      >
        <FloatingLabel label="Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel label="DOB (yyyy-mm-dd)" className="mb-3">
          <Form.Control
            type="text"
            placeholder="DOB"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel label="Age" className="mb-3">
          <Form.Control
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel label="Description" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Description"
            style={{ height: "120px", width: "420px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FloatingLabel>
        <Button variant="primary" onClick={handleSubmit}>
          Register
        </Button>
      </div>
    </>
  );
}

export default CreateComic;
