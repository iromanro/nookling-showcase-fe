import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import '../../styles/main.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import MainNav from '../MainNav'
import FilterBar from '../FilterBar';
import ResultsList from '../ResultsList';

export const Home = (props) => {
  const dispatch = useDispatch();

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
    </div>
  )
}

export default Home;