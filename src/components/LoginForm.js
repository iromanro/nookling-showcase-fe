import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import "../styles/login.scss"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {
  userLogin,
  userRegister,
  userRecover,
  googleAuth,
} from "../actions/globalAction"

const LoginForm = () => {
  const dispatch = useDispatch()
  const [form, setForm] = useState("Login")
  const [userLoginEmail, setUserLoginEmail] = useState("")
  const [userLoginpass, setUserLoginPass] = useState("")
  const [userRegisterEmail, setUserRegisterEmail] = useState("")
  const [userRegisterpass, setUserRegisterPass] = useState("")
  const [resetEmail, setResetEmail] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [loginEmailErr, setLoginEmailErr] = useState("")
  const [registerEmailErr, setRegisterLoginEmailErr] = useState("")
  const [loginPassErr, setLoginPassErr] = useState("")
  const [confirmPassErr, setConfirmPassErr] = useState("")
  const [resetEmailErr, setResetEmailErr] = useState("")
  const [request, setRequest] = useState("")

  const resetErrors = () => {
    setLoginEmailErr("")
    setLoginPassErr("")
    setRegisterLoginEmailErr("")
    setConfirmPassErr("")
  }

  const resetForm = () => {
    setUserLoginEmail("")
    setUserLoginPass("")
    setUserRegisterEmail("")
    setUserRegisterPass("")
    setConfirmPass("")
    resetErrors()
  }

  useEffect(() => {
    if (request !== "") {
      switch (request.action) {
        case "Login":
          dispatch(userLogin(userLoginEmail, userLoginpass))
          resetForm()
          break
        case "Register":
          dispatch(userRegister(userRegisterEmail, userRegisterpass))
          resetForm()
          break
        case "Reset Password":
          dispatch(userRecover(resetEmail))
          resetForm()
          break
        default:
          break
      }
    }
  }, [request])

  const loading = useSelector((state) => state.global.isLoading)
  const createSuccessful = useSelector((state) => state.global.createSuccess)

  const changeLogin = () => {
    resetForm()
    resetErrors()
    setForm("Login")
  }

  useEffect(() => {
    if (createSuccessful) {
      changeLogin()
    }
  }, [createSuccessful])

  const changeReset = () => {
    resetForm()
    resetErrors()
    setForm("Reset Password")
  }

  const discordLogin = () => {
    if (process.env.NODE_ENV === "development") {
      window.location.href =
        "https://discordapp.com/api/oauth2/authorize?client_id=701531720817574118&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&response_type=code&scope=identify%20email"
    } else {
      window.location.href = `https://discordapp.com/api/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&redirect_uri=https%3A%2F%2Fnookling-showcase-fe.herokuapp.com%2Fauth&response_type=code&scope=identify%20email`
    }
  }

  const googleLogin = () => {
    dispatch(googleAuth())
  }

  const resetLoginForm = () => {
    setUserLoginEmail("")
    setUserLoginPass("")
  }

  const resetPasswordFields = () => {
    setUserRegisterPass("")
    setConfirmPass("")
  }

  const resetForgotPasswordEmail = () => {
    setResetEmail("")
  }

  const loader = (
    <div>
      <div className="d-flex justify-content-center">
        <div className="spinner-grow loader" role="status">
          <span className="sr-only">Loading</span>
        </div>
      </div>
    </div>
  )

  const submitForm = (e) => {
    const passReq = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/
    const emailReq = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let hasError = false
    resetErrors()

    switch (form) {
      case "Login": {
        if (userLoginEmail !== "") {
          if (userLoginEmail === "") {
            setLoginEmailErr("Email address is required!")
            resetLoginForm()
            hasError = true
          } else if (!emailReq.test(userLoginEmail)) {
            setLoginEmailErr("Please enter a valid email address")
            resetLoginForm()
            hasError = true
          }

          if (userLoginpass === "") {
            setLoginPassErr("Please enter a password")
            hasError = true
          }

          if (hasError) {
            e.preventDefault()
            break
          } else {
            const user = {
              email: userLoginEmail,
              password: userLoginpass,
            }

            setRequest({ action: "Login", user })

            e.preventDefault()
          }
        } else if (userRegisterEmail !== "") {
          if (!passReq.test(userRegisterpass)) {
            setConfirmPassErr(
              "Password must be at least 8 characters long and contain each of the following: 1 lowercase, 1 uppercase, and 1 digit."
            )
            resetPasswordFields()
            hasError = true
          } else if (userRegisterpass !== confirmPass) {
            setConfirmPassErr("Passwords do not match!")
            resetPasswordFields()
            hasError = true
          }

          if (userRegisterEmail === "") {
            setRegisterLoginEmailErr("Email address is required!")
            hasError = true
          } else if (!emailReq.test(userRegisterEmail)) {
            setRegisterLoginEmailErr("Please enter a valid email address")
            hasError = true
          }

          if (hasError) {
            e.preventDefault()
            break
          } else {
            const newUser = {
              email: userRegisterEmail,
              password: userRegisterpass,
            }

            setRequest({ action: "Register", newUser })

            e.preventDefault()
          }
        } else if (
          userLoginEmail === "" &&
          userLoginpass === "" &&
          userRegisterEmail === "" &&
          userRegisterpass === "" &&
          confirmPass === ""
        ) {
          e.preventDefault()
        }

        break
      }
      case "Reset Password":
        if (resetEmail === "") {
          setResetEmailErr("Email address is required!")
          resetForgotPasswordEmail()
          hasError = true
        } else if (!emailReq.test(resetEmail)) {
          setResetEmailErr("Please enter a valid email address")
          resetForgotPasswordEmail()
          hasError = true
        }

        if (hasError) {
          e.preventDefault()
          break
        } else {
          setRequest({ action: "Reset Password", resetEmail })

          e.preventDefault()
          break
        }
      default:
        break
    }
  }

  const loginForm = (
    <div>
      <Row className="justify-content-center align-items-center">
        <h5 className="py-1">{form}</h5>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col sm={12} md={6} className="py-2 form">
          <div className="success" />
          <div className="failure" />
          <Form>
            <Row className="form-row py-3">
              <Col>
                <input
                  type="email"
                  id="email-address"
                  className="form-control"
                  placeholder="Email Address"
                  value={userLoginEmail}
                  onChange={(e) => setUserLoginEmail(e.target.value)}
                />
              </Col>
            </Row>
            <div className="validation-message">{loginEmailErr}</div>
            <Row className="form-row py-3">
              <Col>
                <input
                  type="password"
                  className="form-control text-muted"
                  placeholder="Password"
                  value={userLoginpass}
                  onChange={(e) => setUserLoginPass(e.target.value)}
                />
              </Col>
            </Row>
            <div className="validation-message">{loginPassErr}</div>
            <Row className="py-1">
              <Col xs={12} className="submit-button">
                <Button
                  type="submit"
                  className="btn"
                  onClick={submitForm}
                  disabled={loading}
                >
                  {loading ? loader : "Login"}
                </Button>
              </Col>
            </Row>
            <Row className="link py-2">
              <div className="mx-2">
                <Button variant="link" onClick={changeReset}>
                  Forgot your password?
                </Button>
              </div>
            </Row>
            <Row className="pt-3">
              <Col xs={12} lg={6} className="discord-login my-2">
                <Button
                  className="btn"
                  disabled={loading}
                  onClick={() => discordLogin()}
                >
                  <img
                    alt="Discord Logo"
                    src="https://discordapp.com/assets/28174a34e77bb5e5310ced9f95cb480b.png"
                  />
                  {loading ? loader : "Log in with Discord"}
                </Button>
              </Col>
              <Col xs={12} lg={6} className="google-login my-2">
                <Button
                  className="btn"
                  disabled={loading}
                  onClick={() => googleLogin()}
                >
                  <img
                    alt="Google Logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  />
                  {loading ? loader : "Log in with Google"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <hr />
      <Row className="justify-content-center align-items-center">
        <h5 className="pt-4">New User?</h5>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col sm={12} md={6} className="py-4 form">
          <div className="failure" />
          <Form className="signup-validation" noValidate>
            <Row className="form-row py-3">
              <Col>
                <input
                  type="email"
                  id="register-email-address"
                  className="form-control"
                  placeholder="* Email Address"
                  value={userRegisterEmail}
                  onChange={(e) => setUserRegisterEmail(e.target.value)}
                  required
                />
                <div className="validation-message">{registerEmailErr}</div>
              </Col>
            </Row>
            <Row className="form-row py-3">
              <Col>
                <input
                  type="password"
                  className="form-control text-muted"
                  placeholder="* Password"
                  value={userRegisterpass}
                  onChange={(e) => setUserRegisterPass(e.target.value)}
                  required
                />
                <div className="validation-message">{confirmPassErr}</div>
              </Col>
            </Row>
            <Row className="form-row py-3">
              <Col>
                <input
                  type="password"
                  className="form-control text-muted"
                  placeholder="* Confirm password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  required
                />
                <div className="validation-message">{confirmPassErr}</div>
              </Col>
            </Row>
            <Row className="py-1">
              <Col xs={12} className="submit-button">
                <Button
                  type="submit"
                  className="btn"
                  onClick={submitForm}
                  disabled={loading}
                >
                  {loading ? loader : "Register"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  )

  const resetPasswordForm = (
    <div>
      <Row className="justify-content-center align-items-center">
        <h5 className="py-3">{form}</h5>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col sm={12} md={6} className="py-4 form">
          <Form>
            <Row className="form-row py-3">
              <div className="col">
                <input
                  type="email"
                  id="reset-email-address"
                  className="form-control"
                  placeholder="Email Address"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>
            </Row>
            <div className="validation-message">{resetEmailErr}</div>
            <Row className="py-1">
              <Col xs={12} className="submit-button">
                <Button
                  type="submit"
                  className="btn"
                  onClick={submitForm}
                  disabled={loading}
                >
                  {loading ? loader : "Reset Password"}
                </Button>
              </Col>
            </Row>
            <Row className="link py-2">
              <div className="mx-2">
                <Button variant="link" onClick={changeLogin}>
                  Back to Login
                </Button>
              </div>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  )

  const FORM_STATES = {
    Login: loginForm,
    "Reset Password": resetPasswordForm,
  }

  return <div className="login container my-5">{FORM_STATES[form]}</div>
}

export default LoginForm
