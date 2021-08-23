import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const NavbarTop = () => {
    return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#home">Database</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/movies">Filmovi</Nav.Link>
                    <Nav.Link as={Link} to="/movies2">Filmovi 2</Nav.Link>
                    <Nav.Link as={Link} to="/books">Knjige</Nav.Link>
                    <Nav.Link as={Link} to="/people">Osobe</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default NavbarTop;