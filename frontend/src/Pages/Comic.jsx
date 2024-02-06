import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Comic() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const numid = parseInt(id);
    setLoading(true); 
    axios
      .get(`http://localhost:8000/comics/${numid}`)
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (err) {
        setError(err.message);
      })
      .finally(function () {
        setLoading(false); 
      });
  }, [id]);

  if (loading) {
    return <h1>Loading Data</h1>;
  }

  if (error.length > 0) {
    return <>{error}</>;
  }

  return (
    <>
      <h1>{user.name}</h1>
      <h2>DOB: {user.dob}</h2>
      <h2>Age: {user.age}</h2>
    </>
  );
}

export default Comic;
