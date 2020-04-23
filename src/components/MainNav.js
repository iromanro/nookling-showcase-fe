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

  const login = () => {
    history.push('/login')
  }

  const logout = () => {
    dispatch(userLogout())
  }

  const goToPage = (page) => {
    history.push(page)
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
              <Nav.Link onClick={() => login()}>Log in</Nav.Link>
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