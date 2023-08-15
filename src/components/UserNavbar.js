import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
const UserNavbar = () => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const handleToggle = () => setCollapseOpen(!collapseOpen);

  return (
    <Fragment>
      <Navbar className="fixed-top" color="white" light expand="md">
        <NavbarBrand href="/">Trivia</NavbarBrand>
        <NavbarToggler onClick={handleToggle} />
        <Collapse isOpen={collapseOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="">Iniciar Sesión</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">Registrarse</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </Fragment>
  );
};

Navbar.PropTypes = {
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default UserNavbar;
