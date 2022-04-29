import { React, useContext, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./topbar.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Container,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faPaperPlane,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

const TopbarDesktop = () => {
  const { user, dispatch } = useContext(AuthContext);
  const logOut = () => {
    dispatch({
      type: "LOGOUT",
    });
    console.log("hey");
    /*     user = !user; */
  };
  return (
    <Navbar variant="dark" expand="lg" className="ml-auto" fixed="top">
      <Container
        fluid
        className="navContainer"
        style={{
          display: "flex",
          flexDirection: "row !important",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="logo"
          className="logo"
          style={{
            display: "flex",
            width: "3rem",
            height: "auto",
            margin: "0, 1.5rem",
          }}
        />

        <Navbar.Brand
          style={{
            display: "flex !important",
            flexDirection: "row !important",
            padding: "0 1rem !important  ",
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            mediamage
          </Link>
        </Navbar.Brand>

        <Container className="iconContainer">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-3"
              aria-label="Search"
            />
            <Button variant="outline-warning" id="searchText">
              Search
            </Button>
          </Form>
          <FontAwesomeIcon icon={faEnvelope} />
          <FontAwesomeIcon icon={faPaperPlane} />
          <Link to="/profile/:user">
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <FontAwesomeIcon icon={faBell} />
          <Navbar.Toggle aria-controls="responsivex-navbar-nav" />
        </Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/profile/:user"
                style={{ textDecoration: "none", color: "white" }}
              >
                Profile
              </Link>
            </Nav.Link>
            <NavDropdown
              title="API's"
              id="basic-nav-dropdown"
              variant="dark"
              bg="dark"
            >
              <NavDropdown.Item>
                <Link
                  to="/api/weather"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Weather
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link
                  to="/apis/vimeo"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    backgroundColor: "white",
                  }}
                >
                  Vimeo
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Separated link</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "white" }}
                onClick={logOut}
              >
                Log out
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopbarDesktop;
