import React from "react"
import "../../styles/main.scss"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import MainNav from "../MainNav"
import FilterBar from "../FilterBar"
import ResultsList from "../ResultsList"
import ToastMessage from "../ToastMessage"

const Design = () => {
  console.log("WE GOT THE Design")

  return (
    <div className="main">
      <MainNav />
      <Container>
        <Col className="main-content">

        </Col>
      </Container>
      <ToastMessage />
    </div>
  )
}

export default Design
