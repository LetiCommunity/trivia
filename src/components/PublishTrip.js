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
  const [error, setError] = useState("");
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

  const handleChange = (event, parentField) => {
    const { name, value } = event.target;

    setTravelData((prevTravelData) => {
      if (parentField) {
        return {
          ...prevTravelData,
          [parentField]: {
            ...prevTravelData[parentField],
            [name]: value,
          },
        };
      } else {
        return {
          ...prevTravelData,
          [name]: value,
        };
      }
    });
  };

  const nextSection = () => {
    if (section < 2) {
      const data = {
        from: travelData.travel.from,
        to: travelData.travel.to,
        date: travelData.travel.date,
        airport: travelData.travel.airport,
        terminal: travelData.travel.terminal,
        company: travelData.travel.company,
        billingDate: travelData.travel.billingDate,
      };

      if (
        !data.from ||
        !data.to ||
        !data.date ||
        !data.airport ||
        !data.terminal ||
        !data.company ||
        !data.billingDate
      ) {
        setError("Por favor, rellena todos los campos");
        return;
      }

      if (
        data.from.trim() === "" ||
        data.to.trim() === "" ||
        data.airport.trim() === "" ||
        data.terminal.trim() === "" ||
        data.company.trim() === ""
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
        id: travelData.user.id,
      },
      travel: {
        from: travelData.travel.from,
        to: travelData.travel.to,
        date: travelData.travel.date,
        airport: travelData.travel.airport,
        terminal: travelData.travel.terminal,
        company: travelData.travel.company,
        billingDate: travelData.travel.billingDate,
        availableWeight: travelData.travel.availableWeight,
      },
    };

    if (!data.travel.availableWeight) {
      setError("Por favor, rellena todos los campos");
      return;
    }

    // if (
    //   data.package.name.trim() === "" ||
    //   data.package.description.trim() === ""
    // ) {
    //   setError("Por favor, revisa los espacios al inicio de los textos");
    //   return;
    // }

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

    setTravelData({
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
                  Información de viaje <i className="bi bi-dash-lg"></i>{" "}
                  <i className="bi bi-circle-fill text-light"></i> Disponibilidad
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
                              onChange={(e) => handleChange(e, "travel")}
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
                              onChange={(e) => handleChange(e, "travel")}
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
                              onChange={(e) => handleChange(e, "travel")}
                              onFocus={() => setShowPlaceholderDate(false)}
                              onBlur={() => setShowPlaceholderDate(true)}
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
                              onChange={(e) => handleChange(e, "travel")}
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
                              onChange={(e) => handleChange(e, "travel")}
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
                              onChange={(e) => handleChange(e, "travel")}
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
                              onChange={(e) => handleChange(e, "travel")}
                              onFocus={() => setShowPlaceholderBilling(false)}
                              onBlur={() => setShowPlaceholderDate(true)}
                              placeholder="Fecha de facturación"
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
                      <h2>Información de disponibilidad</h2>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="number"
                              id="availableWeight"
                              name="availableWeight"
                              value={travelData.travel.availableWeight}
                              onChange={(e) => handleChange(e, "travel")}
                              placeholder="Peso disponible"
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

export default PublishTrip;
