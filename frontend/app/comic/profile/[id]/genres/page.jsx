"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
function Genres() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
      .get(`http://localhost:8000/genres/`)
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 15,
        flexDirection: "column",
      }}
    >
      <Button variant="primary" className="mb-4">
        Add A Genre
      </Button>
      <Form.Select>
        <option>Select Genre</option>
        {data.map((data, index) => {
          return <option key={index}>{data.name}</option>;
        })}
      </Form.Select>
    </div>
  );
}

export default Genres;
