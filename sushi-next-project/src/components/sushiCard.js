import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Badge } from 'react-bootstrap'

import CartContext from '@/context/CartContext'

function SushiCard(props) {
  const { item } = props

  const { increaseCartQuantity } = useContext(CartContext)

  const AddToCart = () => {
    increaseCartQuantity(item)
  }

  const imageUrl = item.image
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={imageUrl} width="300px" height="280" />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>{item.description}</Card.Text>

        <h3>
          <Badge bg="secondary">$ {item.price / 100}</Badge>
        </h3>
        <Button onClick={AddToCart}>Add to cart</Button>
      </Card.Body>
    </Card>
  )
}

SushiCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
}

export default SushiCard
