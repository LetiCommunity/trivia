import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  Col,
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
  const [error, setError] = useState("");
  const headers = {
    token: `${token}`,
    "Content-Type": "multipart/form-data",
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

    try {
      await axios.patch(
        `http://13.43.167.192/api/trivia/profiles/profile`,
        data,
        { headers }
      );
      return navigate("/profile");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="content">
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col md="5" sm="10" xs="10" className="my-5 py-5">
          <Card className="border-0 shadow-lg bg-white">
            <CardBody>
              <div>
                <Form onSubmit={handleSubmit}>
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
                  <FormGroup className="input_wrapper" floating>
                    <Input
                      type={showNewPasswordConfirmation ? "text" : "password"}
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
                  <Col md="12">
                    <p className="text-danger text-center">{error}</p>
                  </Col>
                  <FormGroup className="text-center">
                    <Button type="submit" className="btn btn-info text-white">
                      Guardar
                    </Button>
                  </FormGroup>
                </Form>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChangePassword;
