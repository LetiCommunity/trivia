import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Col, Form, FormGroup, Input, Modal, Row } from "reactstrap";
import inicialImage from "../assets/img/user.png";

const Profile = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [pidModal, setPidModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState({
    id: "",
    pid: "",
    image: "",
    name: "",
    surname: "",
    phoneNumber: "",
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: user.name,
      pid: user.pid,
      surname: user.surname,
      phoneNumber: user.phoneNumber,
      email: user.email,
      username: user.username,
      password: user.password,
      passwordConfirmation: user.passwordConfirmation,
    };

    if (!data.username || !data.password || !data.passwordConfirmation) {
      setError("Por favor, rellena todos los campos");
      return;
    }

    if (
      data.username.trim() === "" ||
      data.password.trim() === "" ||
      data.passwordConfirmation.trim() === ""
    ) {
      setError("Por favor, revisa los espacios al inicio de los textos");
      return;
    }

    if (!(data.password === data.passwordConfirmation)) {
      setError(
        "Por favor, revisa que la contraseña y la confirmación coincidan"
      );
      return;
    }
    /**try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token);
        window.location.href = "/admin/dashboard";
      }
    } catch (error) {
      console.error("Error", error);
    }*/

    setUser({
      name: "",
      pid: "",
      surname: "",
      phoneNumber: "",
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    });
    setError("");
  };

  const togglePidModal = () => {
    setPidModal(!pidModal);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <Fragment>
      <div className="content">
        <Row
          className="justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Col md="10" sm="11" xs="11" className="">
            <div className="text-center">
              {imageUrl.trim() ? (
                <img alt="Imagen cargada" className="rounded-circle profile" src={imageUrl} />
              ) : (
                <img
                  alt="Cargar imagen"
                  className="rounded-circle"
                  src={inicialImage}
                />
              )}
              <h3>Usuario</h3>
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
                  <a
                    href="#p"
                    className="text-info text_decoration_a"
                    onClick={togglePidModal}
                  >
                    Confirmar el Documento de Identidad Personal
                  </a>
                </li>
                <li>
                  <a
                    href="document-confirmation"
                    className="text-info text_decoration_a"
                  >
                    Confirmar el número de teléfono
                  </a>
                </li>
              </ul>
            </div>
            <hr />
            <div>
              <h3>Cuenta</h3>
              <ul>
                <li>
                  <a
                    href="document-confirmation"
                    className="text-info text_decoration_a"
                  >
                    Cambiar contraseña
                  </a>
                </li>
                <li>
                  <a
                    href="document-confirmation"
                    className="text-info text_decoration_a"
                  >
                    Eliminar cuenta
                  </a>
                </li>
                <li>
                  <a
                    href="document-confirmation"
                    className="text-info text_decoration_a"
                  >
                    Cerrar sesión
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
        <Col md="12">
            <Modal
              className="px-2 pt-2 pb-2"
              isOpen={pidModal}
              toggle={togglePidModal}
              backdrop={false}
            >
              <div className="modal-header">
                <h4 className="modal-title">Confirmación de número de teléfono</h4>
                <button type="button" className="close" onClick={togglePidModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="model-body px-2 mt-2">
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Input
                      type="hidden"
                      id="id"
                      name="id"
                      value={user.id}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      placeholder="Número de teléfono"
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={user.pid}
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
            </Modal>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Profile;
