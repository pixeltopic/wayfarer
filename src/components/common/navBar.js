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
                <LinkContainer to="/directions">
                    <NavItem eventKey={1}>Get Directions</NavItem>
                </LinkContainer>
                <LinkContainer to="/incidents">
                    <NavItem eventKey={2}>Get Incidents</NavItem>
                </LinkContainer>
                <LinkContainer to="/places">
                    <NavItem eventKey={3}>Get Places</NavItem>
                </LinkContainer>
            </Nav>
        </Navbar>
    );
}