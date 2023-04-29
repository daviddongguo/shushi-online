import React, { useContext } from 'react'

import { Button, Stack, Image } from 'react-bootstrap'
import { formatCurrency } from '../../utilities/formatCurrency'
import PropTypes from 'prop-types'

import CartContext from '@/context/CartContext'

export function CartItem(props) {
  const { sushi, quantity } = props
  const { increaseCartQuantity, removeFromCart, decreaseCartQuantity } =
    useContext(CartContext)

  return (
    <Stack direction="horizontal" gap={3}>
      <Image src={sushi.image} alt="" width="100px" />
      <div className="me-auto">
        <div>
          {sushi.title}{' '}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: '.65rem' }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: '.75rem' }}>
          {formatCurrency(sushi.price)}
        </div>
      </div>
      <div> {formatCurrency(sushi.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => increaseCartQuantity(sushi)}
      >
        {' '}
        +
      </Button>
      <div>{quantity}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => decreaseCartQuantity(sushi)}
      >
        {' '}
        -
      </Button>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(sushi)}
      >
        &times;
      </Button>
    </Stack>
  )
}

CartItem.propTypes = {
  sushi: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  quantity: PropTypes.number,
}
