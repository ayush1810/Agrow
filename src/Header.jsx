import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';

import SignupModel from './UserAdd.jsx';
import LoginModel from './UserLogin.jsx';

export default class Webhead extends React.Component{
    render(){
        return(
            <Navbar fluid inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#/">AGROW</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">
                            Users
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            Link2
                        </NavItem>
                        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem>
                            <LoginModel/>
                        </NavItem>
                        <NavItem>
                            <SignupModel/>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}