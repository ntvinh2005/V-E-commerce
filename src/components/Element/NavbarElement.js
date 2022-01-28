import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const NavbarElement = () => {
  const { user } = useAuth();
  return (
    <Navbar bg="light" expand="lg" className="fixed-top shadow text-center nav" style={{fontFamily: 'Nunito Sans, sans-serif'}}>
      <Navbar.Brand className="ms-3" as={Link} to="/mall">
        <img
          alt=""
          src="favicon.ico"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        V.K
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fillRule="white"
          className="bi bi-list mr-2"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/profile">
            Profile
          </Nav.Link>
          <Nav.Link as={Link} to="/mall">
            Shopping
          </Nav.Link>
          <Nav.Link as={Link} to="/">
            Dashboard
          </Nav.Link>
        </Nav>
        <Nav className="me-2">
          <Nav.Link className="font-weight-bolder text-info" disabled>
            Welcome {user !== null ? user.email : "Guest"}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarElement;
