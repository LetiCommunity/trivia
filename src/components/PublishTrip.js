import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const PublishTrip = () => {
  const token = localStorage.getItem("token");
  let navigate = useNavigate();
  const { id } = useParams();
  const [section, setSection] = useState(1);
  const [error, setError] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headers = {
    token: `${token}`,
    "Content-Type": "application/json",
  };

  const [travel, setTravel] = useState({
    origin: "Malabo",
    destination: "Bata",
    date: "",
    airport: "",
    terminal: "",
    company: "",
    billingTime: "",
    availableWeight: "",
  });

  localStorage.removeItem("travel");

  useEffect(() => {
    const getTravel = async () => {
      if (id) {
        try {
          const { data } = await axios.get(
            `https://trivi4.com/api/trivia/travels/${id}`,
            { headers }
          );
          setTravel(data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    getTravel();
  }, [headers, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTravel((prevTravel) => ({
      ...prevTravel,
      [name]: value,
    }));
  };

  const nextSection = () => {
    if (section < 2) {
      const data = {
        origin: travel.origin,
        destination: travel.destination,
        date: travel.date,
        airport: travel.airport,
        terminal: travel.terminal,
        company: travel.company,
        billingTime: travel.billingTime,
      };

      if (
        !data.origin ||
        !data.destination ||
        !data.date ||
        !data.airport ||
        !data.terminal ||
        !data.company ||
        !data.billingTime
      ) {
        setError("Por favor, rellena todos los campos");
        return;
      }

      if (data.origin === data.destination) {
        setError("Por favor, verifique que su origen y destino no sean el mismo");
        return;
      }

      if (
        data.origin.trim() === "" ||
        data.destination.trim() === "" ||
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
      origin: travel.origin,
      destination: travel.destination,
      date: travel.date,
      airport: travel.airport,
      terminal: travel.terminal,
      company: travel.company,
      billingTime: travel.billingTime,
      availableWeight: travel.availableWeight,
    };

    if (!data.availableWeight) {
      setError("Por favor, rellena todos los campos");
      return;
    }

    // if (!token) {
    //   localStorage.setItem("travel", JSON.stringify(data));
    //   return navigate("/login");
    // }

    try {
      if (!id) {
        await axios.post("https://trivi4.com/api/trivia/travels", data, {
          headers,
        });
      } else {
        await axios.put(`https://trivi4.com/api/trivia/travels/${id}`, data, {
          headers,
        });
      }
      return navigate("/activity");
    } catch (error) {
      console.error("Error", error.message);
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
                  viaje <i className="bi bi-dash-lg"></i>{" "}
                  <i
                    className={
                      section === 2
                        ? "bi bi-circle-fill text-info"
                        : "bi bi-circle-fill text-light"
                    }
                  ></i>{" "}
                  Disponibilidad
                </p>
                <Form onSubmit={handleSubmit}>
                  {section === 1 && (
                    <>
                      <h2>Información de viaje</h2>
                      <Row>
                        <Col md="12">
                          <FormGroup floating>
                            <Input
                              type="select"
                              id="origin"
                              name="origin"
                              value={travel.origin}
                              onChange={handleChange}
                              placeholder="Lugar de origen"
                              className="bg-light"
                            >
                              <option value="Malabo">Malabo</option>
                              <option value="Bata">Bata</option>
                              <option value="Madrid">Madrid</option>
                            </Input>
                            <Label for="origin">Lugar de origen</Label>
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup floating>
                            <Input
                              type="select"
                              id="destination"
                              name="destination"
                              value={travel.destination}
                              onChange={handleChange}
                              placeholder="Lugar de destino"
                              className="bg-light"
                            >
                              <option value="Malabo">Malabo</option>
                              <option value="Bata">Bata</option>
                              <option value="Madrid">Madrid</option>
                            </Input>
                            <Label for="destination">Lugar de destino</Label>
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup floating>
                            <Input
                              type="date"
                              id="date"
                              name="date"
                              value={travel.date}
                              onChange={handleChange}
                              placeholder="Fecha de viaje"
                              className="bg-light"
                            />
                            <Label for="date">Fecha de viaje</Label>
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup floating>
                            <Input
                              type="text"
                              id="airport"
                              name="airport"
                              value={travel.airport}
                              onChange={handleChange}
                              placeholder="Aeropuerto de destino"
                              className="bg-light"
                            />
                            <Label for="airport">Aeropuerto</Label>
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup floating>
                            <Input
                              type="text"
                              id="terminal"
                              name="terminal"
                              value={travel.terminal}
                              onChange={handleChange}
                              placeholder="Terminal de destino"
                              className="bg-light"
                            />
                            <Label for="terminal">Terminal de destino</Label>
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup floating>
                            <Input
                              type="text"
                              id="company"
                              name="company"
                              value={travel.company}
                              onChange={handleChange}
                              placeholder="Compañía con la que viaja"
                              className="bg-light"
                            />
                            <Label for="company">
                              Compañía con la que viaja
                            </Label>
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup floating>
                            <Input
                              type="time"
                              id="billingTime"
                              name="billingTime"
                              value={travel.billingTime}
                              onChange={handleChange}
                              placeholder="Fecha de facturación"
                              className="bg-light"
                            />
                            <Label for="billingTime">Hora de facturación</Label>
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
                        <Col md="12" className="">
                          <Label for="availableWeight">
                            ¿Con cuánto peso adicional quiere viajar?
                          </Label>
                        </Col>
                        <Col md="12" className="">
                          <p className="text-size">
                            {travel.availableWeight} kilos (
                            {travel.availableWeight * 750} XAF)
                          </p>
                        </Col>
                        <Col md="12">
                          <FormGroup floating>
                            <Input
                              type="range"
                              id="availableWeight"
                              name="availableWeight"
                              min="5"
                              max="20"
                              size="lg"
                              variant="info"
                              tooltip="auto"
                              value={travel.availableWeight}
                              onChange={handleChange}
                              className="text-info"
                              placeholder="¿Con cuánto peso adicional puedes viajar (en kilos)?"
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
