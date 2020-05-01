import React from "react"
import "../styles/main.scss"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import NavDropdown from "react-bootstrap/NavDropdown"

const FilterBar = () => {
  return (
    <Row xs={12} className="filters">
      <Col md={4}>
        <Form>
          <Form.Group>
            <Form.Label>Search</Form.Label>
            <Form.Control type="text" placeholder="name or keyword" />
          </Form.Group>
        </Form>
      </Col>
      <Col md={2}>
        Sort
        <NavDropdown title="Featured" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Featured</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.1">Latest</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.1">Oldest</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.1">Likes</NavDropdown.Item>
        </NavDropdown>
      </Col>
      <Col md={2}>
        Type
        <NavDropdown title="Homes" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Homes</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.1">Patterns</NavDropdown.Item>
        </NavDropdown>
      </Col>
      <Col md={2} className="my-auto">
        <Button>Search</Button>
      </Col>
    </Row>
  )
}

export default FilterBar
