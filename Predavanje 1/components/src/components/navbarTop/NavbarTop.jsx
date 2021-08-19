import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link, useHistory } from 'react-router-dom';

const NavbarTop = () => {
    const history = useHistory();

    return <Navbar style={{ marginBottom: 40 }} sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
                    <Nav.Link><Link to="/styling">Styling</Link></Nav.Link>
                    <Nav.Link><Link to="/people">People</Link></Nav.Link>
                    <Nav.Link><Link to="/administration">Administration</Link></Nav.Link>
                    <Nav.Link><Link to="/administration/cars">Cars</Link></Nav.Link>
                    <Nav.Link><Link to="/administration/cities">Cities</Link></Nav.Link>
                    <Nav.Link><Link to="/administration/countries">Countries</Link></Nav.Link>
                    <Nav.Link onClick={() => {
                        localStorage.clear();
                        history.push("/login");
                    }}>Log out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default NavbarTop;