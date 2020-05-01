import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

const CarouselSelector = () => {
  return (
    <Container>
      <Col className="item">
        <Button block>
          <Row className="ranking">
            <Col>
              <Row className="number">#1</Row>
              <Row className="likes">1234 Likes</Row>
            </Col>
            <Col>
              <Row>
                <Col className="username">Username</Col>
              </Row>
              <Row>
                <Col className="name">Content Name</Col>
              </Row>
            </Col>
          </Row>
        </Button>
      </Col>
      <Col className="item">
        <Button block>
          <Row className="ranking">
            <Col>
              <Row className="number">#2</Row>
              <Row className="likes">1010 Likes</Row>
            </Col>
            <Col>
              <Row>
                <Col className="username">Username</Col>
              </Row>
              <Row>
                <Col className="name">Content Name</Col>
              </Row>
            </Col>
          </Row>
        </Button>
      </Col>
      <Col className="item">
        <Button block>
          <Row className="ranking">
            <Col>
              <Row className="number">#3</Row>
              <Row className="likes">904 Likes</Row>
            </Col>
            <Col>
              <Row>
                <Col className="username">Username</Col>
              </Row>
              <Row>
                <Col className="name">Content Name</Col>
              </Row>
            </Col>
          </Row>
        </Button>
      </Col>
      <Col className="item">
        <Button block>
          <Row className="ranking">
            <Col>
              <Row className="number">#4</Row>
              <Row className="likes">603 Likes</Row>
            </Col>
            <Col>
              <Row>
                <Col className="username">Username</Col>
              </Row>
              <Row>
                <Col className="name">Content Name</Col>
              </Row>
            </Col>
          </Row>
        </Button>
      </Col>
      <Col className="item">
        <Button block>
          <Row className="ranking">
            <Col>
              <Row className="number">#5</Row>
              <Row className="likes">302 Likes</Row>
            </Col>
            <Col>
              <Row>
                <Col className="username">Username</Col>
              </Row>
              <Row>
                <Col className="name">Content Name</Col>
              </Row>
            </Col>
          </Row>
        </Button>
      </Col>
    </Container>
  )
}

export default CarouselSelector
