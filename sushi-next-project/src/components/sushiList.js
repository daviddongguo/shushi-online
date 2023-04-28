import React from 'react'
import SushiCard from './sushiCard'

import PropTypes from 'prop-types'
import { Col, Container, Row } from 'react-bootstrap'

function SushiList(props) {
  const { list = [] } = props
  return (
    <Container>
      <Row xs={1} md={2} lg={3} className="g-5">
        {list.map((item) => (
          <Col key={item.id}>
            <SushiCard item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

SushiList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.number,
    })
  ),
}

export default SushiList
