import React, { useState } from "react";
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
import inicialImage from "../assets/img/user.png";

const EditProfile = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [user, setUser] = useState({
    id: "",
    image: "",
    name: "",
    surname: "",
    email: "",
    username: "",
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

  const handleSubmit = () => {};

  return (
    <div className="content">
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col md="7" sm="10" xs="10">
          <Card className="card-user">
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
                  <FormGroup>
                    <Input
                      type="hidden"
                      id="id"
                      name="id"
                      value={user.id}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="file"
                      id="image"
                      name="image"
                      value={user.image}
                      onChange={handleImageUpload}
                      className="bg-light"
                    />
                  </FormGroup>                  
                  <FormGroup>
                    <Input
                      placeholder="Nombre"
                      type="text"
                      id="name"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      className="form-control bg-light"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      placeholder="Apellidos"
                      type="text"
                      id="surname"
                      name="surname"
                      value={user.surname}
                      onChange={handleChange}
                      className="form-control bg-light"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      placeholder="Nombre de usuario"
                      type="text"
                      id="username"
                      name="username"
                      value={user.username}
                      onChange={handleChange}
                      className="form-control bg-light"
                    />
                  </FormGroup>
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
