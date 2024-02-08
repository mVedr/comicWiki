"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import ComicTable from "../../components/ComicTable";
function Moderator() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = parseInt(localStorage.getItem("currId"));
    axios
      .get(`http://localhost:8000/mod/${id}`)
      .then(function (res) {
        setData(res.data);
      })
      .catch(function (err) {
        setError(err.response.data.detail);
      })
      .finally(setIsLoading(false));
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }


  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return <ComicTable data={data}></ComicTable>
}

export default Moderator;
