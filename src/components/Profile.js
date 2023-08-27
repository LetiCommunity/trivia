import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  Row,
} from "reactstrap";

const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  

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
          <Col md="6" className="my-5 py-5">
            <div className="text-center">
              <img
                className="rounded-circle"
                alt="https://icons8.com/icon/85356/male-user"
                src={require("../assets/img/user.png")}
              />
              <h3>Usuario</h3>
              <a
                href="edit-profile"
                onClick={toggleModal}
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
                    href="document-confirmation"
                    className="text-info text_decoration_a"
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
        <Row></Row>
        <Row></Row>
        <Row></Row>
      </div>
    </Fragment>
  );
};

export default Profile;
