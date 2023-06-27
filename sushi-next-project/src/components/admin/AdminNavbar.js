import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import Link from 'next/link'

const AdminNavbar = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="text-bg-sushi-dark"
      variant="dark"
      sticky="top"
    >
      <Container>
        <Navbar.Brand href="#home">Sushi Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href="/">Home</Link>
            <Link href="sushiAdmin">Admin</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default AdminNavbar
