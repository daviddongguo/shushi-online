import Head from 'next/head'
import { CartProvider } from '@/context/CartContext'
import SushiNavbar from '../components/SushiNavbar'
import React from 'react'
import SushiShow from '@/components/SushiShow'

export default function Home() {
  return (
    <>
      <Head>
        <title>Sushi Store</title>
        <meta name="description" content="an online sushi store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CartProvider>
        <SushiNavbar />
        <SushiShow />
      </CartProvider>
    </>
  )
}
