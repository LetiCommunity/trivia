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

const PublishTrip = () => {
  const [section, setSection] = useState(1);
  const [showPlaceholderDate, setShowPlaceholderDate] = useState(true);
  const [showPlaceholderBilling, setShowPlaceholderBilling] = useState(true);
  const [travelData, setTravelData] = useState({
    user: {
      id: "",
    },
    travel: {
      from: "",
      to: "",
      date: "",
      airport: "",
      terminal: "",
      company: "",
      billingDate: "",
      availableWeight: "",
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTravelData((prevTravelData) => ({
      ...prevTravelData,
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
                  Información de viaje <i className="bi bi-dash-lg"></i>{" "}
                  <i className="bi bi-circle-fill"></i> Disponibilidad
                </p>
                <Form onSubmit={handleSubmit}>
                  {section === 1 && (
                    <>
                      <h2>Información de viaje</h2>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="text"
                              id="from"
                              name="from"
                              value={travelData.travel.from}
                              onChange={handleChange}
                              placeholder="Lugar de origen"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="text"
                              id="to"
                              name="to"
                              value={travelData.travel.to}
                              onChange={handleChange}
                              placeholder="Lugar de destino"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type={showPlaceholderDate ? "text" : "date"}
                              id="date"
                              name="date"
                              value={travelData.travel.date}
                              onChange={handleChange}
                              onFocus={() => setShowPlaceholderDate(false)}
                              placeholder="Fecha de viaje"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="text"
                              id="airport"
                              name="airport"
                              value={travelData.travel.airport}
                              onChange={handleChange}
                              placeholder="Aeropuerto de destino"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="text"
                              id="terminal"
                              name="terminal"
                              value={travelData.travel.terminal}
                              onChange={handleChange}
                              placeholder="Terminal de destino"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="text"
                              id="company"
                              name="company"
                              value={travelData.travel.company}
                              onChange={handleChange}
                              placeholder="Compañía con la que viaja"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type={showPlaceholderBilling ? "text" : "date"}
                              id="billingDate"
                              name="billingDate"
                              value={travelData.travel.billingDate}
                              onChange={handleChange}
                              onFocus={() => setShowPlaceholderBilling(false)}
                              placeholder="Fecha de facturación"
                              className="bg-light"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </>
                  )}
                  {section === 2 && (
                    <>
                      <h2>Información de disponibilidad</h2>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="number"
                              id="availableWeight"
                              name="availableWeight"
                              value={travelData.travel.availableWeight}
                              onChange={handleChange}
                              placeholder="Peso disponible"
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

export default PublishTrip;
