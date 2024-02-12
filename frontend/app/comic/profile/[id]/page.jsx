"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
function page({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMod, setIsMod] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const numId = parseInt(params.id);
    const currId = parseInt(localStorage.getItem("currId"));
    Promise.all([
      axios.get(`http://localhost:8000/isAdmin/${numId}?usr_id=${currId}`),
      axios.get(`http://localhost:8000/isMod/${numId}?usr_id=${currId}`),
    ])
      .then((res) => {
        const [aR, mR] = res;
        console.log(res);
        console.log("res: ",aR.data, mR.data);
        setIsAdmin(aR.data);
        setIsMod(mR.data);
      })
      .catch((err) => {
        setError(err.response.data.detail);
        //console.log("err: ", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
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

  if (isAdmin===true) {
    return <h2>Welcome Admin!</h2>;
  }

  if (isMod===true) {
    return <h2>Welcome Mod!</h2>;
  }

  return <h2 style={{ color: "red" }}>You cannot access this page</h2>;
}

export default page;
