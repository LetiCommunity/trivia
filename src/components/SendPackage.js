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
  const [shippingDetails, setShippingDetails] = useState({
    user: {
      id: "",
    },
    receiver: {
      id: "",
      name: "",
      surname: "",
      address: "",
      phoneNumber: "",
    },
    package: {
      id: "",
      name: "",
      description: "",
      weight: "",
      image: "",
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setShippingDetails((prevShippingDetails) => ({
      ...prevShippingDetails,
      [name]: value,
    }));
  };

  const nextSection = () => {
    if (section < 2) {
      setSection(section + 1);
    }
  };

  const previoustSection = () => {
    if (section > 1) {
      setSection(section - 1);
    }
  };

  const handleSubmit = () => {};
  return (
    <Fragment>
      <div className="content">
        <Row
          className="justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Col md="5">
            <Card className="card-user">
              <CardBody>
                <p className="text-center">
                  <i
                    className={
                      section === 2
                        ? "bi bi-circle-fill text-success"
                        : "bi bi-circle-fill"
                    }
                  ></i>{" "}
                  Información de Receptor <i className="bi bi-dash-lg"></i>{" "}
                  <i className="bi bi-circle-fill"></i> Información de paquete
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
                              id="surname"
                              name="surname"
                              value={shippingDetails.receiver.surname}
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
                              id="address"
                              name="address"
                              value={shippingDetails.receiver.address}
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
                              id="phoneNumber"
                              name="phoneNumber"
                              value={shippingDetails.receiver.phoneNumber}
                              onChange={handleChange}
                              placeholder="Teléfono"
                              className="bg-light"
                            />
                          </FormGroup>
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
                              onChange={handleChange}
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
                              value={shippingDetails.package.weight}
                              onChange={handleChange}
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
                              onChange={handleChange}
                              className="bg-light"
                            />
                          </FormGroup>
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
                          className="btn btn-info text-white"
                        >
                          Siguiente
                        </Button>
                      )}
                      {section === 2 && (
                        <Button
                          type="submit"
                          className="btn btn-info text-white"
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
