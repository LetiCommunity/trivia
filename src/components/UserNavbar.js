import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
} from "reactstrap";
const UserNavbar = () => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const handleToggle = () => setCollapseOpen(!collapseOpen);

  return (
    <Fragment>
      <Navbar className="fixed-top" color="light" light>
        <NavbarBrand href="/home">Trivia</NavbarBrand>
        <Button onClick={handleToggle} className="navbar-toggler border-0">
          <img
            className="rounded-circle"
            alt="https://icons8.com/icon/85356/male-user"
            src={require("../assets/img/user-bar.png")}
          />
        </Button>
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
  
};

export default UserNavbar;
