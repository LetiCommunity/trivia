import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const ChangePassword = () => {
  const token = localStorage.getItem("token");
  let navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const headers = {
    token: `${token}`,
    "Content-Type": "application/json",
  };
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPassword((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !password.currentPassword ||
      !password.newPassword ||
      !password.confirmNewPassword
    ) {
      setError("Por favor, rellene todos los campos");
      return;
    }

    if (
      password.currentPassword.trim() === "" ||
      password.newPassword.trim() === "" ||
      password.confirmNewPassword.trim() === ""
    ) {
      setError("Por favor, revise los espacios al inicio de los textos");
      return;
    }

    if (!(password.newPassword === password.confirmNewPassword)) {
      setError(
        "Por favor, verifique que la contraseña coincida con la confirmación"
      );
      return;
    }

    const data = {
      currentPassword: password.currentPassword,
      newPassword: password.newPassword,
    };

    setLoading(true);
    try {
      await axios.patch(
        `http://localhost:5000/api/trivia/profiles/profile/password`,
        data,
        { headers }
      );
      return navigate("/profile");
    } catch (error) {
      setLoading(false);
      console.error("Error", error);
    }
  };

  return (
    <Container>
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col md="5" sm="11" xs="11" className="my-5 py-5">
          <Card className="border-0 shadow-lg bg-white">
            <CardBody>
              <div>
                <Form onSubmit={handleSubmit}>
                  <Row xs="1" sm="1" md="1">
                    <Col>
                      <FormGroup className="input_wrapper" floating>
                        <Input
                          type={showCurrentPassword ? "text" : "password"}
                          id="currentPassword"
                          name="currentPassword"
                          value={password.currentPassword}
                          onChange={handleChange}
                          placeholder="Contraseña"
                          className="bg-light"
                        />
                        <a href="#showPassword" className="text-black">
                          <i
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                            className={
                              showCurrentPassword
                                ? "bi bi-eye-slash-fill input_icon"
                                : "bi bi-eye-fill input_icon"
                            }
                          ></i>
                        </a>
                        <Label for="currentPassword">Contraseña actual</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup className="input_wrapper" floating>
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          id="newPassword"
                          name="newPassword"
                          value={password.newPassword}
                          onChange={handleChange}
                          placeholder="Confirmar contraseña"
                          className="bg-light"
                        />
                        <a href="#showPassword" className="text-black">
                          <i
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className={
                              showNewPassword
                                ? "bi bi-eye-slash-fill input_icon"
                                : "bi bi-eye-fill input_icon"
                            }
                          ></i>
                        </a>
                        <Label for="newPassword">Nueva Contraseña</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup className="input_wrapper" floating>
                        <Input
                          type={
                            showNewPasswordConfirmation ? "text" : "password"
                          }
                          id="confirmNewPassword"
                          name="confirmNewPassword"
                          value={password.confirmNewPassword}
                          onChange={handleChange}
                          placeholder="Confirmar contraseña"
                          className="bg-light"
                        />
                        <a href="#showPassword" className="text-black">
                          <i
                            onClick={() =>
                              setShowNewPasswordConfirmation(
                                !showNewPasswordConfirmation
                              )
                            }
                            className={
                              showNewPasswordConfirmation
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
                  <Row>
                    <Col>
                      <FormGroup className="text-center">
                        <Button
                          type="submit"
                          className="btn btn-info text-white"
                        >
                          Guardar
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </div>
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

export default ChangePassword;
