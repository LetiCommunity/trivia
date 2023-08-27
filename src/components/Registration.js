import React, { Fragment, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [section, setSection] = useState(1);
  const [user, setUser] = useState({
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

  const nextSection = () => {
    if (section < 2) {
      setSection(section + 1);
    }
  };

  const previoustSection = () => {
    if (section > 1) {
      setSection(section - 1);
    }
  };

  const handleSubmit = () => {};
  return (
    <Fragment>
      <div className="content">
        <Row
          className="justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Col md="5">
            <Card className="card-user">
              <CardBody>
                <p className="text-center">
                  <i
                    className={
                      section === 2
                        ? "bi bi-circle-fill text-success"
                        : "bi bi-circle-fill"
                    }
                  ></i>
                  <i className="bi bi-dash-lg"></i>
                  <i className="bi bi-circle-fill"></i>
                </p>
                <Form onSubmit={handleSubmit}>
                  {section === 1 && (
                    <>
                      <h2>Información personal</h2>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="text"
                              id="name"
                              name="name"
                              value={user.name}
                              onChange={handleChange}
                              placeholder="Nombre"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="text"
                              id="surname"
                              name="surname"
                              value={user.surname}
                              onChange={handleChange}
                              placeholder="Apellidos"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="text"
                              id="phoneNumber"
                              name="phoneNumber"
                              value={user.phoneNumber}
                              onChange={handleChange}
                              placeholder="Teléfono"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="email"
                              id="email"
                              name="email"
                              value={user.email}
                              onChange={handleChange}
                              placeholder="Email"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </>
                  )}
                  {section === 2 && (
                    <>
                      <h2>Información de Cuenta</h2>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="text"
                              id="username"
                              name="username"
                              value={user.username}
                              onChange={handleChange}
                              placeholder="Nombre de usuario"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup className="input_wrapper">
                            <Input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              name="password"
                              value={user.password}
                              onChange={handleChange}
                              placeholder="Contraseña"
                              className="bg-light"
                            />
                            <a href="#showPassword" className="text-black">
                              <i
                                onClick={() => setShowPassword(!showPassword)}
                                className={showPassword ? "bi bi-eye-slash-fill input_icon" : "bi bi-eye-fill input_icon"}
                              ></i>
                            </a>
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup className="input_wrapper">
                            <Input
                              type={
                                showPasswordConfirmation ? "text" : "password"
                              }
                              id="passwordConfirmation"
                              name="passwordConfirmation"
                              value={user.passwordConfirmation}
                              onChange={handleChange}
                              placeholder="Confirmar contraseña"
                              className="bg-light"
                            />
                            <a href="#showPassword" className="text-black">
                              <i
                                onClick={() =>
                                  setShowPasswordConfirmation(
                                    !showPasswordConfirmation
                                  )
                                }
                                className={showPasswordConfirmation ? "bi bi-eye-slash-fill input_icon" : "bi bi-eye-fill input_icon"}
                              ></i>
                            </a>
                          </FormGroup>
                        </Col>
                      </Row>
                    </>
                  )}
                  <Row>
                    <Col md="6" xs="6">
                      {section === 2 && (
                        <Button
                          type="button"
                          onClick={previoustSection}
                          className="btn btn-info text-white"
                        >
                          Anterior
                        </Button>
                      )}
                    </Col>
                    <Col md="6" xs="6" className="text-center">
                      {section === 1 && (
                        <Button
                          type="button"
                          onClick={nextSection}
                          className="btn btn-info text-white"
                        >
                          Siguiente
                        </Button>
                      )}
                      {section === 2 && (
                        <Button
                          type="submit"
                          className="btn btn-info text-white"
                        >
                          Enviar
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Form>
                <br />
                <p>
                  ¿Ya tienes cuenta?{" "}
                  <a href="login" className="text-info text_decoration_a">
                    Inicia sesión
                  </a>
                </p>
              </CardBody>
            </Card>
            <div className="my-3">
              <p>
                <small className="text-secondary">
                  Al registrarse, acepta nuestra{" "}
                  <a href="#p" className="text-info text_decoration_a">
                    política de privacidad
                  </a>
                </small>
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Registration;
