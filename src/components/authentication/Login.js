import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const Login = () => {
  const localStoragePackage = localStorage.getItem("package");
  const localStorageTravel = localStorage.getItem("travel");
  const localStorageTraveler = localStorage.getItem("request");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const headers = {
    "Content-Type": "application/json",
  };
  const [user, setUser] = useState({
    username: "",
    password: "",
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
      username: user.username,
      password: user.password,
    };

    if (!data.username || !data.password) {
      setError("Por favor, rellena todos los campos");
      return;
    }

    if (data.username.trim() === "" || data.password.trim() === "") {
      setError("Por favor, revisa los espacios al inicio de los textos");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://trivi4.com/api/trivia/auth/signin",
        data,
        { headers }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      if (localStorageTraveler || localStoragePackage) {
        return (window.location.href = "/send-package");
      } else if (localStorageTravel) {
        return (window.location.href = "/publish-trip");
      }
      return (window.location.href = "/home");
    } catch (error) {
      console.error("Error", error.message);
      setLoading(false);
      setError("Usuario o contraseña incorrectos");
      return;
    }
  };

  return (
    <Container>
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col xs="11" sm="11" md="6">
          <Card className="border-0 shadow-lg bg-white">
            <CardBody>
              <div>
                <h2 className="text-center">Inicio de sesión</h2>
                <Form onSubmit={handleSubmit}>
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
                      <p className="text-danger text-center">{error}</p>
                    </Col>
                    <Col>
                      <FormGroup className="text-center">
                        <div className="d-grid gap-2 py-1">
                          <Button
                            type="submit"
                            className="btn btn-info text-white"
                          >
                            Iniciar sesión
                          </Button>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div>
                <Row xs="1" sm="2" md="2">
                  <Col>
                    <p>
                      ¿No tiene cuenta?{" "}
                      <Link
                        to={{ pathname: "/registration" }}
                        className="text-info text_decoration_a"
                      >
                        Regístrese
                      </Link>
                    </p>
                  </Col>
                  <Col>
                    <p>
                      <Link
                        to={{ pathname: "/reset-password" }}
                        className="text-info text_decoration_a"
                      >
                        Olvidé mi contraseña
                      </Link>
                    </p>
                  </Col>
                </Row>
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

export default Login;
