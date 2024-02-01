import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
} from "reactstrap";

import inicialImage from "../../assets/img/user-bar.png";
import axios from "axios";

const UserNavbar = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [acceptedRequest, setAcceptedRequest] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headers = {
    token: `${token}`,
    "Content-Type": "application/json",
  };
  const handleToggle = () => setCollapseOpen(!collapseOpen);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          "https://trivi4.com/api/trivia/profiles/profile",
          { headers }
        );
        setUser(data);
      } catch (error) {
        console.error("Error", error.message);
      }
    };
    getUser();
  }, [headers]);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const { data } = await axios.get(
          "https://trivi4.com/api/trivia/packages/filterByRequest",
          { headers }
        );
        setRequests(data);
      } catch (error) {
        console.error("Error", error.message);
      }
    };
    getRequests();
  }, [headers]);

  useEffect(() => {
    const getAcceptedRequests = async () => {
      try {
        const { data } = await axios.get(
          "https://trivi4.com/api/trivia/packages/filterByAcceptedRequest",
          { headers }
        );
        setAcceptedRequest(data);
      } catch (error) {
        console.error("Error", error.message);
      }
    };
    getAcceptedRequests();
  }, [headers]);

  useEffect(() => {
    const getSuggestions = async () => {
      try {
        const { data } = await axios.get(
          "https://trivi4.com/api/trivia/packages/filterByMatch",
          { headers }
        );
        setSuggestions(data);
      } catch (error) {
        console.error("Error", error.message);
      }
    };
    getSuggestions();
  }, [headers]);

  return (
    <Fragment>
      <Navbar className="fixed-top bg-light shadow-lg">
        <NavbarBrand href="/home">
          <img
            className="logo"
            alt="Trivia"
            src={require("../../assets/img/logo3.png")}
          />
        </NavbarBrand>
        <div className="pr-1">
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
          {requests.length > 0 || acceptedRequest.length > 0 || suggestions.length > 0 ? (
            <i className="bi bi-circle-fill text-danger notification-icon2"></i>
          ) : null}
        </div>
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
