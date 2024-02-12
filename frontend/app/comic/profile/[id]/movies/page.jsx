"use client";
import axios from "axios";
import Link from 'next/link';
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Spinner from "react-bootstrap/Spinner";
import MovieGrid from "../../../../../components/MovieGrid";
function Movies({params}) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const numId = parseInt(params.id);
    axios
      .get(`http://localhost:8000/movies/${numId}`)
      .then((res) => {
        setData(res.data);
        //console.log(res.data)
      })
      .catch((err) => {
        setError(err.response.data.detail);
      })
      .finally(setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error.length > 0) {
    return <h2>Error : {error}</h2>;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Button variant="primary" style={{
        "margin": 10
      }}>
      <Link href={`/comic/profile/${parseInt(params.id)}/movies/add`}>Add A Movie</Link>
      </Button>
    
      
      <MovieGrid data={data} disableVideo={false} mediaType={"movies"}/>
    </div>
  );
}

export default Movies;
