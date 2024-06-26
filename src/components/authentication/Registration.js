import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import auth from "../config/firebase";
//import CountdownTimer from "../config/CountdownTimer";

const Registration = () => {
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [otp, setOTP] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState("");
  //const [resendCode, setResendCode] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [section, setSection] = useState(1);
  const headers = {
    token: `${token}`,
    "Content-Type": "application/json",
  };
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
    countryCode: "+240",
    phoneNumber: "",
    phoneConfirmation: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const nextSection = () => {
    if (section === 1) {
      const data = {
        name: user.name,
        surname: user.surname,
        email: user.email,
      };

      if (!data.name || !data.surname) {
        setError("Por favor, rellena todos los campos");
        return;
      }

      if (data.name.trim() === "" || data.surname.trim() === "") {
        setError("Por favor, revisa los espacios al inicio de los textos");
        return;
      }
      setSection(section + 1);
      setError("");
    }
    if (section === 2) {
      const data = {
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
      setSection(section + 1);
      setError("");
    }
  };

  const previoustSection = () => {
    if (section > 1) {
      setSection(section - 1);
    }
  };

  const validation = async () => {
    setLoading(true);
    let recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
    });
    const phone = user.countryCode + user.phoneNumber;
    await signInWithPhoneNumber(auth, phone, recaptchaVerifier)
      .then((response) => {
        setOTP(true);
        setConfirmationResult(response);
        //setResendCode(60);
        setLoading(false);
        alert("Código enviado");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error", error.message);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      name: user.name,
      surname: user.surname,
      phoneNumber: user.countryCode + user.phoneNumber,
      email: user.email,
      username: user.username,
      password: user.password,
    };

    confirmationResult
      .confirm(user.phoneConfirmation)
      .then((result) => {
        try {
          axios.post("https://trivi4.com/api/trivia/auth/signup", data, {
            headers,
          });
          return navigate("/login");
        } catch (error) {
          setLoading(false);
          console.error("Error", error);
          return;
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error", error);
      });
  };

  return (
    <Container>
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col xs="11" sm="11" md="5">
          <Card className="border-0 shadow-lg bg-white">
            <CardBody>
              <div>
                <p className="text-center">
                  <i className="bi bi-circle-fill text-info"></i>
                  Personal <i className="bi bi-dash-lg"></i>{" "}
                  <i
                    className={
                      section > 1
                        ? "bi bi-circle-fill text-info"
                        : "bi bi-circle-fill text-light"
                    }
                  ></i>{" "}
                  Cuenta
                  <i className="bi bi-dash-lg"></i>{" "}
                  <i
                    className={
                      section === 3
                        ? "bi bi-circle-fill text-info"
                        : "bi bi-circle-fill text-light"
                    }
                  ></i>{" "}
                  Confirmación
                </p>
              </div>
              <div>
                <Form onSubmit={handleSubmit}>
                  {section === 1 && (
                    <>
                      <h2>Información Personal</h2>
                      <Row xs="1" sm="1" md="1">
                        <Col>
                          <FormGroup floating>
                            <Input
                              type="text"
                              id="name"
                              name="name"
                              value={user.name}
                              onChange={handleChange}
                              placeholder="Nombre"
                              className="bg-light"
                            />
                            <Label for="name">Nombre</Label>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup floating>
                            <Input
                              type="text"
                              id="surname"
                              name="surname"
                              value={user.surname}
                              onChange={handleChange}
                              placeholder="Apellidos"
                              className="bg-light"
                            />
                            <Label for="surname">Apellidos</Label>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup floating>
                            <Input
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Email"
                              className="bg-light"
                              value={user.email}
                              onChange={handleChange}
                            />
                            <Label for="email">Email</Label>
                          </FormGroup>
                        </Col>
                        <Col>
                          <p className="text-danger text-center">{error}</p>
                        </Col>
                      </Row>
                    </>
                  )}
                  {section === 2 && (
                    <>
                      <h2>Información de Cuenta</h2>
                      <Row xs="1" sm="1" md="1">
                        <Col>
                          <FormGroup floating>
                            <Input
                              type="text"
                              id="username"
                              name="username"
                              value={user.username}
                              onChange={handleChange}
                              placeholder="Nombre de usuario"
                              className="bg-light"
                            />
                            <Label for="username">Nombre de usuario</Label>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup className="input_wrapper" floating>
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
                            <Label for="password">Contraseña</Label>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup className="input_wrapper" floating>
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
                            <Label for="passwordConfirmation">
                              Confirmar Contraseña
                            </Label>
                          </FormGroup>
                        </Col>
                        <Col>
                          <p className="text-danger text-center">{error}</p>
                        </Col>
                      </Row>
                    </>
                  )}
                  {section === 3 && (
                    <>
                      <h2>Confirmación de Teléfono</h2>
                      <Row xs="1" sm="1" md="1">
                        <Col>
                          <Row sm="2" md="2">
                            <Col sm="4" md="4">
                              <FormGroup floating>
                                <Input
                                  type="select"
                                  id="countryCode"
                                  name="countryCode"
                                  value={user.countryCode}
                                  onChange={handleChange}
                                  placeholder="Código de país"
                                  className="bg-light"
                                >
                                  <option value="+240">+240</option>
                                  <option value="+34">+34</option>
                                </Input>
                                <Label for="countryCode">Código de país</Label>
                              </FormGroup>
                            </Col>
                            <Col sm="8" md="8">
                              <FormGroup floating>
                                <Input
                                  type="number"
                                  id="phoneNumber"
                                  name="phoneNumber"
                                  value={user.phoneNumber}
                                  onChange={handleChange}
                                  placeholder="Teléfono"
                                  className="bg-light"
                                />
                                <Label for="phoneNumber">Teléfono</Label>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                        {otp && (
                          <Col>
                            <FormGroup floating>
                              <Input
                                type="text"
                                id="phoneConfirmation"
                                name="phoneConfirmation"
                                value={user.phoneConfirmation}
                                onChange={handleChange}
                                placeholder="Código de confirmación"
                                className="bg-light"
                              />
                              <Label for="phoneConfirmation">
                                Código de confirmación
                              </Label>
                            </FormGroup>
                          </Col>
                        )}
                        {/* {!resendCode == 0 ? (
                            <Col>
                              <CountdownTimer resendCode={resendCode} />
                            </Col>
                          ) : null} */}
                        <Col>
                          <p className="text-danger text-center">{error}</p>
                        </Col>
                      </Row>
                    </>
                  )}
                  <Row>
                    <Col>
                      {section > 1 && (
                        <Button
                          type="button"
                          onClick={previoustSection}
                          className="btn btn-info text-white"
                        >
                          Anterior
                        </Button>
                      )}
                    </Col>
                    <Col>
                      {section < 3 && (
                        <Button
                          type="button"
                          onClick={nextSection}
                          className="btn btn-info text-white right"
                        >
                          Siguiente
                        </Button>
                      )}
                      {section === 3 && !otp && (
                        <Button
                          type="button"
                          id="sign-in-button"
                          className="btn btn-info text-white right"
                          onClick={validation}
                        >
                          Enviar
                        </Button>
                      )}
                      {otp && (
                        <Button
                          type="submit"
                          className="btn btn-info text-white right"
                        >
                          Confirmar
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className="mt-3">
                <p>
                  ¿Ya tiene cuenta?{" "}
                  <Link
                    to={{ pathname: "/login" }}
                    className="text-info text_decoration_a left"
                  >
                    Inicie sesión
                  </Link>
                </p>
              </div>
            </CardBody>
          </Card>
          <div className="mt-3">
            <p>
              <small className="text-secondary">
                Al registrarse, acepta nuestros{" "}
                <Link
                  to={{ pathname: "/terms" }}
                  className="text-info text_decoration_a left"
                >
                  Términos
                </Link>{" "}
                y{" "}
                <Link
                  to={{ pathname: "/terms" }}
                  className="text-info text_decoration_a left"
                >
                  Política de privacidad
                </Link>
              </small>
            </p>
          </div>
          <div className={`loading-screen ${loading ? "visible" : "hidden"}`}>
            <div className="spinner"></div>
            <p>Cargando...</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
