/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react"
import firebase from "firebase"
import propTypes from "prop-types"
import "../styles/main.scss"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import history from "../history"

const ResultsList = (props) => {
  const [columns, setColumns] = useState([])

  const goTo = (path) => {
    console.log(path)
    history.push(path)
  }

  useEffect(() => {
    const renderColumns = []

    if (props.results.length > 0) {
      // eslint-disable-next-line array-callback-return
      props.results.map((preview, index) => {
        renderColumns.push(
          <Col xs={12} lg={6} className="my-3 preview" key={`preview-${index}`}>
            <a onClick={() => goTo(`/design/${preview.uuid}`)}>
              <Card className="bg-dark text-white card">
                <img src={preview.images[0].path} alt="User Design" />
                <Card.ImgOverlay className="card-overlay">
                  <Col>
                    <Row>
                      <Card.Title className="my-1">{preview.name}</Card.Title>
                    </Row>
                    {preview.display_name && (
                      <Row>
                        <Card.Text className="my-1">
                          {preview.display_name}
                        </Card.Text>
                      </Row>
                    )}
                  </Col>
                </Card.ImgOverlay>
              </Card>
            </a>
          </Col>
        )
        if ((index + 1) % 2 === 0 && index < props.results.length - 1) {
          renderColumns.push(
            <div className="desktop-only w-100" key={`wrap-${index}`} />
          )
        }
      })
    }

    setColumns(renderColumns)
  }, [props.results])

  return (
    <Col className="results">
      <Row>{columns}</Row>
    </Col>
  )
}

ResultsList.propTypes = {
  results: propTypes.array.isRequired,
}

export default ResultsList
