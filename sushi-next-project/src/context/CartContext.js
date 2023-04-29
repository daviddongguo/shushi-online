import React, { createContext, useState, useEffect } from 'react'

const CartContext = createContext({})

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const initCart = [
    {
      sushi: {
        id: 'c332984a-be45-41ed-8e4a-1a3562d9b221',
        title: 'Maki thon épicée（spicy thon）(7 mcx / 8 pcs)',
        image:
          'https://tb-static.uber.com/prod/image-proc/processed_images/2a939708e217ff955a19c9abc7cb5401/4218ca1d09174218364162cd0b1a8cc1.jpeg',
        subtitle: 'Maki thon épicée（spicy thon）(7 mcx / 8 pcs)',
        description:
          'Thon, avocat, tempura, masago orange,mayo légère épicée et sauce épicée, sésame / Tuna,\navocado, tempura, orange masago, spicy light mayo & spicy sauce, sesame',
        price: 1498,
      },
      quantity: 2,
    },
    {
      sushi: {
        id: 'fab58ac5-e355-4284-b7cd-8a327fe36342',
        title: 'SAUMON FLOWER(5MCX)',
        image:
          'https://tb-static.uber.com/prod/image-proc/processed_images/89c4aaa3514c0201096769d436847be9/f0d1762b91fd823a1aa9bd0dab5c648d.jpeg',
        subtitle: 'SAUMON FLOWER(5MCX)',
        description:
          'Saumon saisi à la torche, avocat, tempura, masago rouge, mayo légère épicée, sésame / Torch-seared salmon, avocado, tempura, red masago, spicy light mayo, sesame\n',
        price: 1598,
      },
      quantity: 1,
    },
  ]

  const [cartItems, setCartItems] = useState(initCart)

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const [isOpenCart, setIsOpenCart] = useState(false)
  const openCart = () => setIsOpenCart(true)
  const closeCart = () => setIsOpenCart(false)

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
        isOpenCart,
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
