/* eslint-disable no-lonely-if */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import firebase from "firebase"
import { useDropzone } from "react-dropzone"
import "../../styles/settings.scss"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { v4 as uuidv4 } from "uuid"
import { getUserSettings, updateUserSettings } from "../../actions/globalAction"
import FullScreenLoader from "../FullScreenLoader"
import ToastMessage from "../ToastMessage"
import MainNav from "../MainNav"

library.add(faEdit)

const reader = new FileReader()
const storage = firebase.storage()
let mediaStorageRef = storage.ref().child("")

const Settings = () => {
  const dispatch = useDispatch()
  const [discordHide, setDiscordHide] = useState("")
  const [loadingImages, setLoadingImages] = useState(false)
  const [updatedDisplayPicture, setUpdatedDisplayPicture] = useState(null)
  const [fileError, setFileError] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [twitterName, setTwitterName] = useState("")
  const [instagramName, setInstagramName] = useState("")
  const [twitchName, setTwitchName] = useState("")
  const [friendCode, setFriendCode] = useState("")
  const [friendCodeError, setFriendCodeError] = useState(false)
  const [changeMade, setChangeMade] = useState(false)
  const user = useSelector((state) => state.global.user)
  const settings = useSelector((state) => state.global.settings)
  const isLoading = useSelector((state) => state.global.isLoading)

  const onDrop = useCallback((acceptedFiles) => {
    let tempFile = null
    setLoadingImages(true)

    acceptedFiles.forEach((file) => {
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {}

      if (file.size <= 11000000) {
        console.log(file)
        tempFile = file

        if (fileError !== "") {
          setFileError("")
        }
      } else {
        setFileError("One or more files is too big! Max allowed size is 10MB.")
      }
    })

    setLoadingImages(false)
    setChangeMade(true)
    setUpdatedDisplayPicture(tempFile)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    maxSize: 10000000,
  })

  useEffect(() => {
    function fetchSettings() {
      dispatch(getUserSettings())
    }

    fetchSettings()
  }, [])

  useEffect(() => {
    if (settings != null) {
      setDisplayName(settings.displayName)
      setTwitterName(settings.twitter)
      setInstagramName(settings.instagram)
      setTwitchName(settings.twitch)
      setDiscordHide(settings.hideDiscord)
      setFriendCode(settings.switchFriendCode)
      setChangeMade(false)
    }
  }, [settings])

  const displayNameUpdate = (input) => {
    setDisplayName(input)

    if (!changeMade) {
      setChangeMade(true)
    }
  }

  const twitterUpdate = (input) => {
    setTwitterName(input)

    if (!changeMade) {
      setChangeMade(true)
    }
  }

  const instagramUpdate = (input) => {
    setInstagramName(input)

    if (!changeMade) {
      setChangeMade(true)
    }
  }

  const twitchUpdate = (input) => {
    setTwitchName(input)

    if (!changeMade) {
      setChangeMade(true)
    }
  }

  const switchNameUpdate = (input) => {
    const regex = /\d{4}-\d{4}-\d{4}/g
    if (input.length <= 14) {
      if (input.match(regex)) {
        setFriendCodeError(false)
        setFriendCode(input)
      } else {
        setFriendCodeError(true)
        setFriendCode(input)
      }
    }

    if (!changeMade) {
      setChangeMade(true)
    }
  }

  const toggleDiscordHide = () => {
    setDiscordHide(!discordHide)

    if (!changeMade) {
      setChangeMade(true)
    }
  }

  const saveSettings = (e) => {
    if (friendCodeError || !changeMade) {
      e.preventDefault()
    } else {
      if (updatedDisplayPicture) {
        const filename = uuidv4()
        mediaStorageRef = storage.ref().child(`avatar/${user.uuid}/${filename}`)
        mediaStorageRef
          .put(updatedDisplayPicture)
          .then((uploadedFile) => {
            if (uploadedFile) {
              console.log(uploadedFile.metadata.fullPath)
              mediaStorageRef = storage
                .ref()
                .child(uploadedFile.metadata.fullPath)
              return mediaStorageRef.getDownloadURL()
            }
          }).then((downloadedFile) => {
            console.log("Final File: ", downloadedFile)

            const changedSettings = {
              hideDiscord: discordHide,
              displayName,
              avatar: downloadedFile,
              twitter: twitterName.replace(/\s+/g, ""),
              instagram: instagramName.replace(/\s+/g, ""),
              twitch: twitchName.replace(/\s+/g, ""),
              switchFriendCode: friendCode,
            }

            dispatch(updateUserSettings(changedSettings))
          })
      } else {
        const changedSettings = {
          hideDiscord: discordHide,
          displayName,
          twitter: twitterName.replace(/\s+/g, ""),
          instagram: instagramName.replace(/\s+/g, ""),
          twitch: twitchName.replace(/\s+/g, ""),
          switchFriendCode: friendCode,
        }

        dispatch(updateUserSettings(changedSettings))
      }
    }
  }

  return (
    <div className="main">
      <MainNav />
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <Container className="settings">
          {settings != null && (
            <Row className="user-info">
              <Col xs={12} className="display-info">
                <Row>
                  {updatedDisplayPicture ? (
                    <Image
                      src={URL.createObjectURL(updatedDisplayPicture)}
                      roundedCircle
                    />
                  ) : (
                    <Image src={settings.avatar} roundedCircle />
                  )}
                </Row>
                <Row className="file-uploader" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <FontAwesomeIcon icon={faEdit} />
                </Row>
                {fileError !== "" && <Row className="error">{fileError}</Row>}
                {settings.discordSync === true && (
                  <Row className="username">
                    {settings.username}#{settings.discriminator}
                  </Row>
                )}
              </Col>
              <Col xs={12} sm={6} lg={6} className="display-name px-3">
                <Form>
                  <Form.Group controlId="formDisplayName">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Display Name"
                      maxLength={24}
                      value={displayName}
                      onChange={(e) => displayNameUpdate(e.target.value)}
                    />
                    <Form.Text className="sublabel">
                      Customize your display name!
                    </Form.Text>
                    {settings.discordSync === true && (
                      <div>
                        <Form.Check
                          type="switch"
                          id="hide-discord-username"
                          label=""
                          onChange={() => toggleDiscordHide()}
                          checked={discordHide}
                        />
                        <Form.Text className="sublabel">
                          Hide discord username
                        </Form.Text>
                      </div>
                    )}
                  </Form.Group>
                </Form>
              </Col>
              <Col xs={12} sm={6} lg={6} className="socials">
                <Form>
                  <Form.Group controlId="formTwitter">
                    <Form.Label>Twitter</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Twitter username"
                      maxLength={15}
                      value={twitterName}
                      onChange={(e) => twitterUpdate(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col>
                <Form>
                  <Form.Group controlId="formInstagram">
                    <Form.Label>Instagram</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Instagram Username"
                      maxLength={30}
                      value={instagramName}
                      onChange={(e) => instagramUpdate(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col xs={12} sm={6} lg={6}>
                <Form>
                  <Form.Group controlId="formTwitch">
                    <Form.Label>Twitch</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Twitch Username"
                      maxLength={30}
                      value={twitchName}
                      onChange={(e) => twitchUpdate(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col xs={12} sm={6} lg={6}>
                <Form>
                  <Form.Group controlId="formSwitchFriendCode">
                    <Form.Label>Switch Friend Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="xxxx-xxxx-xxxx"
                      onChange={(e) => switchNameUpdate(e.target.value)}
                      maxLength={15}
                      value={friendCode}
                    />
                    {friendCodeError && (
                      <Form.Text className="error">
                        Format: xxxx-xxxx-xxxx
                      </Form.Text>
                    )}
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          )}
          {settings != null && (
            <Row className="save-settings my-2">
              <Button onClick={saveSettings}>Save</Button>
            </Row>
          )}
        </Container>
      )}
      <ToastMessage />
    </div>
  )
}

export default Settings
