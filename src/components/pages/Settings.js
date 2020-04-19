import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getUserSettings } from '../../actions/globalAction'
import history from '../../history'
import queryString from 'query-string'
import '../../styles/main.scss'
import FullScreenLoader from '../FullScreenLoader'
import { compose } from 'redux'

export const Settings = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    function fetchSettings() {

    }

    fetchSettings()
  }, [])

  return(
    <div className="main">

    </div>
  )
}

export default Settings;