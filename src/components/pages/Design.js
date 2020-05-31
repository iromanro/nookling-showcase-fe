/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import "../../styles/design.scss"
import _ from "lodash"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import Carousel from "react-bootstrap/Carousel"
import Collapse from "react-bootstrap/Collapse"
import ListGroup from "react-bootstrap/ListGroup"
import FormControl from "react-bootstrap/FormControl"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons"
import { faHeart as heartOutline } from "@fortawesome/free-regular-svg-icons"
import {
  getDesign,
  likeDesign,
  itemSearch,
  clearItemSearch,
  addItemToDesign,
  removeItemFromDesign,
} from "../../actions/globalAction"
import MainNav from "../MainNav"
import CarouselSelector from "../CarouselSelector"
import FullScreenLoader from "../FullScreenLoader"
import ToastMessage from "../ToastMessage"
import history from "../../history"

library.add(fab, heartSolid, heartOutline)

const Design = () => {
  const dispatch = useDispatch()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(null)
  const [guestLike, setGuestLike] = useState(false)
  const [open, setOpen] = useState(false)
  const [searchTerm, setsearchTerm] = useState("")
  const [canAddFurniture, setCanAddFurniture] = useState(false)
  const [canEditPost, setCanEditPost] = useState(false)
  const [furnitureList, setFurnitureList] = useState([])
  const user = useSelector((state) => state.global.user)
  const design = useSelector((state) => state.global.design)
  const furniture = useSelector((state) => state.global.furniture)
  const designLiked = useSelector((state) => state.global.designLiked)
  const likes = useSelector((state) => state.global.likes)
  const results = useSelector((state) => state.global.itemResults)
  const isSearching = useSelector((state) => state.global.isSearching)
  const isLoading = useSelector((state) => state.global.isLoading)

  useEffect(() => {
    const pathArray = window.location.pathname.split("/")
    dispatch(getDesign(pathArray[2]))
  }, [])

  useEffect(() => {
    if (design && user) {
      if (design.user && design.user.uuid === user.uuid) {
        setCanEditPost(true)
        setCanAddFurniture(true)
      } else if (design.allowContributions) {
        setCanAddFurniture(true)
      }
    }
  }, [design, user])

  useEffect(() => {
    function overrideLikeIcon() {
      if (!user.isAuthenticated) {
        setGuestLike(true)
      }
    }

    overrideLikeIcon()
  }, [user])

  const debounceSearch = useRef(
    _.debounce((searchTermRef) => {
      const term = searchTermRef.trim().toLowerCase()
      if (term !== "" && term.length > 1) {
        dispatch(itemSearch(term))
      } else if (term === "") {
        dispatch(clearItemSearch())
      }
    }, 1500)
  )

  useEffect(() => {
    debounceSearch.current(searchTerm)
  }, [searchTerm])

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
    setDirection(e.direction)
  }

  const goToIndex = (newIndex) => {
    setIndex(newIndex)
  }

  const toggleLike = () => {
    if (user.isAuthenticated) {
      dispatch(likeDesign(design.uuid))
    }
  }

  const addItem = (item) => {
    const designId = window.location.pathname.split("/")[2]
    dispatch(addItemToDesign(designId, item))
    setsearchTerm("")
  }

  const removeItem = (item) => {
    const designId = window.location.pathname.split("/")[2]
    dispatch(removeItemFromDesign(designId, item))
  }

  useEffect(() => {
    if (furnitureList !== furniture) {
      const list = []

      furniture.forEach((item, i) => {
        list.push(
          <ListGroup.Item key={`${i}-${item}`}>
            <Col xs={8}>
              <Image src={item.image} className="mx=2" />
              {item.name}
            </Col>
            <Col xs={4} className="remove">
              {design.uer && design.user.uuid === user.uuid && (
                <Button variant="link" onClick={() => removeItem(item.uuid)}>
                  X
                </Button>
              )}
            </Col>
          </ListGroup.Item>
        )
      });
      setFurnitureList(list)
    }
  }, [furniture])


  return (
    <div className="main">
      {isLoading && <FullScreenLoader />}
      <MainNav />
      {design && (
        <Container>
          <div className="post">
            <Container id="top-section">
              <Col className="name">
                <h1>{design.name}</h1>
              </Col>
              <Col id="like">
                <Button onClick={() => toggleLike()}>
                  {designLiked || guestLike ? (
                    <FontAwesomeIcon icon={heartSolid} />
                  ) : (
                    <FontAwesomeIcon className="liked" icon={heartOutline} />
                  )}
                </Button>
                <span className="count">{likes}</span>
              </Col>
              {canEditPost && (
                <Button
                  variant="link"
                  onClick={() =>
                    history.push(
                      `/post/${window.location.pathname.split("/")[2]}`
                    )
                  }
                >
                  Edit Post
                </Button>
              )}
            </Container>
            <Row>
              {design.images && (
                <Row id="carousel-container">
                  <Row xs={12}>
                    <Col xs={12} className="preview">
                      <Carousel
                        activeIndex={index}
                        direction={direction}
                        onSelect={handleSelect}
                        interval={null}
                        id="carousel"
                      >
                        {design.images.map((image, i) => {
                          return (
                            <Carousel.Item key={`carousel-item-${i}`}>
                              <img
                                className="d-block w-100 image"
                                alt="Design preview"
                                src={image.path}
                              />
                            </Carousel.Item>
                          )
                        })}
                      </Carousel>
                    </Col>
                  </Row>
                  <Row xs={12} className="selector">
                    <CarouselSelector
                      images={design.images}
                      goTo={goToIndex}
                      index={index}
                    />
                  </Row>
                </Row>
              )}
              <Row className="design-info my-4">
                <Col xs={12} sm={4} className="profile-picture">
                  <Row xs={12} className="picture">
                    <Image src={design.user.avatar} roundedCircle />
                  </Row>
                  <Row xs={12} className="display-name my-2">
                    {design.user && <Row>{design.user.display_name}</Row>}
                  </Row>
                </Col>
                <Col xs={12} sm={8} className="stats">
                  <Row id="description">{design.description}</Row>
                  <Row className="tag-list mt-4 ">
                    {design.tags &&
                      design.tags.map((tag, tagIndex) => {
                        return (
                          <Col className="tag my-2" key={`tag-${tagIndex}`}>
                            <Button href="#">{tag}</Button>
                          </Col>
                        )
                    })}
                  </Row>
                  <Row id="show-furniture">
                    <Button
                      onClick={() => setOpen(!open)}
                      variant="link"
                      aria-controls="show furniture"
                      aria-expanded={open}
                    >
                      {open ? "Hide items" : "View items"}
                    </Button>
                  </Row>
                  {canAddFurniture && (
                    <Row xs={12} id="furniture-search">
                      <Collapse in={open} className="my-1 px-1">
                        <Col>
                          <Row xs={12} className="form">
                            <FormControl
                              className=""
                              placeholder="Search for an item"
                              onChange={(e) => setsearchTerm(e.target.value)}
                              value={searchTerm}
                            />
                          </Row>
                          <Row xs={12} className="select">
                            {results.length === 0 ? (
                              <ListGroup>
                                {isSearching ? (
                                  <ListGroup.Item>Searching...</ListGroup.Item>
                                ) : (
                                  searchTerm !== "" &&
                                  results.length === 0 && (
                                    <ListGroup.Item>
                                      No items found
                                    </ListGroup.Item>
                                  )
                                )}
                              </ListGroup>
                            ) : (
                              <ListGroup>
                                {results.map((result) => {
                                  return (
                                    <ListGroup.Item
                                      action
                                      onClick={()=> addItem(result.uuid)}
                                      key={`${result.name}`}
                                    >
                                      <Image src={result.image} className="mx=2" />
                                      {result.name}
                                    </ListGroup.Item>
                                  )
                                })}
                              </ListGroup>
                            )}
                          </Row>
                        </Col>
                      </Collapse>
                    </Row>
                  )}
                  <Row xs={12} id="furniture-list">
                    <Collapse in={open} className="my-1">
                      <ListGroup>{furnitureList}</ListGroup>
                    </Collapse>
                  </Row>
                </Col>
              </Row>
            </Row>
          </div>
          <Row className="comments">

          </Row>
        </Container>
      )}
      <ToastMessage />
    </div>
  )
}

export default Design
