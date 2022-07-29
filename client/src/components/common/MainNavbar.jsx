import React from "react";
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import routeConsts from "../../utils/consts";


const MainNavbar = (props) =>{
    return (
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/lenta">TopicBook</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#chat">Чат</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to={routeConsts.LENTA}>Лента</Nav.Link>
                        <Nav.Link as={Link} to={routeConsts.FEED}>Профиль</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}



export default MainNavbar;