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
          "https://trivi4.com/api/trivia/profiles/profile",
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

    try {
      const response = await axios.put(
        `https://trivi4.com/api/trivia/profiles/profile`,
        data,
        {
          headers,
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return navigate("/profile");
    } catch (error) {
      console.error("Error", error.message);
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

export default EditProfile;
