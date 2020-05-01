import React from "react"
import "../../styles/events.scss"
import Container from "react-bootstrap/Container"
import MainNav from "../MainNav"

const ErrorPage = () => {
  return (
    <div className="main">
      <MainNav />
      <Container>404 page!</Container>
    </div>
  )
}

export default ErrorPage
