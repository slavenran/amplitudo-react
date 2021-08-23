import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useHistory } from 'react-router-dom';

const NavbarTop = () => {
    const history = useHistory();

    const logOut = () => {
        localStorage.clear();
        history.push('/login');
    }

    return <Navbar style={{marginBottom: 40}} sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand as={Link} to="/home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
                    <Nav.Link as={Link} to="/books">Books</Nav.Link>
                    <Nav.Link as={Link} to="/people">People</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link onClick={() => logOut()}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default NavbarTop;