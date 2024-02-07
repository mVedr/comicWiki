"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
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
                href="#action/3.1"
                style={{
                  backgroundColor: "red",
                  padding: 5,
                  marginBottom: 3,
                }}
              >
                Administrator
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.2"
                style={{
                  backgroundColor: "lightblue",
                  padding: 5,
                }}
              >
                Moderator
              </NavDropdown.Item>
              <NavDropdown.Divider />
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
