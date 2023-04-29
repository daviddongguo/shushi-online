import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import CartButton from './cart/CartButton'

const SushiNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="#home">Sushi Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Home</Nav.Link>
            <Nav.Link href="#pricing">Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <CartButton />
      </Container>
    </Navbar>
  )
}
export default SushiNavbar
