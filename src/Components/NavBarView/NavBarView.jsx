import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "./NavBarView.css";

const NavBarView = ({ user, onLogout }) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/">Bollywood Movies</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!user ? (
                            <>
                                {/* Link to Login Page */}
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                {/* Link to Signup Page */}
                                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                            </>
                        ) : (
                            <>
                                {/* Link to MainView (Home Page) */}
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                {/* Profile Page Link */}
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                {/* Logout Button */}
                                <Button variant="outline-danger" onClick={onLogout} className="ms-2">
                                    Logout
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBarView;
