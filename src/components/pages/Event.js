import React from "react"
import "../../styles/events.scss"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import MainNav from "../MainNav"
import TopHomes from "../TopHomes"
import TopDesigns from "../TopDesigns"

const Event = () => {
  return (
    <div className="main">
      <MainNav />
      <Container>
        <Row className="main-content">
          <Col>
            <TopHomes />
            <TopDesigns />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Event
