import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { userLogout } from '../actions/globalAction'
import history from '../history'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export const MainNav = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.global.user);

  useEffect(() => {

  }, [user])

  const discordLogin = () => {
    if(process.env.NODE_ENV === 'development') {
      window.location.href = 'https://discordapp.com/api/oauth2/authorize?client_id=701531720817574118&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&response_type=code&scope=identify%20email';
    } else {
      window.location.href = `https://discordapp.com/api/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&redirect_uri=https%3A%2F%2Fnookling-showcase-fe.herokuapp.com%2Fauth&response_type=code&scope=identify%20email`;
    }
  }

  const logout = () => {
    dispatch(userLogout())
  }

  const goToPage = (page) => {
    history.push(page);
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand onClick={() => goToPage('/')}>Nookling Showcase</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => goToPage('/homes')}>Homes</Nav.Link>
            <Nav.Link onClick={() => goToPage('/patterns')}>Custom Patterns</Nav.Link>
            {user.isAuthenticated && <Nav.Link onClick={() => goToPage('/profile')}>Profile</Nav.Link>}
            {user.isAuthenticated && <Nav.Link onClick={() => goToPage('/settings')}>Settings</Nav.Link>}
            {!user.isAuthenticated ?
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