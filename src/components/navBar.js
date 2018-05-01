import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default (props) => {
    return(
        <Navbar inverse staticTop>
            <Navbar.Header>
                <LinkContainer to="/">
                    <Navbar.Brand>Search</Navbar.Brand>
                </LinkContainer>  
            </Navbar.Header>
            <Nav>
                <LinkContainer to="/navi">
                    <NavItem eventKey={1}>Get Directions</NavItem>
                </LinkContainer>
            </Nav>
        </Navbar>
    );
}