import { Nav, Navbar, NavDropdown, Container, Button } from "react-bootstrap";
import PostAdForm from "../modals/post advesitment";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import React from "react";
import "./top.css";
import Login from "../modals/loginAndsign";
import Signup from "../modals/sign up";
import AuthModals from "../AuthModels.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../authcontext.jsx";

export function Header() {
  const { user, setUser } = useAuth();

  const [ads, setAds] = useState([]); // 🔐 store ads

  const addAd = (newAd) => {
    setAds([...ads, newAd]); // 📦 new ad add karo
  };
  const Navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    Navigate("/");
    // Optional: remove token from localStorage
  };

  return (
    <>
      <Container className="me-5">
        <Navbar.Collapse className="d-flex align-items-center ms-auto">
          <div className="d-flex align-items-center ms-auto">
            {!user ? (
              <>
                <AuthModals />
              </>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" id="dropdown-user">
                  <img
                    src={user.image}
                    alt="Profile"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Header>{user.name}</Dropdown.Header>
                  <NavDropdown.Item onClick={() => Navigate("./Dashboard")}>
                    View Profile
                  </NavDropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>

      <Navbar expand="lg" className="bg-body-tertiary ">
        <Container className="me-5">
          <Navbar.Brand href="#home">
            <h2 style={{ color: "green" }}>Pak Classified</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link
                to="/"
                style={{
                  color: "black",
                  textDecoration: "none",
                  marginLeft: "30px",
                  marginTop: "7px",
                }}
              >
                Home
              </Link>
              <Link
                to="/About"
                style={{
                  color: "black",
                  textDecoration: "none",
                  marginLeft: "20px",
                  marginTop: "7px",
                }}
              >
                About
              </Link>
              <Nav.Link
                as={Link}
                to="/Advertisement"
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                Categories
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/Contact"
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                Contact
              </Nav.Link>
              {user && (
                <div>
                  <PostAdForm
                    onNewAd={(newAd) => setAds((prev) => [...prev, newAd])}
                    onSubmit={addAd}
                    ads={ads}
                  />
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <Page1 ads={ads} /> */}
    </>
  );
}
