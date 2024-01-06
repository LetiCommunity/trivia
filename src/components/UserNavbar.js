import React, { Fragment, useState } from "react";
import {
  Button,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
} from "reactstrap";

import inicialImage from "../assets/img/user-bar.png";

const UserNavbar = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [collapseOpen, setCollapseOpen] = useState(false);
  const handleToggle = () => setCollapseOpen(!collapseOpen);

  return (
    <Fragment>
      <Navbar className="fixed-top pt-2 bg-light">
        <NavbarBrand href="/home">
          <img
            className="logo"
            alt="Trivia"
            src={require("../assets/img/logo3.png")}
          />
        </NavbarBrand>
        {/* <Button onClick={handleToggle} className="navbar-toggler border-0">
          <i className="bi bi-bell"></i>
        </Button> */}
        <Button
          onClick={handleToggle}
          className="navbar-toggler border-0 bg-light"
        >
          {user ? (
            <img
              alt="Imagen cargada"
              className="rounded-circle profile-bar"
              src={
                user.image
                  ? `https://trivi4.com/api/trivia/profiles/image/${user.image}`
                  : inicialImage
              }
            />
          ) : (
            <img
              alt="Imagen cargada"
              className="rounded-circle profile-bar"
              src={inicialImage}
            />
          )}
        </Button>
        <i className="bi bi-circle-fill text-danger notification-icon2"></i>
        <Collapse isOpen={collapseOpen} navbar className="">
          <Nav className="ml-auto" navbar>
            {!token ? (
              <>
                <NavItem>
                  <NavLink href="login">Iniciar Sesión</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="registration">Registrarse</NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink href="send-package">Realizar envío</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="publish-trip">Publicar viaje</NavLink>
                </NavItem> */}
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink href="notifications">
                    Notificaciones
                    {/* <i className="bi bi-circle-fill text-danger notification-icon"></i> */}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="activity">Actividad</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="send-package">Realizar envío</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="publish-trip">Publicar viaje</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="profile">Perfil</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="logout">Cerrar sesión</NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </Fragment>
  );
};

export default UserNavbar;
