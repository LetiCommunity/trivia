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
import Compressor from "compressorjs";

const ChangePassword = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  let navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const headers = {
    token: `${token}`,
    "Content-Type": "multipart/form-data",
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Checks if a file was selected
    if (!file) {
      setError("Por favor, seleccione una imagen");
      return;
    }

    // Verify the file type
    if (!file.type.startsWith("image/")) {
      setError("Por favor, escoja una imagen");
      return;
    }

    // Verify the maximum size allowed (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("El tamaño máximo de la imagen de ser de 5MB");
      return;
    }

    new Compressor(file, {
      quality: 0.6,
      success: (compressedResult) => {
        setImage(compressedResult);
      },
    });

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
    if (!image) {
      setError("Por favor, escoja una imagen");
      return;
    }

    try {
      await axios.patch(
        `https://trivi4.com/api/trivia/profiles/profile/image`,
        { image },
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
                    alt="Imagen cargada"
                    className="rounded-circle profile"
                    src={
                      user.image
                        ? `https://trivi4.com/api/trivia/profiles/image/${user.image}`
                        : inicialImage
                    }
                  />
                )}
              </div>
              <div>
                <Form onSubmit={handleSubmit}>
                  <FormGroup floating>
                    <Input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleImageUpload}
                      className="bg-light"
                    />
                    <Label for="image">Imagen de perfil</Label>
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
