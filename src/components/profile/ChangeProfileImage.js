import React, { useEffect, useState } from "react";
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
import inicialImage from "../../assets/img/user.png";
import Compressor from "compressorjs";

const ChangePassword = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  let navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headers = {
    token: `${token}`,
    "Content-Type": "multipart/form-data",
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          "https://api.trivi4.com/api/trivia/profiles/profile",
          { headers }
        );
        setUser(data);
      } catch (error) {
        console.error("Error", error.message);
      }
    };
    getUser();
  }, [headers]);

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

    setLoading(true);
    try {
      await axios.patch(
        `https://api.trivi4.com/api/trivia/profiles/profile/image`,
        { image },
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
                        ? `https://api.trivi4.com/api/trivia/profiles/image/${user.image}`
                        : inicialImage
                    }
                  />
                )}
              </div>
              <div>
                <Form onSubmit={handleSubmit}>
                  <Row xs="1" sm="1" md="1">
                    <Col>
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
