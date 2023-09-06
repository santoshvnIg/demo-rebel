import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React from "react";
import logo from "./logo.png";
import "./mainHeader.scss";

function Header({ toggle, setToggel }) {
  const navigate = useNavigate();
  const location = useLocation();
  const showHeaderOnPath = "/";

  const showHeader = location.pathname === showHeaderOnPath;

  let apiUrl;

  if (process.env.NODE_ENV === "development") {
    apiUrl = process.env.REACT_APP_EMPLOYEE_LOGIN_STAGING;
  } else if (process.env.NODE_ENV === "uat") {
    apiUrl = process.env.REACT_APP_EMPLOYEE_LOGIN_STAGING;
  } else if (process.env.NODE_ENV === "production") {
    apiUrl = process.env.REACT_APP_EMPLOYEE_LOGIN_PRODUCTION;
  }

  if (!showHeader) {
    return null;
  }

  return (
    <>
      {["sm"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-body-tertiar"
          id="MainHeader"
        >
          <Container fluid id="header1">
            <Navbar.Brand>
              {<img className="imgicon" src={logo} alt="" />}
            </Navbar.Brand>

            <Navbar.Toggle />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton className="offcanvas-header-white">
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  {<img style={{ width: "8rem" }} src={logo} alt="" />}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <ul className="emp-url" style={{ listStyle: "none" }}>
                <li
                  className="cool-link ml-3"
                  onClick={() => {
                    navigate("/admin-login");
                  }}
                >
                  {" "}
                  Admin login
                </li>
                <li className="cool-link ml-3">
                  <a
                    className="emp-login"
                    style={{
                      color: "black",
                      textDecoration: "none",
                      fontSize: "15px",
                    }}
                    href={apiUrl}
                  >
                    Employee Login
                  </a>
                </li>
              </ul>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;
