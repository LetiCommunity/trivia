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
import inicialImage from "../assets/img/user.png";

const EditProfile = () => {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("user"));
  let navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const headers = {
    token: `${token}`,
    "Content-Type": "application/json",
  };
  const [user, setUser] = useState({
    _id: userData._id,
    image: userData.image,
    name: userData.name,
    surname: userData.surname,
    email: userData.email,
    username: userData.username,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Checks if a file was selected
    if (!file) {
      return;
    }

    // Verify the file type
    if (!file.type.startsWith("image/")) {
      return;
    }

    // Verify the maximum size allowed (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return;
    }

    // Creates an instance of FileReader to read the file
    const reader = new FileReader();
    // Defines a callback function for when the reading of the file is completed.
    reader.onloadend = () => {
      const imageUrl = reader.result;
      setImageUrl(imageUrl);
    };
    reader.readAsDataURL(file);
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
      await axios.put(
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
              <div className="text-center m-3">
                {imageUrl.trim() ? (
                  <img
                    alt="Imagen cargada"
                    className="rounded-circle profile"
                    src={imageUrl}
                  />
                ) : (
                  <img
                    alt="Cargar imagen"
                    className="rounded-circle"
                    src={inicialImage}
                  />
                )}
              </div>
              <div>
                <Form onSubmit={handleSubmit}>
                  <FormGroup floating>
                    <Input
                      type="hidden"
                      id="_id"
                      name="_id"
                      value={user._id}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </FormGroup>
                  <FormGroup floating>
                    <Input
                      type="file"
                      id="image"
                      name="image"
                      value={user.image}
                      onChange={handleImageUpload}
                      className="bg-light"
                    />
                  </FormGroup>
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
