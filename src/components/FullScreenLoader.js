import React from "react"
import Modal from "react-bootstrap/Modal"
import Spinner from "react-bootstrap/Spinner"

const FullScreenLoader = () => {
  return (
    <div className="full-screen-loader">
      <div className="d-flex justify-content-center">
        <Modal show>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Modal>
      </div>
    </div>
  )
}

export default FullScreenLoader
