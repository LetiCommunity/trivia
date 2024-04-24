import React, { useEffect, useState } from "react";
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

const EditProfile = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const [error, setError] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headers = {
    token: `${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/trivia/profiles/profile",
          { headers }
        );
        setUser(data);
      } catch (error) {
        console.error("Error", error.message);
      }
    };
    getUser();
  }, [headers]);

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
      id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      username: user.username,
    };

    if (!data.name || !data.surname || !data.username) {
      setError("Por favor, rellena todos los campos");
      return;
    }

    if (
      data.name.trim() === "" ||
      data.surname.trim() === "" ||
      data.username.trim() === ""
    ) {
      setError("Por favor, revisa los espacios al inicio de los textos");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/trivia/profiles/profile`,
        data,
        {
          headers,
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return navigate("/profile");
    } catch (error) {
      setLoading(false);
      console.error("Error", error.message);
    }
  };

  return (
    <div className="content">
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
                      <FormGroup floating>
                        <Input
                          placeholder="Nombre"
                          type="text"
                          id="name"
                          name="name"
                          value={user.name}
                          onChange={handleChange}
                          className="form-control bg-light"
                        />
                        <Label for="name">Nombre</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup floating>
                        <Input
                          placeholder="Apellidos"
                          type="text"
                          id="surname"
                          name="surname"
                          value={user.surname}
                          onChange={handleChange}
                          className="form-control bg-light"
                        />
                        <Label for="surname">Apellidos</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup floating>
                        <Input
                          placeholder="Email"
                          type="text"
                          id="email"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                          className="form-control bg-light"
                        />
                        <Label for="email">Email</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup floating>
                        <Input
                          placeholder="Nombre de usuario"
                          type="text"
                          id="username"
                          name="username"
                          value={user.username}
                          onChange={handleChange}
                          className="form-control bg-light"
                        />
                        <Label for="username">Nombre de usuario</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <p className="text-danger text-center">{error}</p>
                    </Col>
                  </Row>
                  <Row>
                    <FormGroup className="text-center">
                      <Button type="submit" className="btn btn-info text-white">
                        Guardar
                      </Button>
                    </FormGroup>
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
    </div>
  );
};

export default EditProfile;
