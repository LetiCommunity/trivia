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

const SendPackage = () => {
  const [section, setSection] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [shippingDetails, setShippingDetails] = useState({
    user: {
      id: "",
    },
    receiver: {
      name: "",
      surname: "",
      address: "",
      phoneNumber: "",
    },
    package: {
      name: "",
      description: "",
      weight: "",
      image: "",
    },
  });

  const handleChange = (event, parentField) => {
    const { name, value } = event.target;

    setShippingDetails((prevShippingDetails) => {
      if (parentField) {
        return {
          ...prevShippingDetails,
          [parentField]: {
            ...prevShippingDetails[parentField],
            [name]: value,
          },
        };
      } else {
        return {
          ...prevShippingDetails,
          [name]: value,
        };
      }
    });
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
  }

  const nextSection = () => {
    if (section < 2) {
      const data = {
        name: shippingDetails.receiver.name,
        surname: shippingDetails.receiver.surname,
        address: shippingDetails.receiver.address,
        phoneNumber: shippingDetails.receiver.phoneNumber,
      };

      if (!data.name || !data.surname || !data.address || !data.phoneNumber) {
        setError("Por favor, rellena todos los campos");
        return;
      }

      if (
        data.name.trim() === "" ||
        data.surname.trim() === "" ||
        data.address.trim() === "" ||
        data.phoneNumber.trim() === ""
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
      user: {
        id: shippingDetails.user.id,
      },
      receiver: {
        name: shippingDetails.receiver.name,
        surname: shippingDetails.receiver.surname,
        address: shippingDetails.receiver.address,
        phoneNumber: shippingDetails.receiver.phoneNumber,
      },
      package: {
        name: shippingDetails.package.name,
        description: shippingDetails.package.description,
        weight: shippingDetails.package.weight,
        image: shippingDetails.package.image,
      },
    };

    if (
      !data.package.name ||
      !data.package.description ||
      !data.package.weight
    ) {
      setError("Por favor, rellena todos los campos");
      return;
    }

    if (
      data.package.name.trim() === "" ||
      data.package.description.trim() === ""
    ) {
      setError("Por favor, revisa los espacios al inicio de los textos");
      return;
    }

    
    /**try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token);
        window.location.href = "/admin/dashboard";
      }
    } catch (error) {
      console.error("Error", error);
    }*/

    setShippingDetails({
      user: {
        id: "",
      },
      receiver: {
        name: "",
        surname: "",
        address: "",
        phoneNumber: "",
      },
      package: {
        name: "",
        description: "",
        weight: "",
        image: "",
      },
    });
    setError("");
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
                  <i
                    className={
                      section === 2
                        ? "bi bi-circle-fill text-info"
                        : "bi bi-circle-fill text-light"
                    }
                  ></i>{" "}
                  Información de Receptor <i className="bi bi-dash-lg"></i>{" "}
                  <i className="bi bi-circle-fill text-light"></i> Información de paquete
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
                              id="name"
                              name="name"
                              value={shippingDetails.receiver.name}
                              onChange={(e) => handleChange(e, "receiver")}
                              placeholder="Nombre"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="text"
                              id="surname"
                              name="surname"
                              value={shippingDetails.receiver.surname}
                              onChange={(e) => handleChange(e, "receiver")}
                              placeholder="Apellidos"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="text"
                              id="address"
                              name="address"
                              value={shippingDetails.receiver.address}
                              onChange={(e) => handleChange(e, "receiver")}
                              placeholder="Dirección"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="text"
                              id="phoneNumber"
                              name="phoneNumber"
                              value={shippingDetails.receiver.phoneNumber}
                              onChange={(e) => handleChange(e, "receiver")}
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
                              type="text"
                              id="name"
                              name="name"
                              value={shippingDetails.package.name}
                              onChange={(e) => handleChange(e, "package")}
                              placeholder="Nombre"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="textarea"
                              id="description"
                              name="description"
                              value={shippingDetails.package.description}
                              onChange={(e) => handleChange(e, "package")}
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
                              value={shippingDetails.package.weight}
                              onChange={(e) => handleChange(e, "package")}
                              placeholder="Peso"
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
                              value={shippingDetails.package.image}
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
