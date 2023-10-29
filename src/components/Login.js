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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
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

    try {
      const response = await fetch("http://localhost:8989/trivia-api/v1/login", {
        mode:"cors",
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
        window.location.href = "/profile";
      }
    } catch (error) {
      console.error("Error", error);
    }

    setUser({
      username: "",
      password: "",
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
                <h2 className="text-center">Inicio de sesión</h2>
                <Form onSubmit={handleSubmit}>
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
                      <p className="text-danger text-center">{error}</p>
                    </Col>
                    <Col md="12">
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
                <p>
                  ¿No tienes cuenta?{" "}
                  <a
                    href="registration"
                    className="text-info text_decoration_a"
                  >
                    Regístrate
                  </a>
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Login;
