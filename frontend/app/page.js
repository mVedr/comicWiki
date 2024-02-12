"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import ComicCardList from "../components/ComicList";
function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    axios
      .get(`http://localhost:8000/comics/?limit=6`)
      .then(function (response) {
        setData(response.data);
       // console.log(response.data);
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
      <h3>Discover Comics...</h3>
      <ComicCardList data={data} />
      <h3>By Country...</h3>
      <ComicCardList data={data} />
      <h3>By Genre...</h3>
      <ComicCardList data={data} />
    </>
  );
}

export default Home;
