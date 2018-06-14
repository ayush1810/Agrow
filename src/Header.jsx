import React from 'react';
import { Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap'; 

import SignupModel from './User/UserAdd.jsx';
import LoginModel from './User/UserLogin.jsx';

export default class Webhead extends React.Component{
    constructor(props)
    {
        super(props);
        this.doToggle = this.doToggle.bind(this);
        this.state = { isActive: false};
    }

    doToggle(){
        this.setState({isActive: !this.state.isActive});
    }
    render(){
        return(
            <Navbar className="bg-transparent" expand="md">
                <NavbarBrand href="#/">AGROW</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="#dashboard"> Dashboard</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="http://github.com/ayush1810/agrow">Github</NavLink>
                    </NavItem>
                </Nav>
                <NavbarToggler onClick={this.doToggle}/>
                <Collapse isOpen={this.state.isActive} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <LoginModel/>
                        </NavItem>
                        <NavItem className="ml-2">
                            <SignupModel/>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}