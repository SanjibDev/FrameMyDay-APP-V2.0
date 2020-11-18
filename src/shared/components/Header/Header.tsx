import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    NavItem,
    NavLink,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import Swal from 'sweetalert2';
import logo from './../../../contents/images/logo.png';
import avatar from './../../../contents/images/avatar.png';

const Header = () => {
    const history = useHistory();

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure you want to Logout?',
            text: 'Any unsaved changes will be discarded!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                history.push("/login");
            }
        });
    }

    return (
        <React.Fragment>
            <Navbar light expand="md" className="header">
                <NavbarBrand href="#/dashboard">
                    <img src={logo} alt="Not found" className="headerLogo" />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="#/dashboard" className="navigationLinks">Dashboard </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <img src={avatar} alt="Not found" className="avatar" />
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href="#/myprofile">
                                    My Profile
                                </DropdownItem>
                                <DropdownItem href="#/terms">
                                    Terms & Conditions
                                </DropdownItem>
                                <DropdownItem href="#/privacypolicy">
                                    Privacy & Policy
                                </DropdownItem>
                                <DropdownItem href="#/aboutus">
                                    About Us
                                </DropdownItem>
                                <DropdownItem href="#/contactus">
                                    Contact Us
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => handleLogout()}>
                                    Logout
                                    </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </React.Fragment>
    )
}

export default Header;