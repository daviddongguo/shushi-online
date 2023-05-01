import Head from 'next/head'
import AdminNavbar from '../components/admin/AdminNavbar'
import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap'
import axios from 'axios'

export default function SushiAdmin() {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [imageUrl, setImageUrl] = useState('https://dongguo.xyz/api/images/56')
  const [createObjectURL, setCreateObjectURL] = useState(null)

  const titleChanged = (e) => {
    setTitle(e.target.value)
    console.log(title)
  }

  const priceChanged = (e) => {
    setPrice(e.target.value)
  }

  const descriptionChanged = (e) => {
    setDescription(e.target.value)
  }

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]

      setImage(i)
      setCreateObjectURL(URL.createObjectURL(i))
    }
  }

  const uploadToServer = async (event) => {
    const formData = new FormData()
    formData.append('name', 'name')
    formData.append('description', 'name')
    formData.append('file', image, image.name)

    try {
      const options = {
        method: 'post',
        headers: {
          'content-type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
        data: formData,
        url: 'https://dongguo.xyz/api/images/add',
      }
      const response = await axios(options)
      console.log(response)
      const imageId = response.data.id
      setImageUrl('https://dongguo.xyz/api/images/' + imageId)
    } catch (error) {
      console.error(error)
    }
  }

  const addSushi = async () => {
    const data = {
      title,
      price,
      description,
      image: imageUrl,
    }

    axios({
      method: 'post',
      url: 'api/sushi',
      data,
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (response) {
        console.log(response)
      })
  }

  return (
    <div className="text-bg-sushi-gray pt-3 pb-5">
      <Head>
        <title>Sushi | Admin</title>
        <meta name="description" content="an online sushi store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminNavbar />

      <Container>
        <Row xs={1} md={2} lg={3} className="g-3 mt-5">
          <Col>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                onChange={titleChanged}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                onChange={priceChanged}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                style={{ height: '100px' }}
                onChange={descriptionChanged}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select sushi image</Form.Label>
              <Form.Control type="file" onChange={uploadToClient} />
            </Form.Group>
            <Image src={createObjectURL} alt="" className="w-100" />
            <Button
              variant="primary"
              type="submit"
              className="text-bg-sushi-orange"
              onClick={uploadToServer}
            >
              Upload image to server
            </Button>
          </Col>
        </Row>

        <Row className="mt-4">
          <Button
            variant="primary"
            type="submit"
            className="text-bg-sushi-orange"
            onClick={addSushi}
          >
            Add sushi to Database
          </Button>
        </Row>
      </Container>
    </div>
  )
}
