import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import '../styles/main.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const ResultsList = (props) => {
  const dispatch = useDispatch();

  return(
    <Col className="results">
      <Row className="list-row">
        <Col className="list-item">
        
        </Col>
        <Col className="list-item">
        
        </Col>
        <Col className="list-item">
        
        </Col>
      </Row>
      <Row className="list-row">
        <Col className="list-item">
        
        </Col>
        <Col className="list-item">
        
        </Col>
        <Col className="list-item">
        
        </Col>
      </Row>
      <Row className="list-row">
        <Col className="list-item">
        
        </Col>
        <Col className="list-item">
        
        </Col>
        <Col className="list-item">
        
        </Col>
      </Row>
    </Col>
  )
}

export default ResultsList;
