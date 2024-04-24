import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

const Registration = () => {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [otp, setOTP] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [section, setSection] = useState(1);
  const headers = {
    "Content-Type": "application/json",
  };
  const [user, setUser] = useState({
    newPassword: "",
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

  const validation = async () => {
    setLoading(true);
    let recaptchaVerifier = new RecaptchaVerifier(auth, "validation-button", {
      size: "invisible",
    });
    const phone = user.countryCode + user.phoneNumber;
    await signInWithPhoneNumber(auth, phone, recaptchaVerifier)
      .then((response) => {
        setOTP(true);
        setConfirmationResult(response);
        setLoading(false);
        alert("Código enviado");
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });
  };

  const confirmationNumber = () => {
    setLoading(true);
    confirmationResult
      .confirm(user.phoneConfirmation)
      .then((result) => {
        setLoading(false);
        setSection(section + 1);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error", error.message);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      phoneNumber: user.phoneNumber,
      newPassword: user.newPassword,
      passwordConfirmation: user.passwordConfirmation,
    };

    if (!data.newPassword || !data.passwordConfirmation) {
      setError("Por favor, rellena todos los campos");
      return;
    }

    if (
      data.newPassword.trim() === "" ||
      data.passwordConfirmation.trim() === ""
    ) {
      setError("Por favor, revisa los espacios al inicio de los textos");
      return;
    }

    if (!(data.newPassword === data.passwordConfirmation)) {
      setError(
        "Por favor, revisa que la contraseña y la confirmación coincidan"
      );
      return;
    }

    setLoading(true);
    try {
      axios.patch("http://localhost:5000/api/trivia/auth/resetPassword", data, {
        headers,
      });
      return navigate("/login");
    } catch (error) {
      setLoading(false);
      console.error("Error", error.message);
      return;
    }
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
              <p className="text-center">
                <i className="bi bi-circle-fill text-info"></i>
                Confirmación <i className="bi bi-dash-lg"></i>{" "}
                <i
                  className={
                    section === 2
                      ? "bi bi-circle-fill text-info"
                      : "bi bi-circle-fill text-light"
                  }
                ></i>{" "}
                Contraseña
              </p>
              <Form onSubmit={handleSubmit}>
                {section === 1 && (
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
                {section === 2 && (
                  <>
                    <h2>Nueva Contraseña</h2>
                    <Row>
                      <Col md="12">
                        <FormGroup className="input_wrapper" floating>
                          <Input
                            type={showPassword ? "text" : "password"}
                            id="newPassword"
                            name="newPassword"
                            value={user.newPassword}
                            onChange={handleChange}
                            placeholder="Nueva contraseña"
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
                          <Label for="newPassword">Nueva contraseña</Label>
                        </FormGroup>
                      </Col>
                      <Col md="12">
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
                      <Col md="12">
                        <p className="text-danger text-center">{error}</p>
                      </Col>
                    </Row>
                  </>
                )}
                <Row>
                  <Col>
                    {section < 2 && !otp && (
                      <Button
                        type="button"
                        id="validation-button"
                        className="btn btn-info text-white right"
                        onClick={validation}
                      >
                        Enviar
                      </Button>
                    )}
                    {section < 2 && otp && (
                      <Button
                        type="button"
                        className="btn btn-info text-white right"
                        onClick={confirmationNumber}
                      >
                        Confirmar
                      </Button>
                    )}
                    {section === 2 && (
                      <Button
                        type="submit"
                        className="btn btn-info text-white right"
                      >
                        Finalizar
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
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
