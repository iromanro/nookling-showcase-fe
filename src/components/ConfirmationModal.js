/* eslint-disable react/prop-types */
/* eslint-disable react/no-typos */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from "react"
import "../styles/main.scss"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"

const ConfirmationModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.toggle}>
      <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        This action cannot be undone. Are you sure you want to delete this post?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.toggle}>
          Cancel
        </Button>
        <Button className="confirm" onClick={props.confirm}>
          Delete Permanently
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal
