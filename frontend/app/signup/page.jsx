"use client";
import { apiUrl } from "@/constants";
import axios from "axios";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, email, password);
    if (username.length > 0 && email.length > 0 && password.length > 0) {
      setIsLoading(true);
      axios
        .post(`${apiUrl}/users/`, {
          email: email,
          username: username,
          password: password,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (err) {
          console.log(err.response.data.detail);
          setError(err.response.data.detail);
        })
        .finally(() => setIsLoading(false));
      setEmail("");
      setPassword("");
      setUsername("");
    } else {
        setError("Please fill all credentials")
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
    <>
      {" "}
      {error.length > 0 ? <Alert variant="danger">{error}</Alert> : <></>}
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
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className="mb-3"
        >
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FloatingLabel>
        <Button variant="primary" onClick={handleSubmit}>
          Register
        </Button>
      </div>
    </>
  );
}

export default SignUp;
