import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { signOut } from "firebase/auth";

import auth from "../config/firebase";
import inicialImage from "../assets/img/user.png";

const Profile = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  let navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headers = {
    token: `${token}`,
    "Content-Type": "application/json",
  };

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

  const handleEditProfile = () => {
    return navigate("/edit-profile");
  };

  const handleEditProfileImage = () => {
    return navigate("/change-profile-image");
  };

  const handlePasswordChange = () => {
    return navigate("/change-password");
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete("https://trivi4.com/api/trivia/profiles/profile", {
        headers,
      });
      signOut(auth)
        .then(() => {
          navigate("/logout");
          return (window.location.href = "/home");
        })
        .catch((error) => {
          //setImageUrl("") //Test
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    return navigate("/logout");
  };

  return (
    <Fragment>
      <div className="content">
        <Row
          className="justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Col md="5" sm="10" xs="10" className="my-5 py-5">
            <Card className="border-0 bg-light">
              <CardBody>
                <div className="text-center">
                  {user ? (
                    <div>
                      {user.image ? (
                        <img
                          alt="Imagen cargada"
                          className="rounded-circle profile"
                          src={`https://trivi4.com/api/trivia/profiles/image/${user.image}`}
                        />
                      ) : (
                        <img
                          alt="Imagen cargada"
                          className="rounded-circle profile"
                          src={inicialImage}
                        />
                      )}
                      <h3>{user.username}</h3>
                    </div>
                  ) : null}
                  <div>
                    <Button
                      type="button"
                      onClick={handleEditProfileImage}
                      color="link"
                      outline={true}
                      className="text-info"
                    >
                      Cambiar imagen de perfil
                    </Button>
                  </div>
                  <div>
                    <Button
                      type="button"
                      onClick={handleEditProfile}
                      color="link"
                      outline={true}
                      className="text-info"
                    >
                      Editar información
                    </Button>
                  </div>
                </div>
                <hr />
                <div>
                  <h3>Cuenta</h3>
                  <ul>
                    <li>
                      <Button
                        type="button"
                        onClick={handlePasswordChange}
                        color="link"
                        outline={true}
                        className="text-info"
                      >
                        Cambiar contraseña
                      </Button>
                    </li>
                    <li>
                      <Button
                        type="button"
                        onClick={handleDeleteAccount}
                        color="link"
                        outline={true}
                        className="text-info"
                      >
                        Eliminar cuenta
                      </Button>
                    </li>
                    <li>
                      <Button
                        type="button"
                        onClick={handleLogout}
                        color="link"
                        outline={true}
                        className="text-info"
                      >
                        Cerrar sesión
                      </Button>
                    </li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Profile;
