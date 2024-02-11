"use client";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import SearchModal from "./SearchModal";

const splitStringIntoArray = (str) => {
  let arr = str.split(/\s+/).filter(Boolean);
  return arr;
};

function NavBar() {
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
    console.log(results);
    results.forEach((list) => {
      ans.push(...list);
    });
    return ans;
  };

  return (
    <Navbar expand="lg" className="bg-primary">
      <Container>
        <Navbar.Brand href="/" style={{ color: "white" }}>
          ComicWiki
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/favourites" style={{ color: "white" }}>
              Favourites
            </Nav.Link>
            <Nav.Link href="/curr" style={{ color: "white" }}>
              Profile
            </Nav.Link>
            <NavDropdown
              title="Privileges"
              id="basic-nav-dropdown"
              style={{ color: "white" }}
            >
              <NavDropdown.Item
                href="/admin"
                style={{
                  backgroundColor: "red",
                  padding: 5,
                }}
              >
                Administrator
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/mod"
                style={{
                  backgroundColor: "lightblue",
                  padding: 5,
                  // marginBottom: 3,
                }}
              >
                Moderator
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/createComic"
                style={{
                  backgroundColor: "yellow",
                  padding: 5,
                }}
              >
                Create A Comic
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div style={{
            display: "flex",
            flexDirection: "column",
          }}>
          <Form.Control type="text" placeholder="Search" value={name} onChange={(e)=>setName(e.target.value)}>
          </Form.Control>
          <SearchModal data={data} ></SearchModal>
          </div>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
