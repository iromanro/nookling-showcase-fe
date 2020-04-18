import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { confirmAuth } from '../../actions/globalAction'
import queryString from 'query-string'
import '../../styles/main.scss'
import MainNav from '../MainNav'

export const Auth = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    function authUser() {
      console.log(queryString.parse(props.location.search));
      var query = queryString.parse(props.location.search);
      var code = query.code;
      console.log("Code in code: ", code);

      dispatch(confirmAuth(code));
    }

    authUser();
  }, []);

  return(
    <div className="main">
      <MainNav />

    </div>
  )
}

export default Auth;