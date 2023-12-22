import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { signOut } from "firebase/auth";

import auth from "./firebase";
import inicialImage from "../assets/img/user.png";

const Profile = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  let navigate = useNavigate();
  const headers = {
    token: `${token}`,
    "Content-Type": "application/json",
  };

  const handleEditProfile = () => {
    return navigate("/edit-profile");
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
                {/*<hr />
                 <div>
                  <h3>Confirmación de perfil</h3>
                  <ul>
                    <li>
                      <Button
                        type="button"
                        onClick={toggleModal}
                        color="link"
                        outline={true}
                        className="text-info"
                      >
                        Cambiar teléfono
                      </Button>
                    </li>
                  </ul>
                </div> */}
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
