import React, { useState } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Carousel from "react-bootstrap/Carousel"
import CarouselSelector from "./CarouselSelector"

const DesignCarousel = () => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(null)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
    setDirection(e.direction)
  }

  const goToIndex = (newIndex) => {
    setIndex(newIndex)
  }

  return (
    <Container className="top-list">
      <Row>Top Homes</Row>
      <Row>
        <Col xs={8}>
          <Carousel
            activeIndex={index}
            direction={direction}
            onSelect={handleSelect}
            interval={null}
          >
            {/* <Carousel.Item>
              <img className="d-block w-100" src={asset} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={asset} alt="Third slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={asset} alt="Third slide" />
            </Carousel.Item> */}
          </Carousel>
        </Col>
        <Col xs={4} className="carousel-indicator">
          <CarouselSelector goTo={goToIndex} />
        </Col>
      </Row>
    </Container>
  )
}

export default DesignCarousel
