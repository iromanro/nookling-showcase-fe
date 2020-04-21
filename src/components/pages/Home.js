import React from 'react';
import '../../styles/main.scss';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import MainNav from '../MainNav'
import FilterBar from '../FilterBar'
import ResultsList from '../ResultsList'
import ToastMessage from '../ToastMessage'

export const Home = (props) => {
  return(
    <div className="main">
      <MainNav />
      <Container>
        <Col className="main-content">
          <Row>
            <Navbar bg="light" expand="lg">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  <FilterBar />
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Row>
          <ResultsList />
        </Col>
      </Container>
      <ToastMessage />
    </div>
  )
}

export default Home;