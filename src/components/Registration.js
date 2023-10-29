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
  const [error, setError] = useState("");
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
      const data = {
        name: user.name,
        surname: user.surname,
        phoneNumber: user.phoneNumber,
        email: user.email,
      };

      if (!data.name || !data.surname || !data.phoneNumber || !data.email) {
        setError("Por favor, rellena todos los campos");
        return;
      }

      if (
        data.name.trim() === "" ||
        data.surname.trim() === "" ||
        data.phoneNumber.trim() === "" ||
        data.email.trim() === ""
      ) {
        setError("Por favor, revisa los espacios al inicio de los textos");
        return;
      }
      setSection(section + 1);
      setError("");
    }
  };

  const previoustSection = () => {
    if (section > 1) {
      setSection(section - 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: user.name,
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

    // eslint-disable-next-line eqeqeq
    if (!(data.password == data.passwordConfirmation)) {
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
      surname: "",
      phoneNumber: "",
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    });
    setError("");
  };
  
  return (
    <Fragment>
      <div className="content">
        <Row
          className="justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Col md="5" sm="10" xs="10" className="my-5 py-5">
            <Card className="border-0 shadow-lg bg-white">
              <CardBody>
                <p className="text-center">
                  <i
                    className={
                      section === 2
                        ? "bi bi-circle-fill text-info"
                        : "bi bi-circle-fill text-light"
                    }
                  ></i>{" "}
                  Información Personal <i className="bi bi-dash-lg"></i>{" "}
                  <i className="bi bi-circle-fill text-light"></i> Información de Cuenta
                </p>
                <Form onSubmit={handleSubmit}>
                  {section === 1 && (
                    <>
                      <h2>Información Personal</h2>
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
                        <Col md="12">
                          <p className="text-danger text-center">{error}</p>
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
                                className={
                                  showPassword
                                    ? "bi bi-eye-slash-fill input_icon"
                                    : "bi bi-eye-fill input_icon"
                                }
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
                                className={
                                  showPasswordConfirmation
                                    ? "bi bi-eye-slash-fill input_icon"
                                    : "bi bi-eye-fill input_icon"
                                }
                              ></i>
                            </a>
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <p className="text-danger text-center">{error}</p>
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
                    <Col md="6" sm="6" xs="6">
                      {section === 1 && (
                        <Button
                          type="button"
                          onClick={nextSection}
                          className="btn btn-info text-white right"
                        >
                          Siguiente
                        </Button>
                      )}
                      {section === 2 && (
                        <Button
                          type="submit"
                          className="btn btn-info text-white right"
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
                  Al registrarse, acepta nuestros{" "}
                  <a href="#terms" className="text-info text_decoration_a">
                    Términos
                  </a>{" "}
                  y{" "}
                  <a
                    href="#privacy-policy"
                    className="text-info text_decoration_a"
                  >
                    Política de privacidad
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
