import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import "../../styles/profile.scss"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { getUserProfile } from "../../actions/globalAction"
import FullScreenLoader from "../FullScreenLoader"
import ToastMessage from "../ToastMessage"
import MainNav from "../MainNav"
import ResultsList from "../ResultsList"
import history from "../../history"

const Profile = () => {
  const dispatch = useDispatch()
  const [homeType, setHomeType] = useState(true)
  const [islandType, setIslandType] = useState(true)
  const [patternType, setPatternType] = useState(true)
  const [sortType, setSortType] = useState(true)
  const [publicProfile, ssetPublicProfile] = useState(true)
  const isLoading = useSelector((state) => state.global.isLoading)
  const profile = useSelector((state) => state.global.profile)
  const creations = useSelector((state) => state.global.creations)

  useEffect(() => {
    function fetchProfile() {
      const pathArray = window.location.pathname.split("/")
      if (pathArray[2]) {
        dispatch(getUserProfile(pathArray[2]))
      } else {
        ssetPublicProfile(false)
        dispatch(getUserProfile(""))
      }
    }

    fetchProfile()
  }, [])

  const selectType = (value) => {
    switch (value) {
      case "home":
        setHomeType(!homeType)
        break
      case "island":
        setIslandType(!islandType)
        break
      case "pattern":
        setPatternType(!patternType)
        break
      default:
        break
    }
  }

  const selectSort = (value) => {
    setSortType(value)
  }

  const goTo = (path) => {
    history.push(path)
  }

  return (
    <div className="main">
      <MainNav />
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <Container className="profile">
          <Col>
            {profile && (
              <Row xs={12} className="user-info">
                <Col xs={12} sm={2} className="display-info">
                  <Row>
                    <Image
                      src="https://discordapp.com/assets/28174a34e77bb5e5310ced9f95cb480b.png"
                      roundedCircle
                    />
                  </Row>
                  {profile.username && (
                    <Row className="username">
                      {profile.username}#{profile.discriminator}
                    </Row>
                  )}
                </Col>
                <Col xs={12} md={8} className="socials">
                  <Row xs={12} className="display-name my-2">
                    <Col xs={12}>
                      <h1>
                        {profile.displayName
                          ? `${profile.displayName}`
                          : "Young Nookling"}
                      </h1>
                    </Col>
                  </Row>
                  <Row xs={12}>
                    <Col xs={12}>
                      {profile.twitter !== "" && (
                        <Row>
                          <a
                            href={`https://www.twitter.com/${profile.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Twitter
                          </a>
                        </Row>
                      )}
                      {profile.instagram !== "" && (
                        <Row>
                          <a
                            href={`https://www.instagram.com/${profile.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Instagram
                          </a>
                        </Row>
                      )}
                      {profile.twitch !== "" && (
                        <Row>
                          <a
                            href={`https://www.twitch.tv/${profile.twitch}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Twitch
                          </a>
                        </Row>
                      )}
                      {profile.friendCode !== "" && (
                        <Row>{`Friend Code: SW-${profile.friendCode}`}</Row>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
            <Row xs={12} className="filters">
              <Col xs={12}>
                <Form.Row className="type-selection my-2">
                  <Form.Check
                    className="checkbox"
                    type="checkbox"
                    label="Homes"
                    name="formHorizontalcheckboxs"
                    value="home"
                    checked={homeType}
                    onChange={(e) => selectType(e.target.value)}
                  />
                  <Form.Check
                    className="checkbox"
                    type="checkbox"
                    label="Islands"
                    name="formHorizontalcheckboxs"
                    value="island"
                    checked={islandType}
                    onChange={(e) => selectType(e.target.value)}
                  />
                  <Form.Check
                    className="checkbox"
                    type="checkbox"
                    label="Patterns"
                    name="formHorizontalcheckboxs"
                    value="pattern"
                    checked={patternType}
                    onChange={(e) => selectType(e.target.value)}
                  />
                </Form.Row>
                <Form.Row className="sort-selection my-2">
                  <Form.Group as={Col} controlId="formGridSort">
                    <Form.Control
                      as="select"
                      value={sortType}
                      onChange={(e) => selectSort(e.target.value)}
                    >
                      <option value="Latest">Sort: Latest</option>
                      <option value="Oldest">Sort: Oldest</option>
                      <option value="Popular">Sort: Most Popular</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
              </Col>
              <Col xs={12} className="submit-button">
                <Button>Search</Button>
              </Col>
            </Row>
            <Row xs={12} className="submissions">
              {creations.length > 0 ? (
                <ResultsList results={creations} />
              ) : (
                <Row xs={12} className="no-results">
                  <Col>
                    {publicProfile ? (
                      <Row className="my-3">
                        This user hasn&apos;t posted anything!
                      </Row>
                    ) : (
                      <Row className="my-3">
                        You haven&apos;t posted anything yet!
                      </Row>
                    )}
                    {!publicProfile && (
                      <Row className="my-3">
                        <Button onClick={() => goTo("/create")}>
                          Make something
                        </Button>
                      </Row>
                    )}
                  </Col>
                  )
                </Row>
              )}
            </Row>
          </Col>
        </Container>
      )}
      <ToastMessage />
    </div>
  )
}

export default Profile
