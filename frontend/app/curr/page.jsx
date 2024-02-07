"use client";
import axios from "axios";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

function CurrUser() {
  const currId = parseInt(localStorage.getItem("currId"));
  const currUsername = localStorage.getItem("currUsername");
  const currEmail = localStorage.getItem("currEmail");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleActivateUser = () => {
    if (username.length > 0) {
      setIsLoading(true);
      axios
        .get(`http://localhost:8000/user/${username}`)
        .then(function (res) {
          localStorage.setItem("currId", res.data.id);
          localStorage.setItem("currUsername", res.data.username);
          localStorage.setItem("currEmail", res.data.email);
        })
        .catch(function (err) {
          setError(err.response.data.detail);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <div>
      {error.length > 0 ? <Alert variant="danger">{error}</Alert> : <></>}
      {localStorage.getItem("currId")===null ? (
        <h3>No Active User</h3>
      ) : (
        <>
          <h3>{currId}</h3>
          <h3>{currUsername}</h3>
          <h3>{currEmail}</h3>
        </>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "5px",
        }}
      >
        <FloatingLabel
          controlId="floatingInput"
          label="Username"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Name"
            value={username}
            onChange={handleUsernameChange}
          />
        </FloatingLabel>
        <Button variant="primary" onClick={handleActivateUser}>
          Activate User
        </Button>
      </div>
    </div>
  );
}

export default CurrUser;
