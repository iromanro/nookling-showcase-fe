import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Toast from 'react-bootstrap/Toast';

const ToastMessage = (props) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);
  const toastErr = useSelector(state => state.global.toastErr);
  const toastMsg = useSelector(state => state.global.toastMsg);

  useEffect(() => {
    if(toastMsg != "") {
      toggleShow();
    }
  }, [toastMsg])

  return (
  <Toast className={`${toastErr ? 'error' : ''}`} show={show} onClose={toggleShow} delay={5000} autohide>
    <Toast.Body>{toastMsg}</Toast.Body>
  </Toast>
  ); 
}

export default ToastMessage;