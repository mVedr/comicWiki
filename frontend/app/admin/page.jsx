"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import ComicAccordian from "../../components/ComicAccordian";
function Admin() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = parseInt(localStorage.getItem("currId"));
    axios
      .get(`http://localhost:8000/admin/${id}`)
      .then(function (res) {
        setData(res.data);
        // console.leg(JSON.parse(res.data))
        // setData(JSON.parse(res.data));
      })
      .catch(function (err) {
        console.log(err);
        setError(err.response.data.detail);
      })
      .finally(setIsLoading(false));
  }, []);

  if (error) {
    return <p>Error:</p>;
  }

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return <ComicAccordian data={data}></ComicAccordian>;
}

export default Admin;
