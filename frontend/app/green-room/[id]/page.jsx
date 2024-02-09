"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import UserMsg from "../../../components/UserMsg";
function GreenRoom({ params }) {
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [yourMsg, setYourMsg] = useState("");
  const [comicName, setComicName] = useState("");
  const comicNameRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const uid = parseInt(localStorage.getItem("currId"));
    const name = localStorage.getItem("currUsername");
    setUserId(uid);
    setUserName(name);

    axios
      .get(`http://localhost:8000/comics/${params.id}`)
      .then((response) => {
        setComicName(response.data.name);
        comicNameRef.current = response.data.name;
      })
      .catch((err) => {
        setError(err.response.data.detail)
      })
      .finally(
        setIsLoading(false)
      )

    const newWs = new WebSocket(
      `ws://localhost:8000/ws/greenroom/${params.id}/${uid}`
    );
    setWs(newWs);

    return () => {
      newWs.close();
    };
  }, []);

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = function (event) {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    return () => {
      ws.onmessage = null;
    };
  }, [ws]);

  function sendMessage() {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.error("WebSocket connection is not open yet.");
      return;
    }
    ws.send(yourMsg);
    setYourMsg("");
  }

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
    <div>
      <h2>Welcome to {comicName}'s Greenroom</h2>
      <Form.Label>Enter Something...</Form.Label>
      <Form.Control
        type="text"
        value={yourMsg}
        onChange={(e) => setYourMsg(e.target.value)}
      />
      <Button variant="primary" style={{ margin: 7 }} onClick={sendMessage}>
        Send Message
      </Button>
      {messages.map((msg, id) => (
        <UserMsg key={id} currName={userName} text={msg}></UserMsg>
      ))}
    </div>
  );
}

export default GreenRoom;
