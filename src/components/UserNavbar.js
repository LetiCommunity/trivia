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
      <Navbar className="fixed-top" color="light" light>
        <NavbarBrand href="/home">Trivia</NavbarBrand>
        <NavbarToggler onClick={handleToggle} />
        <Collapse isOpen={collapseOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="login">Iniciar Sesión</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="registration">Registrarse</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="send-package">Haz un envío</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="publish-trip">Publica un viaje</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="profile">Perfil</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="logout">Cerrar sesión</NavLink>
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
