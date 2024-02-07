"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
function ComicPage({ params }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const numId = parseInt(params.id);
    const currId = parseInt(localStorage.getItem("currId"));
    Promise.all([
      axios.get(`http://localhost:8000/comics/${numId}`),
      axios.get(`http://localhost:8000/isFollowed/${numId}?user_id=${currId}`),
    ])
      .then(function (results) {
        // Destructure the results
        const [comicsResponse, isFollowedResponse] = results;

        // Handle comics response
        setData(comicsResponse.data);
        setIsFollowing(JSON.parse(isFollowedResponse.data));
      })
      .catch(function (err) {
        setError(err.response.data.detail);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const followFcn = () => {
    setIsLoading(true);
    const numId = parseInt(params.id);
    const currId = parseInt(localStorage.getItem("currId"));
    axios
      .post(`http://localhost:8000/follow/${numId}/?id=${currId}`, {
      })
      .then(function (res) {
        const ok = JSON.parse(res.data);
        if (ok) window.location.reload(); 
      })
      .catch(function (err) {
        setError(err.response.data.detail);
      })
      .finally(() => setIsLoading(false));
  };

  const unfollowFcn = () => {
    setIsLoading(true);
    const numId = parseInt(params.id);
    const currId = parseInt(localStorage.getItem("currId"));
    axios
      .post(`http://localhost:8000/unfollow/${numId}/?id=${currId}`, {})
      .then(function (res) {
        const ok = JSON.parse(res.data);
        if (ok) window.location.reload(); 
      })
      .catch(function (err) {
        setError(err.response.data.detail);
      })
      .finally(() => setIsLoading(false));
  };

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
      <div
        style={{
          display: "flex",
          direction: "row",
        }}
      >
        <h1 style={{ padding: 4 }}>{data.name}</h1>
        {!isFollowing ? (
          <button onClick={followFcn}>Follow</button>
        ) : (
          <button onClick={unfollowFcn}>Unfollow</button>
        )}
      </div>

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
    </div>
  );
}

export default ComicPage;
