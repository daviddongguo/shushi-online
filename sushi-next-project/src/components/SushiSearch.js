import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Row, Button, Form } from 'react-bootstrap'

const SushiSearch = ({ sort, search }) => {
  const [query, setQuery] = useState('')
  const sortByPrice = () => {
    sort()
  }
  const searchByTitle = () => {
    search(query)
  }

  const queryChanged = (event) => {
    setQuery(event.target.value)
    search(query)
  }

  const displayAll = () => {
    search('')
  }

  return (
    <Container>
      <Row className="mt-4 mb-3">
        <Col className="mb-2">
          <Button
            className="text-bg-sushi-orange"
            onClick={sortByPrice}
            style={{ width: '16rem' }}
          >
            Sort By Price
          </Button>
        </Col>
        <Col className="mb-2">
          <Button
            className="text-bg-sushi-orange"
            onClick={displayAll}
            style={{ width: '16rem' }}
          >
            Display all
          </Button>
        </Col>
        <Col className="mb-2">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={queryChanged}
            />
            <Button
              className="text-bg-sushi-orange"
              onClick={searchByTitle}
              style={{ width: '12rem' }}
            >
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

SushiSearch.propTypes = {
  sort: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
}

export default SushiSearch
