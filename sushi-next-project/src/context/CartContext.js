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
    const index = cartItems.indexOf((i) => i.id === sushi.id)
    let newCartItems = []
    if (index === -1) {
      newCartItems = [...cartItems, { sushi, quantity }]
    } else {
      newCartItems = cartItems.map((item) => {
        if (item.id === sushi.id) {
          return { item, quantity: item.quantity + quantity }
        } else {
          return item
        }
      })
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
