"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
function UserPage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({});
  const [favs, setFavs] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${parseInt(params.id)}`)
      .then((response) => {
       // console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        setError(error.response.data.detail);
        return;
      });
      
    axios
    .get(`http://localhost:8000/favourites/${parseInt(params.id)}`)
    .catch(function (err) {
      setError(err.response.data.detail);
      return;
    })
    .then((response) => {
       // console.log(response.data);
        setFavs(response.data)
    })
    .finally(
        setIsLoading(false),
    )
  }, []);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (error.length > 0) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h2>{data.username}</h2>
      <h4>Favourite Comedians:</h4>
      {
        favs.map((data, index) =>{
            return <li key={index}>{data.name}</li>
        })
      }
      <h4>Favourite Genres:</h4>
    </div>
  );
}

export default UserPage;
