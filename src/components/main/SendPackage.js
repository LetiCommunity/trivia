import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import Compressor from "compressorjs";

const SendPackage = () => {
  const token = localStorage.getItem("token");
  const traveler = localStorage.getItem("request");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const { id } = useParams();
  const [section, setSection] = useState(1);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headers = {
    token: `${token}`,
    "Content-Type": "multipart/form-data",
  };
  const [shippingDetails, setShippingDetails] = useState({
    description: "",
    weight: "",
    receiverName: "",
    receiverSurname: "",
    receiverCity: "Malabo",
    receiverStreet: "",
    receiverPhone: "",
  });

  localStorage.removeItem("package");

  useEffect(() => {
    const getPackage = async () => {
      if (id) {
        try {
          const { data } = await axios.get(
            `https://trivi4.com/api/trivia/packages/${id}`,
            { headers }
          );
          setShippingDetails(data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    getPackage();
  }, [headers, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShippingDetails((prevShippingDetails) => ({
      ...prevShippingDetails,
      [name]: value,
    }));
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
        setImageUrl(compressedResult);
      },
    });
  };

  const nextSection = () => {
    if (section < 2) {
      const data = {
        receiverName: shippingDetails.receiverName,
        receiverSurname: shippingDetails.receiverSurname,
        receiverCity: shippingDetails.receiverCity,
        receiverStreet: shippingDetails.receiverStreet,
        receiverPhone: shippingDetails.receiverPhone,
      };

      if (
        !data.receiverName ||
        !data.receiverSurname ||
        !data.receiverCity ||
        !data.receiverStreet ||
        !data.receiverPhone
      ) {
        setError("Por favor, rellena todos los campos");
        return;
      }

      if (
        data.receiverName.trim() === "" ||
        data.receiverSurname.trim() === "" ||
        data.receiverCity.trim() === "" ||
        data.receiverStreet.trim() === "" ||
        data.receiverPhone.trim() === ""
      ) {
        setError("Por favor, revisa los espacios al inicio de los textos");
        return;
      }
      setSection(section + 1);
      setError("");
    }
  };

  const previoustSection = () => {
    if (section > 1) {
      setSection(section - 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      description: shippingDetails.description,
      weight: shippingDetails.weight,
      image: imageUrl,
      receiverName: shippingDetails.receiverName,
      receiverSurname: shippingDetails.receiverSurname,
      receiverCity: shippingDetails.receiverCity,
      receiverStreet: shippingDetails.receiverStreet,
      receiverPhone: shippingDetails.receiverPhone,
    };

    if (!data.description || !data.weight || !data.image) {
      setError("Por favor, rellena todos los campos");
      return;
    }

    if (data.description.trim() === "") {
      setError("Por favor, revisa los espacios al inicio de los textos");
      return;
    }

    setLoading(true);
    try {
      if (id) {
        await axios.put(`https://trivi4.com/api/trivia/packages/${id}`, data, {
          headers,
        });
      } else if (traveler) {
        await axios.post(
          `https://trivi4.com/api/trivia/packages/requests/${traveler}`,
          data,
          {
            headers,
          }
        );
        localStorage.removeItem("request");
      } else {
        await axios.post("https://trivi4.com/api/trivia/packages", data, {
          headers,
        });
      }
      return navigate("/activity");
    } catch (error) {
      setLoading(false);
      console.error("Error", error.message);
      return;
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
              <p className="text-center">
                <i className="bi bi-circle-fill text-info"></i> Información de
                Receptor <i className="bi bi-dash-lg"></i>{" "}
                <i
                  className={
                    section === 2
                      ? "bi bi-circle-fill text-info"
                      : "bi bi-circle-fill text-light"
                  }
                ></i>{" "}
                Información de paquete
              </p>
              <Form onSubmit={handleSubmit}>
                {section === 1 && (
                  <>
                    <h2>Información de receptor</h2>
                    <Row xs="1" sm="1" md="1">
                      <Col>
                        <FormGroup floating>
                          <Input
                            type="text"
                            id="receiverName"
                            name="receiverName"
                            value={shippingDetails.receiverName}
                            onChange={handleChange}
                            placeholder="Nombre"
                            className="bg-light"
                          />
                          <Label for="receiverName">Nombre</Label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup floating>
                          <Input
                            type="text"
                            id="receiverSurname"
                            name="receiverSurname"
                            value={shippingDetails.receiverSurname}
                            onChange={handleChange}
                            placeholder="Apellidos"
                            className="bg-light"
                          />
                          <Label for="receiverSurname">Apellidos</Label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup floating>
                          <Input
                            type="select"
                            id="receiverCity"
                            name="receiverCity"
                            value={shippingDetails.receiverCity}
                            onChange={handleChange}
                            placeholder="Dirección"
                            className="bg-light"
                          >
                            <option value="Malabo">Malabo</option>
                            <option value="Bata">Bata</option>
                            <option value="Madrid">Madrid</option>
                          </Input>
                          <Label for="receiverCity">Ciudad</Label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup floating>
                          <Input
                            type="text"
                            id="receiverStreet"
                            name="receiverStreet"
                            value={shippingDetails.receiverStreet}
                            onChange={handleChange}
                            placeholder="Calle o Barrio"
                            className="bg-light"
                          />
                          <Label for="receiverStreet">Calle o Barrio</Label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup floating>
                          <Input
                            type="number"
                            id="receiverPhone"
                            name="receiverPhone"
                            value={shippingDetails.receiverPhone}
                            onChange={handleChange}
                            placeholder="Teléfono"
                            className="bg-light"
                          />
                          <Label for="receiverPhone">Teléfono</Label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <p className="text-danger text-center">{error}</p>
                      </Col>
                    </Row>
                  </>
                )}
                {section === 2 && (
                  <>
                    <h2>Información de paquete</h2>
                    <Row xs="1" sm="1" md="1"> 
                      <Col>
                        <FormGroup floating>
                          <Input
                            type="textarea"
                            id="description"
                            name="description"
                            value={shippingDetails.description}
                            onChange={handleChange}
                            placeholder="Descripción"
                            className="bg-light"
                          />
                          <Label for="description">Descripción</Label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup floating>
                          <Input
                            type="number"
                            id="weight"
                            name="weight"
                            value={shippingDetails.weight}
                            onChange={handleChange}
                            placeholder="Peso aproximado..."
                            className="bg-light"
                          />
                          <Label for="weight">Peso aproximado...</Label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup floating>
                          <Input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleImageUpload}
                            className="bg-light"
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <p className="text-danger text-center">{error}</p>
                      </Col>
                    </Row>
                  </>
                )}
                <Row>
                  <Col>
                    {section === 2 && (
                      <Button
                        type="button"
                        onClick={previoustSection}
                        className="btn btn-info text-white"
                      >
                        Anterior
                      </Button>
                    )}
                  </Col>
                  <Col>
                    {section === 1 && (
                      <Button
                        type="button"
                        onClick={nextSection}
                        className="btn btn-info text-white right"
                      >
                        Siguiente
                      </Button>
                    )}
                    {section === 2 && (
                      <Button
                        type="submit"
                        className="btn btn-info text-white right"
                      >
                        Enviar
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
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

export default SendPackage;
