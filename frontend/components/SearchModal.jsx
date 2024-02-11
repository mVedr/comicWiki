import Link from "next/link";
import React from "react";

function SearchModal({ data }) {
  if (data.length > 0) {
    return (
      <div
        style={{
          display: "block",
          position: "absolute",
          marginTop: 38,
          zIndex: 1000,
          border: "3px solid blue",
          borderRadius: 10
        }}
      >
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            backgroundColor: "black",
            flexDirection: "column",
          }}
        >
          {data.length > 0}
          {data.map((ans, index) => {
            return (
              <li
                key={index}
                style={{
                  color: "white",
                }}
              >
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
      </div>
    );
  }
}

export default SearchModal;
