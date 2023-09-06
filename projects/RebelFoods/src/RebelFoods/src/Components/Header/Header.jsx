import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";
import { DataService } from "../../Services/Dataservice";
import { BiMoney ,BiVolumeLow } from "react-icons/bi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsFillPeopleFill, BsWalletFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import React from "react";
import logo from "./logo.png";
import "./header.scss";
import ClockComponent from "../ClockComponent/ClockComponent";

function Header() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logoutUserApi = (token) => {
    let logout = DataService.LogoutApi(token);

    logout
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("token");
          navigate("/");
          window.location.reload();
        }
      })
      .catch((error) => {});
  };

  const handleDelete = () => {
    logoutUserApi(token);
  };
  const menuItem = [
    {
      path: "/",
      name: "Payroll",
      icon: <BiMoney />,
    },

    {
      path: "/campaigns" ,
      name: "Campaigns",
      icon: <BiVolumeLow/>,
    },
    {
      path: "/transactions",
      name: "Transactions",
      icon: <BsWalletFill />,
    },
    {
      path: "/employees",
      name: "Employees",
      icon: <BsFillPeopleFill />,
    },
  ];
  const hideNavSlider = () => {
    document.querySelector("#offcanvasNavbar-expand-sm") &&
      document
        .querySelector("#offcanvasNavbar-expand-sm")
        .querySelector(".btn-close") &&
      document
        .querySelector("#offcanvasNavbar-expand-sm")
        .querySelector(".btn-close")
        .click();
  };
  return (
    <>
      {["sm"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-body-tertiaryrr "
          id="header"
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
              <Offcanvas.Header closeButton className="offcanvas-header-blue">
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  {<img className="imgicon" src={logo} alt="" />}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {menuItem.map((item, index) => {
                    return (
                      <>
                        <NavLink
                          to={item.path}
                          key={index}
                          className="link-header mobile-link"
                          activeClassName="active"
                          onClick={hideNavSlider}
                        >
                          <div className="icon-header">{item.icon}</div>
                          {item.name}
                        </NavLink>
                      </>
                    );
                  })}
                </Nav>
                <div className="clock-logo">
                  <AiOutlineClockCircle />
                </div>

                <ClockComponent />
                <Button
                  variant="danger"
                  className="logout-button"
                  style={{ marginLeft: "1rem" }}
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  Logout
                </Button>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;
