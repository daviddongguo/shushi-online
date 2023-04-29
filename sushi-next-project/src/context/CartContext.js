import React, { createContext, useState } from 'react'

const CartContext = createContext({})

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const [isCartOpen, setIsCartOpen] = useState(false)
  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  function increaseCartQuantity(sushi, quantity = 1) {
    const index = cartItems.findIndex((item) => item.sushi.id === sushi.id)
    let newCartItems = []

    if (index === -1) {
      newCartItems = [...cartItems, { sushi, quantity }]
    } else {
      const updatedItem = {
        ...cartItems[index],
        quantity: cartItems[index].quantity + quantity,
      }
      newCartItems = [
        ...cartItems.slice(0, index),
        updatedItem,
        ...cartItems.slice(index + 1),
      ]
    }
    setCartItems(newCartItems)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        isOpenCart: isCartOpen,
        openCart,
        closeCart,
        increaseCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
export default CartContext
