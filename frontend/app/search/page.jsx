"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
const splitStringIntoArray = (str) => {
  let arr = str.split(/\s+/).filter(Boolean);
  return arr;
};

function Search() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (name.trim() !== "") {
      const fetchData = async () => {
        try {
          const arr1 = await fetchDataFromEndpoints(splitStringIntoArray(name));
          setData(arr1);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    } else {
      setData([]);
    }
  }, [name]);

  const fetchDataFromEndpoints = async (names) => {
    let ans = [];

    const promises = names.map(async (name) => {
      const response = await fetch(`http://localhost:8000/search/${name}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${name}`);
      }
      return response.json();
    });

    const results = await Promise.all(promises);
    //console.log(results);
    results.forEach((list) => {
      ans.push(...list);
    });
    return ans;
  };

  return (
    <>
      <Form.Label >Search For User</Form.Label>
      <Form.Control
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <ul>
        {data.map((ans, index) => {
          return (
            <li key={index}>
              {ans.name} {`  `} 
              <span style={{ color: "green", textDecoration: "underline" }}>
                <Link href={`/green-room/${ans.id}`}>Green Room</Link>
              </span>
              {`  `}
              <span style={{ color: "blue", textDecoration: "underline" }}>
                <Link href={`/comic/${ans.id}`}>Profile</Link>
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Search;
