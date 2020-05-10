/* eslint-disable no-else-return */
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { render } from "react-dom"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

const CarouselSelector = (props) => {
  const [thumbnails, setThumbnails] = useState([])

  useEffect(() => {
    renderThumbnails()
  }, [props.index])

  const renderThumbnails = () => {
    let renderColumns = []

    if (props.images != null) {
      props.images.map((image, i) => {
        renderColumns.push(
          <Col xs={3} sm="2" className="thumbnail my-2 mx-3" key={`thumbnail-${i}`}>
            <Button
              key={`button-${i}`}
              onClick={() => props.goTo(i)}
              className={`${i === props.index ? "active" : ""}`}
            >
              <img src={image.path} />
            </Button>
          </Col>
        )

        if ((i + 1) % 4 === 0 && i < props.images.length - 1) {
          renderColumns.push(
            <div className="thumbnail-large w-100" key={`wrap-${i}`} />
          )
        } else if((i + 1) % 3 === 0 && i < props.images.length - 1) {
          renderColumns.push(
            <div className="thumbnail-small w-100" key={`wrap-${i}`} />
          )
        }
      })
    }

    setThumbnails(renderColumns)
  }

  if (props.images != null && props.images.length > 1) {
    return (
      <div className="row carousel-thumbnails justify-content-center">
        {thumbnails}
      </div>
    )
  } else if (props.images == null) {
    return (
      <div className="container d-flex justify-content-center">
        <div className="spinner-border my-auto" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
}

export default CarouselSelector
