import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Toast from "react-bootstrap/Toast"
import { clearToast } from "../actions/globalAction"

const ToastMessage = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)

  const toggleShow = () => {
    if (show) {
      dispatch(clearToast())
    }

    setShow(!show)
  }

  const toastErr = useSelector((state) => state.global.toastErr)
  const toastMsg = useSelector((state) => state.global.toastMsg)

  useEffect(() => {
    if (show) {
      dispatch(clearToast())
    }

    if (toastMsg !== "") {
      console.log(toastMsg)
      toggleShow()
    }
  }, [toastMsg])

  return (
    <Toast
      className={`${toastErr ? "error" : ""}`}
      show={show}
      onClose={toggleShow}
      delay={5000}
      autohide
    >
      <Toast.Body>{toastMsg}</Toast.Body>
    </Toast>
  )
}

export default ToastMessage
