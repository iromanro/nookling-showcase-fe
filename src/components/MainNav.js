import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export const MainNav = (props) => {
  const dispatch = useDispatch();


  const discordLogin = () => {
    window.location.href = 'https://discordapp.com/api/oauth2/authorize?client_id=700548602799325245&redirect_uri=https%3A%2F%2Fwww.nooklingshowcase.com%2Fauth&response_type=code&scope=identify%20email';
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Nookling Showcase</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Homes</Nav.Link>
            <Nav.Link href="#link">Custom Patterns</Nav.Link>
            <Nav.Link onClick={() => discordLogin()}>Log in</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default MainNav;