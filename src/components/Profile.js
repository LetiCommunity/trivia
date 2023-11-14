import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import inicialImage from "../assets/img/user.png";

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  let navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handlePasswordChange = () => {
    return navigate("/logout");
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete("http://localhost:5000/api/trivia/auth");
      return (window.location.href = "/home");
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
                  {imageUrl.trim() ? (
                    <img
                      alt="Imagen cargada"
                      className="rounded-circle profile"
                      src={imageUrl}
                    />
                  ) : (
                    <img
                      alt="Cargar imagen"
                      className="rounded-circle"
                      src={inicialImage}
                    />
                  )}
                  <h3>{userData.username}</h3>
                  <a
                    href="edit-profile"
                    className="text-info text_decoration_a"
                  >
                    Editar información
                  </a>
                </div>
                <hr />
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
                        Confirmar el número de teléfono
                      </Button>
                    </li>
                  </ul>
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
        <Row>
          <Col md="12">
            {/* <Modal
              className="px-2 pt-2 pb-2"
              isOpen={modalOpen}
              toggle={toggleModal}
              backdrop={false}
            >
              <div className="modal-header">
                <h4 className="modal-title">
                  Confirmación de número de teléfono
                </h4>
                <button type="button" className="close" onClick={toggleModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="model-body px-2 mt-2">
                <Form onSubmit={handleConfirmationPhone}>
                  <FormGroup>
                    <Input
                      placeholder="Número de teléfono"
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={user.phoneNumber}
                      onChange={handleChange}
                      className="form-control"
                      color="Black"
                    />
                  </FormGroup>
                  <div className="modal-footer mb-2">
                    <button
                      type="submit"
                      onClick={toggleModal}
                      className="btn btn-fill"
                    >
                      Guardar
                    </button>
                  </div>
                </Form>
              </div>
            </Modal> */}
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Profile;
