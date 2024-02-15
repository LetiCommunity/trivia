import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Collapse,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
} from "reactstrap";

import inicialImage from "../../assets/img/user-bar.png";
import Login from "../authentication/Login";
import Registration from "../authentication/Registration";
import ResetPassword from "../authentication/ResetPassword";
import Logout from "../authentication/Logout";
import Profile from "../profile/Profile";
import Notification from "../main/Notification";
import SendPackage from "../main/SendPackage";
import PublishTrip from "../main/PublishTrip";
import Activity from "../main/Activity";
import Home from "../main/Home";
import SearchTrip from "../main/SearchTrip";
import Terms from "../main/Terms";
import EditProfile from "../profile/EditProfile";
import ChangeProfileImage from "../profile/ChangeProfileImage";
import ChangePassword from "../profile/ChangePassword";

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
    if (token) {
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
      getUser();
      getRequests();
      getSuggestions();
      getAcceptedRequests();
    }
  }, [headers, token]);

  return (
    <BrowserRouter>
      <Navbar className="sticky-top bg-light shadow-lg">
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
          {(requests.length > 0 ||
            acceptedRequest.length > 0 ||
            suggestions.length > 0) && (
            <i className="bi bi-circle-fill text-danger notification-icon2"></i>
          )}
        </div>
        <Collapse isOpen={collapseOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!token ? (
              <>
                <NavItem>
                  <Link to="login" className="nav-link" onClick={handleToggle}>
                    Iniciar Sesión
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="registration"
                    className="nav-link"
                    onClick={handleToggle}
                  >
                    Registrarse
                  </Link>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <Link
                    to="notifications"
                    className="nav-link"
                    onClick={handleToggle}
                  >
                    Notificaciones
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="activity"
                    className="nav-link"
                    onClick={handleToggle}
                  >
                    Actividad
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="send-package"
                    className="nav-link"
                    onClick={handleToggle}
                  >
                    Realizar envío
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="publish-trip"
                    className="nav-link"
                    onClick={handleToggle}
                  >
                    Publicar viaje
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="profile"
                    className="nav-link"
                    onClick={handleToggle}
                  >
                    Perfil
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="logout" className="nav-link" onClick={handleToggle}>
                    Cerrar sesión
                  </Link>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="home" element={<Home />} />
        <Route path="search-trip" element={<SearchTrip />} />
        <Route path="terms" element={<Terms />} />
        {token ? (
          <>
            <Route path="send-package" element={<SendPackage />} />
            <Route path="publish-trip" element={<PublishTrip />} />
            <Route path="activity/edit-trip/:id" element={<PublishTrip />} />
            <Route path="activity/edit-package/:id" element={<SendPackage />} />
            <Route path="activity" element={<Activity />} />
            <Route path="notifications" element={<Notification />} />
            <Route path="profile" element={<Profile />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route
              path="change-profile-image"
              element={<ChangeProfileImage />}
            />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="logout" element={<Logout />} />
          </>
        ) : (
          <>
            <Route path="registration" element={<Registration />} />
            <Route path="login" element={<Login />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default UserNavbar;
