"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import MediaList from "../../../components/MediaList";
function ComicPage({ params }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [specials, setSpecials] = useState([]);

  useEffect(() => {
    const numId = parseInt(params.id);
    const currId = parseInt(localStorage.getItem("currId"));
    Promise.all([
      axios.get(`http://localhost:8000/comics/${numId}`),
      axios.get(`http://localhost:8000/isFollowed/${numId}?user_id=${currId}`),
      axios.get(`http://localhost:8000/movies/${numId}`),
      axios.get(`http://localhost:8000/shows/${numId}`),
      axios.get(`http://localhost:8000/specials/${numId}`),
    ])
      .then(function (results) {
        // Destructure the results
        const [
          comicsResponse,
          isFollowedResponse,
          moviesResponse,
          showsResponse,
          specialsResponse,
        ] = results;
        // console.log(comicsResponse.data);
        // console.log(showsResponse.data);
        // console.log(specialsResponse.data);
        // console.log(moviesResponse.data);
        // Handle comics response
        setData(comicsResponse.data);
        setMovies(moviesResponse.data);
        setShows(showsResponse.data);
        setSpecials(specialsResponse.data);
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
      .post(`http://localhost:8000/follow/${numId}/?id=${currId}`, {})
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
        <h1 style={{ padding: 4, margin: 3 }}>{data.name}</h1>
        {!isFollowing ? (
          <button onClick={followFcn} style={{ padding: 4, margin: 3 }}>
            Follow
          </button>
        ) : (
          <button onClick={unfollowFcn} style={{ padding: 4, margin: 3 }}>
            Unfollow
          </button>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link href={`/comic/profile/${parseInt(params.id)}/info`} style={{ padding: 4, margin: 3 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              class="bi bi-gear-fill"
              viewBox="0 0 16 16"
            >
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
            </svg>
          </Link>
        </div>
      </div>

      <h2>{data.desc}</h2>
      <h3>DOB : {data.dob}</h3>
      <h3>Age : {data.age}</h3>
      <br />
      <div
        style={{
          display: "flex",
          alignContent: "center",
          flexDirection: "row",
        }}
      >
        {" "}
        {data.instaUrl && data.instaUrl !== "" && (
          <h4 style={{ margin: 3 }}>
            <Link href={data.instaUrl} passHref={true}>
              <button>Instagram</button>
            </Link>
          </h4>
        )}
        <br />
        {data.twitterUrl && data.twitterUrl !== "" && (
          <h4 style={{ margin: 3 }}>
            <Link href={data.twitterUrl} passHref={true}>
              <button>Twitter</button>
            </Link>
          </h4>
        )}
        <br />
        {data.youtubeUrl && data.youtubeUrl !== "" && (
          <h4 style={{ margin: 3 }}>
            <Link href={data.youtubeUrl} passHref={true}>
              <button>Youtube</button>
            </Link>
          </h4>
        )}
      </div>
      <div>
        <h2>Movies</h2>
        <MediaList data={movies} />
        <h2>TV Shows</h2>
        <MediaList data={shows} />
        <h2>Specials</h2>
        <MediaList data={specials} />
      </div>
    </div>
  );
}

export default ComicPage;
