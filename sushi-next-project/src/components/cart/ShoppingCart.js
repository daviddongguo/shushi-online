import React, { useContext } from 'react'
import { Offcanvas, Stack } from 'react-bootstrap'
import { formatCurrency } from '../../utilities/formatCurrency'
import { CartItem } from './CartItem'
import PropTypes from 'prop-types'

import CartContext from '@/context/CartContext'

export function ShoppingCart(props) {
  const { isOpen } = props
  const { closeCart, cartItems } = useContext(CartContext)

  return (
    <Offcanvas
      show={isOpen}
      onHide={closeCart}
      placement="end"
      backdrop="static"
      scroll="true"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.sushi.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{' '}
            {formatCurrency(
              cartItems.reduce((total, item) => {
                return total + (item.sushi.price || 0) * item.quantity
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

ShoppingCart.propTypes = {
  isOpen: PropTypes.bool,
}
