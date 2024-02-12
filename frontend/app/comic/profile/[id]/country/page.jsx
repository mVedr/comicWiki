"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
function Country({ params }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cnt, setCnt] = useState("");
  const router = useRouter();
  useEffect(() => {
    const numId = parseInt(params.id);
    const currId = parseInt(localStorage.getItem("currId"));
    Promise.all([
      axios.get(`http://localhost:8000/isAdmin/${numId}?usr_id=${currId}`),
      axios.get(`http://localhost:8000/isMod/${numId}?usr_id=${currId}`),
    ])
      .then((res) => {
        const [aR, mR] = res;
        console.log("isAdmin:", aR.data);
        console.log("isMod:", mR.data);

        if (aR.data === false && mR.data === false) {
          console.warn("You cannot access this page");
          router.push("/");
        }
      })
      .catch((err) => {
        console.error("Error occurred:", err);
        router.push("/");
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/comic/${parseInt(params.id)}/country/`)
      .then((data) => setData(data.data))
      .catch((err) => setError(err.response.data.detail))
      .finally(setIsLoading(false));
  }, [cnt]);

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .put(`http://localhost:8000/comic/${parseInt(params.id)}/country`, {
        name: cnt,
      })
      .then((res) => {
        location.reload();
      })
      .catch((err) => {
        setError(err.response.data.detail);
      })
      .finally(setIsLoading(false));
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
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {data ? <h2>{data.name}</h2> : <h3>No Country Set</h3>}
      <FloatingLabel className="mb-3" label="ISO A2 Code">
        <Form.Control
          type="text"
          value={cnt}
          onChange={(e) => setCnt(e.target.value)}
        ></Form.Control>
      </FloatingLabel>

      <Button onClick={handleSubmit}>Update Country</Button>
    </div>
  );
}

export default Country;
