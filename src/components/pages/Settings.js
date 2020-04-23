import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getUserSettings, updateUserSettings } from '../../actions/globalAction'
import '../../styles/settings.scss'
import FullScreenLoader from '../FullScreenLoader'
import ToastMessage from '../ToastMessage'
import MainNav from '../MainNav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const Settings = (props) => {
  const dispatch = useDispatch()
  const [discordHide, setDiscordHide] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [twitterName, setTwitterName] = useState("")
  const [instagramName, setInstagramName] = useState("")
  const [friendCode, setFriendCode] = useState("")
  const [friendCodeError, setFriendCodeError] = useState(false)
  const [changeMade, setChangeMade] = useState(false)
  const settings = useSelector(state => state.global.settings)
  const isLoading = useSelector(state => state.global.isLoading)

  useEffect(() => {
    function fetchSettings() {
      dispatch(getUserSettings())
    }

    fetchSettings()
  }, [])

  useEffect(() => {
    if(settings != null) {
      setDisplayName(settings.displayName)
      setTwitterName(settings.twitter)
      setInstagramName(settings.instagram)
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

  const switchNameUpdate = (input) => {
    const regex = /\d{4}-\d{4}-\d{4}/g;
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
      e.preventDefault();
    } else {
      let settings = {
        hideDiscord: discordHide,
        displayName: displayName.replace(/\s+/g, ''),
        twitter: twitterName.replace(/\s+/g, ''),
        instagram: instagramName.replace(/\s+/g, ''),
        switchFriendCode: friendCode,
      }

      dispatch(updateUserSettings(settings))
    }
  }



  return(
    <div className="main">
      <MainNav />
      {isLoading ? 
        <FullScreenLoader/> :
        <Container className="settings">
          {settings != null ?
            <Row className="user-info">
              <Col xs={12}className="display-info">
                <Row>
                  <Image src="https://discordapp.com/assets/28174a34e77bb5e5310ced9f95cb480b.png" roundedCircle />
                </Row>
                {settings.discordSync === true ? 
                <Row className="username">
                  {settings.username}#{settings.discriminator}
                </Row>
                : '' }
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
                      onChange={e => displayNameUpdate(e.target.value)}
                    />
                    <Form.Text className="sublabel">
                      Customize your display name!
                    </Form.Text>
                    {settings.discordSync === true ?
                    <Form.Check 
                      type="switch"
                      id="hide-discord-username"
                      label="Hide discord username"
                      onChange={() => toggleDiscordHide()}
                      checked={discordHide ? true : false}
                    /> : '' }
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
                      onChange={e => twitterUpdate(e.target.value)}
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
                      onChange={e => instagramUpdate(e.target.value)}
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
                      onChange={e => switchNameUpdate(e.target.value)}
                      maxLength={15}
                      value={friendCode}
                    />
                    {friendCodeError ?
                      <Form.Text className="error">
                        Format: xxxx-xxxx-xxxx
                      </Form.Text> : ''
                    }
                  </Form.Group>
                </Form>
              </Col>
            </Row> : ''
          }
          {settings != null &&
            <Row className="save-settings my-2">
              <Button
                onClick={saveSettings}
              >
                Save
              </Button>
            </Row>
          }
        </Container>
      }
      <ToastMessage />
    </div>
  )
}

export default Settings;