"use client";
import ComicCard from "@/components/ComicCard";
import { apiUrl } from "@/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    axios
      .get(`${apiUrl}/comics/`)
      .then(function (response) {
        setData(response.data);
        console.log(response.data);
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
    <>
    <h1>ComicWiki</h1>
      <div
        style={{
          height: "400px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {data.map((data, index) => (
          <ComicCard key={index} data={data} />
        ))}
      </div>
    </>
  );
}

export default Home;
