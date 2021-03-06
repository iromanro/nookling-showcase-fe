/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import firebase from "firebase"
import { useDropzone } from "react-dropzone"
import "../../styles/createPost.scss"
import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import { v4 as uuidv4 } from "uuid"
import {
  submitPost,
  updatePost,
  deletePost,
  loadExistingPost,
} from "../../actions/globalAction"
import MainNav from "../MainNav"
import ToastMessage from "../ToastMessage"
import ConfirmationModal from "../ConfirmationModal"
import FullScreenLoader from "../FullScreenLoader"

const reader = new FileReader()
const storage = firebase.storage()
let mediaStorageRef = storage.ref().child("")

const CreatePost = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.global.isLoading)
  const design = useSelector((state) => state.global.design)
  const [filePreviews, setFilePreviews] = useState([])
  const [newFiles, setNewFiles] = useState([])
  const [designName, setDesignName] = useState("")
  const [designType, setDesignType] = useState("Home")
  const [designTags, setDesignTags] = useState([])
  const [description, setDescription] = useState("")
  const [fileError, setFileError] = useState("")
  const [designNameError, setDesignNameError] = useState("")
  const [loadingImages, setLoadingImages] = useState(false)
  const [canUpload, setCanUpload] = useState(true)
  const [allowContribution, setAllowContribution] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    const tempFiles = []
    setLoadingImages(true)

    acceptedFiles.forEach((file) => {
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {}

      if (file.size <= 21000000) {
        tempFiles.push({
          file,
          name: "",
          new: true,
        })
      } else {
        setFileError("One or more files is too big! Max allowed size is 20MB.")
      }
    })

    if (filePreviews.length >= 20 && canUpload) {
      setCanUpload(false)
    } else if (filePreviews.length < 20 && !canUpload) {
      setCanUpload(true)
    }

    setLoadingImages(false)
    setNewFiles(tempFiles)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, video/mp4",
    maxSize: 20000000,
  })

  useEffect(() => {
    const tempFiles = [...filePreviews]

    newFiles.forEach((file) => {
      tempFiles.push(file)
    })

    setFilePreviews(tempFiles)
  }, [newFiles])

  useEffect(() => {
    if (window.location.pathname.split("/")[2]) {
      const uuid = window.location.pathname.split("/")[2]
      dispatch(loadExistingPost(uuid))
    }
  }, [])

  useEffect(() => {
    if (design) {
      setIsEditing(true)
      setDesignName(design.designName)
      setDesignType(design.designType)
      setDesignTags(design.designTags)
      setDescription(design.description)
      setAllowContribution(design.allowContribution)
      setFilePreviews(design.images)
    }
  }, [design])

  const updateFilensame = (input, index) => {
    const tempPreviews = [...filePreviews]
    tempPreviews[index].name = input
  }

  const updateDesignName = (input) => {
    setDesignName(input)
  }

  const toggleContributionValue = () => {
    setAllowContribution(!allowContribution)
  }

  const updateDescription = (input) => {
    if (input.length <= 400) {
      setDescription(input)
    }
  }

  const moveImageLeft = (index) => {
    const tempList = [...filePreviews]
    const shift = tempList.splice(index, 1)[0]
    tempList.splice(index - 1, 0, shift)
    setFilePreviews(tempList)
  }

  const moveImageRight = (index) => {
    const tempList = [...filePreviews]
    const shift = tempList.splice(index, 1)[0]
    tempList.splice(index + 1, 0, shift)
    setFilePreviews(tempList)
  }

  const removeImage = (index) => {
    const tempList = [...filePreviews]
    const shift = tempList.splice(index, 1)[0]
    setFilePreviews(tempList)
  }

  const clearErrors = () => {
    setDesignNameError("")
    setFileError("")
  }

  const submitNewPost = () => {
    clearErrors()
    let hasErrors = false

    if (filePreviews.length > 0) {
      if (designName === "") {
        setDesignNameError("Please enter a name for your design!")
        hasErrors = true
      }
    } else {
      setFileError("Please upload at least one file!")
      hasErrors = true
    }

    if (!hasErrors) {
      let folder = ""
      if (isEditing) {
        folder = design.uuid
      } else {
        folder = uuidv4()
      }

      Promise.all(
        filePreviews.map((image) => {
          if (image.new) {
            const filename = uuidv4()
            mediaStorageRef = storage.ref().child(`media/${folder}/${filename}`)
            return mediaStorageRef.put(image.file)
          }
        })
      ).then((uploadedFiles) => {
        Promise.all(
          uploadedFiles.map((file) => {
            if (file) {
              mediaStorageRef = storage.ref().child(file.metadata.fullPath)
              return mediaStorageRef.getDownloadURL()
            }
          })
        ).then((downloadedFiles) => {
          const files = []

          filePreviews.forEach((file, index) => {
            if (file.new) {
              const newFile = {
                path: downloadedFiles[index],
                name: filePreviews[index].name,
              }

              files.push(newFile)
            } else {
              files.push(file)
            }
          })

          if (isEditing) {
            dispatch(
              updatePost(
                folder,
                files,
                designName,
                designTags,
                description,
                allowContribution
              )
            )
          } else {
            dispatch(
              submitPost(
                folder,
                files,
                designName,
                designType,
                designTags,
                description,
                allowContribution
              )
            )
          }
        })
      })
    }
  }

  const toggleConfirmationModal = useCallback(() => {
    setShowConfirmationModal(!showConfirmationModal)
  }, [showConfirmationModal])

  const deleteCurrentPost = useCallback(() => {
    if (design) {
      console.log("WE DELETING")
      dispatch(deletePost(design.uuid))
    }
  }, [design])

  const addTag = (event) => {
    event.preventDefault()
    if (
      event.key === "Enter" &&
      event.target.value !== "" &&
      designTags.length <= 9
    ) {
      setDesignTags([...designTags, event.target.value.trim()])
      event.target.value = ""
    }
  }

  const removeTag = (index) => {
    setDesignTags([
      ...designTags.filter((tag) => designTags.indexOf(tag) !== index),
    ])
  }

  const selectType = (input) => {
    switch (input) {
      case "Home":
        setDesignType(input)
        break
      case "Island":
        setDesignType(input)
        break
      case "Pattern":
        setDesignType(input)
        break
      default:
        break
    }
  }

  return (
    <div className="main">
      {isLoading && <FullScreenLoader />}
      <MainNav />
      <ConfirmationModal
        show={showConfirmationModal}
        toggle={toggleConfirmationModal}
        confirm={deleteCurrentPost}
      />
      <Container>
        <Row className="main-content">
          <Col xs={12} lg={6} className="file-uploader">
            <h1 className={`${!canUpload ? "hide" : ""}`}>File Upload</h1>
            <Row xs={5} className={`dropzone my-2 ${!canUpload ? "hide" : ""}`}>
              <Col xs={12} {...getRootProps()}>
                <input {...getInputProps()} />
                <p className="drop-text">
                  Drag and drop or interact to select files. Max 20 files and
                  20MB file size.
                </p>
              </Col>
            </Row>
            {fileError !== "" && <Row className="error">{fileError}</Row>}
            <Row xs={5} className={`file ${loadingImages ? "center" : ""}`}>
              {loadingImages && (
                <Row xs={12} className="d-flex justify-content-center loader">
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </Row>
              )}
              {filePreviews.map((image, index) => {
                return (
                  <Col xs={6} className="preview my-2" key={`file-${index}`}>
                    {index === 0 ? (
                      <Row xs={12} className="position-label">
                        Preview Image
                      </Row>
                    ) : (
                      <Row xs={12} className="position-label">
                        Image {index + 1}
                      </Row>
                    )}
                    <Row xs={12} className="thumbnail">
                      <Button onClick={() => removeImage(index)}>x</Button>
                      {image.file ? (
                        <Image src={URL.createObjectURL(image.file)} />
                      ) : (
                        <Image src={image.path} />
                      )}
                    </Row>
                    <Row xs={12} className="name">
                      <Form
                        className="design"
                        onSubmit={(e) => {
                          e.preventDefault()
                        }}
                      >
                        <Form.Group controlId="formDisplayName">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Describe your image"
                            maxLength={140}
                            value={image.name}
                            onChange={(e) =>
                              updateFilensame(e.target.value, index)
                            }
                          />
                        </Form.Group>
                      </Form>
                    </Row>
                    <Row xs={12} className="sort">
                      {index > 0 && (
                        <Button
                          className="mx-4"
                          onClick={() => moveImageLeft(index)}
                        >
                          &lt;
                        </Button>
                      )}
                      {index <= filePreviews.length - 1 && (
                        <Button
                          className="mx-4"
                          onClick={() => moveImageRight(index)}
                        >
                          &gt;
                        </Button>
                      )}
                    </Row>
                  </Col>
                )
              })}
            </Row>
          </Col>
          <Col xs={12} lg={6} className="info">
            <Row xs={12}>
              <Col xs={6} className="name">
                <Form
                  onSubmit={(e) => {
                    e.preventDefault()
                  }}
                >
                  <Form.Group controlId="formDisplayName">
                    <Form.Label>Design Name</Form.Label>
                    <Form.Control
                      // type="text"
                      placeholder="Name your design"
                      maxLength={40}
                      value={designName}
                      onChange={(e) => updateDesignName(e.target.value)}
                    />
                    {designNameError !== "" && (
                      <Form.Text className="error">{designNameError}</Form.Text>
                    )}
                  </Form.Group>
                </Form>
              </Col>
              <Col xs={6} className="type">
                <Form
                  onSubmit={(e) => {
                    e.preventDefault()
                  }}
                >
                  <Form.Group as={Col} controlId="formGridSort">
                    <Form.Label>Design Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={designType}
                      disabled={isEditing}
                      onChange={(e) => selectType(e.target.value)}
                    >
                      <option value="Home">Home</option>
                      <option value="Island">Island</option>
                      <option value="Pattern">Pattern</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row xs={12} className="tags">
              <ul className="list">
                {designTags &&
                  designTags.map((tag, index) => (
                    <li className="tag" key={`tag-${index}`}>
                      <span>{tag}</span>
                      <Button
                        className="close ml-1"
                        onClick={() => removeTag(index)}
                      >
                        x
                      </Button>
                    </li>
                  ))}
              </ul>
              <Form
                onSubmit={(e) => {
                  e.preventDefault()
                }}
                id="tag-input"
              >
                <Form.Label>Tags</Form.Label>
                {designTags && (
                  <Form.Control
                    type="text"
                    onKeyUp={(e) => addTag(e)}
                    placeholder={
                      designTags.length === 10
                        ? "Maximum allowed tags added"
                        : "Press enter to add tag"
                    }
                    disabled={designTags.length === 10}
                  />
                )}
              </Form>
            </Row>
            <Row xs={12} id="contributions-checkbox">
              <Form>
                <Form.Group id="allow-checkbox">
                  <Form.Check
                    name="allow-contributions"
                    label="Allow furniture contributions"
                    htmlFor="allow-checkbox"
                    onChange={() => toggleContributionValue()}
                    checked={allowContribution}
                  />
                  <Form.Text className="sublabel">
                    {`If you allow contributions, other users are able to add any furniture they believe is displayed in your post.\nYou can remove furniture and disable this option at any time.`}
                  </Form.Text>
                </Form.Group>
              </Form>
            </Row>
            <Row xs={12} className="description">
              <Form>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={description}
                  onChange={(e) => updateDescription(e.target.value)}
                />
                <Form.Text
                  className={`sublabel ${
                    description.length >= 400 ? "max" : ""
                  }`}
                >
                  {`Character limit ${description.length} / 400`}
                </Form.Text>
              </Form>
            </Row>
            <Row xs={12} className="submit">
              <Button onClick={() => submitNewPost()}>
                {isEditing ? "Save Post" : "Create Post"}
              </Button>
            </Row>
            {isEditing && (
              <Row xs={12} className="delete">
                <Button onClick={() => toggleConfirmationModal()}>
                  Delete Post
                </Button>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
      <ToastMessage />
    </div>
  )
}

export default CreatePost
