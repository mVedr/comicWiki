"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
function ComicPage({ params }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const numId = parseInt(params.id);
    axios
      .get(`http://localhost:8000/comics/${numId}`)
      .then(function (res) {
        setData(res.data);
        console.log(res.data);
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
    <div>
      <h4>
        <h1>{data.name}</h1>
        <h2>{data.desc}</h2>
        <h3>DOB : {data.dob}</h3>
        <h3>Age : {data.age}</h3>
        <br />
        {data.instaUrl && data.instaUrl !== "" && (
          <h4>
            <Link href={data.instaUrl} passHref={true}>
              <button>Instagram</button>
            </Link>
          </h4>
        )}
        <br />
        {data.twitterUrl && data.twitterUrl !== "" && (
          <h4>
            {" "}
            <Link href={data.twitterUrl} passHref={true}>
              <button>Twitter</button>
            </Link>
          </h4>
        )}
        <br />
        {data.youtubeUrl && data.youtubeUrl !== "" && (
          <h4>
            <Link href={data.youtubeUrl} passHref={true}>
              <button>Youtube</button>
            </Link>
          </h4>
        )}
      </h4>
    </div>
  );
}

export default ComicPage;
