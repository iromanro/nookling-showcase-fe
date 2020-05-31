import React from "react"
import "../../styles/events.scss"
import Container from "react-bootstrap/Container"
import MainNav from "../MainNav"
import ToastMessage from "../ToastMessage"

const ErrorPage = () => {
  return (
    <div className="main">
      <MainNav />
      <Container>404 page!</Container>
      <ToastMessage />
    </div>
  )
}

export default ErrorPage
