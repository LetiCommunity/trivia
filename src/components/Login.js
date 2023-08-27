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
                            className={showPassword ? "bi bi-eye-slash-fill input_icon" : "bi bi-eye-fill input_icon"}
                          ></i>
                        </a>
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup className="text-center">
                        <Button
                          type="submit"
                          className="btn btn-info text-white"
                        >
                          Iniciar sesión
                        </Button>
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
