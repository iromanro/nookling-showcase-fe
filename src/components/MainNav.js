import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from '../../actions/globalAction'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export const MainNav = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.global.user);

  const discordLogin = () => {
    window.location.href = `https://discordapp.com/api/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&redirect_uri=https%3A%2F%2Fnookling-showcase-fe.herokuapp.com%2Fauth&response_type=code&scope=identify%20email`;
  }

  const logout = () => {
    dispatch(userLogout())
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
            {user.isAuthenticated ?
              <Nav.Link onClick={() => discordLogin()}>Log in</Nav.Link>
              :
              <Nav.Link onClick={() => logout()}>Log out</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default MainNav;