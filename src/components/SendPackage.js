import React, { Fragment, useState } from "react";
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
  Row,
} from "reactstrap";

const SendPackage = ({ token }) => {
  let navigate = useNavigate();
  const [section, setSection] = useState(1);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState("");
  const headers = {
    token: `${token}`,
    "Content-Type": "multipart/form-data",
  };
  const [shippingDetails, setShippingDetails] = useState({
    description: "",
    weight: "",
    receiverName: "",
    receiverSurname: "",
    receiverAddress: "",
    receiverPhone: "",
  });

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
    setImageUrl(file);
  };

  const nextSection = () => {
    if (section < 2) {
      const data = {
        receiverName: shippingDetails.receiverName,
        receiverSurname: shippingDetails.receiverSurname,
        receiverAddress: shippingDetails.receiverAddress,
        receiverPhone: shippingDetails.receiverPhone,
      };

      if (
        !data.receiverName ||
        !data.receiverSurname ||
        !data.receiverAddress ||
        !data.receiverPhone
      ) {
        setError("Por favor, rellena todos los campos");
        return;
      }

      if (
        data.receiverName.trim() === "" ||
        data.receiverSurname.trim() === "" ||
        data.receiverAddress.trim() === "" ||
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
      receiverAddress: shippingDetails.receiverAddress,
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

    if (!token) {
      localStorage.setItem("package", JSON.stringify(data));
      return navigate("/login");
    }

    try {
      await axios.post("http://localhost:5000/api/trivia/packages", data, {
        headers,
      });
      return navigate("/activity");
    } catch (error) {
      console.error("Error", error);
      return;
    }
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
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="text"
                              id="receiverName"
                              name="receiverName"
                              value={shippingDetails.receiverName}
                              onChange={handleChange}
                              placeholder="Nombre"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="text"
                              id="receiverSurname"
                              name="receiverSurname"
                              value={shippingDetails.receiverSurname}
                              onChange={handleChange}
                              placeholder="Apellidos"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="text"
                              id="receiverAddress"
                              name="receiverAddress"
                              value={shippingDetails.receiverAddress}
                              onChange={handleChange}
                              placeholder="Dirección"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="text"
                              id="receiverPhone"
                              name="receiverPhone"
                              value={shippingDetails.receiverPhone}
                              onChange={handleChange}
                              placeholder="Teléfono"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <p className="text-danger text-center">{error}</p>
                        </Col>
                      </Row>
                    </>
                  )}
                  {section === 2 && (
                    <>
                      <h2>Información de paquete</h2>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="textarea"
                              id="description"
                              name="description"
                              value={shippingDetails.description}
                              onChange={handleChange}
                              placeholder="Descripción"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="number"
                              id="weight"
                              name="weight"
                              value={shippingDetails.weight}
                              onChange={handleChange}
                              placeholder="Peso aproximado..."
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="file"
                              id="image"
                              name="image"
                              onChange={handleImageUpload}
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <p className="text-danger text-center">{error}</p>
                        </Col>
                      </Row>
                    </>
                  )}
                  <Row>
                    <Col md="6" xs="6">
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
                    <Col md="6" xs="6" className="text-center">
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
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default SendPackage;
