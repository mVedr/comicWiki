"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import ComicGrid from "../../components/ComicGrid";
function Favourites() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const currId = localStorage.getItem("currId");
    if (!currId) {
      setError("You need to be logged in...");
      setIsLoading(false);
      return; // Exit early if user is not logged in
    }

    const id = parseInt(currId);
    axios
      .get(`http://localhost:8000/favourites/${id}`)
      .then(function (res) {
        setData(res.data);
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

  if(error.length > 0){
    return <h3>{error}</h3>
  }

  if(data.length > 0){
    //return data.map((data, index) => <ComicCard key={index} data={data} />);
    return <ComicGrid data={data} />
  }else{
    return <h2>You have no favourite comics yet...</h2>
  }
  
}

export default Favourites;
