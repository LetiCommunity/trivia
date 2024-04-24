import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";

import inicialImage from "../../assets/img/user.png";

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
          "http://localhost:5000/api/trivia/profiles/profile",
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

  const handleLogout = () => {
    return navigate("/logout");
  };

  const handleDeleteAccount = async () => {
    return navigate("/delete-account");
  };
  
  return (
      <Container>
        <Row
          className="justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Col md="5" sm="11" xs="11" className="my-5 py-5">
            <Card className="border-0 bg-light">
              <CardBody>
                <div className="text-center">
                  {user ? (
                    <div>
                      {user.image ? (
                        <img
                          alt="Imagen cargada"
                          className="rounded-circle profile"
                          src={`http://localhost:5000/api/trivia/profiles/image/${user.image}`}
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
      </Container>
  );
};

export default Profile;
