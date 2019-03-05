import React from "react";
import { Container, Image, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./../../assets/css/style.css";

class Header extends React.Component {
  render() {
    return (
      <div className="header-bar">
        <Navbar bg="light" >
          <Navbar.Brand href="#home">
            <Container>
              <Image
                src={require("../../assets/images/hospital.png")}
                roundedCircle
              />
            </Container>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <h2>Patient Management System</h2>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
export default Header;
