import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Col, Form, Input, Row } from "reactstrap";

const Home = () => {
  const [searchTrip, setSearchTrip] = useState({
    origin: "",
    destiny: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchTrip((prevSearchTrip) => ({
      ...prevSearchTrip,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      origin: searchTrip.origin,
      destiny: searchTrip.destiny,
    };

    if (!data.origin || !data.destiny) {
      return;
    }

    if (data.origin.trim() === "" || data.destiny.trim() === "") {
      return;
    }

    setSearchTrip({
      origin: "",
      destiny: "",
    });
  };
  return (
    <Fragment>
      <div className="content">
        <Row>
          <Col md="12" sm="12">
            <div className="thumbnail mb-5">
              <h1 className="title">Envía fácil y rápido tu paquete</h1>
              <img
                className="img-fluid w-100"
                alt="Trivia"
                src={require("../assets/img/bg.jpg")}
              />
              <div className="search_trip">
                <Card className="py-2 px-2">
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md="5 ">
                        <div className="py-1">
                          <Input
                            type="text"
                            id="origin"
                            name="origin"
                            value={searchTrip.origin}
                            onChange={handleChange}
                            placeholder="¿Desde qué ciudad hace el envío?"
                            className="border-bottom"
                          />
                        </div>
                      </Col>
                      <Col md="5">
                        <div className="py-1">
                          <Input
                            type="text"
                            id="destiny"
                            name="destiny"
                            value={searchTrip.destiny}
                            onChange={handleChange}
                            placeholder="¿Cuál es la ciudad de destino?"
                            className="border-bottom"
                          />
                        </div>
                      </Col>
                      <Col md="2">
                        <div className="d-grid gap-2 py-1">
                          <Button
                            type="submit"
                            className="btn btn-info text-white"
                          >
                            Buscar
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Card>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="align-items-center text-center my-5 mx-5">
          <Col md="4">
            <div className="">
              <div className="">
                <img
                  className="img-fluid rounded-circle"
                  alt="Trivia"
                  src={require("../assets/img/user.png")}
                />
              </div>
              <div>
                <h5>Gana dinero viajando</h5>
                <p>
                  Gana dinero extra compartiendo espacio de tu equipaje mientras
                  viajas.
                </p>
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="">
              <div className="">
                <img
                  className="img-fluid rounded-circle"
                  alt="Trivia"
                  src={require("../assets/img/user.png")}
                />
              </div>
              <div>
                <h5>Gana dinero viajando</h5>
                <p>
                  Gana dinero extra compartiendo espacio de tu equipaje mientras
                  viajas.
                </p>
              </div>
            </div>
          </Col>
          <Col md="4">
            <div>
              <div>
                <img
                  className="img-fluid rounded-circle"
                  alt="Trivia"
                  src={require("../assets/img/user.png")}
                />
              </div>
              <div>
                <h5>Gana dinero viajando</h5>
                <p>
                  Gana dinero extra compartiendo espacio de tu equipaje mientras
                  viajas.
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="align-items-center text-center my-5 py-2">
          <Col md="5">
            <div className="text-center">
              <div>
                <img
                  className="img-fluid"
                  alt="Trivia"
                  src={require("../assets/img/win.jpg")}
                />
              </div>
            </div>
          </Col>
          <Col md="7">
            <div>
              <h5>Gana dinero viajando</h5>
              <p>
                Gana dinero extra compartiendo espacio de tu equipaje mientras
                viajas.
              </p>
              <div>
                <Button type="button" className="btn btn-info text-white">
                  Publica tu viaje
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="align-items-center text-center my-5 py-2">
          <Col xs="12" sm="12" md="7" className="order-2 order-md-1">
            <div>
              <h5>Envío fácil, rápido y seguro</h5>
              <p>
                Envía tus paquetes de forma segura y económica al destino
                deseado aprovechando la red de viajeros de Trivia.
              </p>
              <div className="text-center">
                <Button type="button" className="btn btn-info text-white">
                  Realiza tu envío
                </Button>
              </div>
            </div>
          </Col>
          <Col xs="12" sm="12" md="5" className="order-1 order-md-2">
            <div>
              <div>
                <img
                  className="img-fluid"
                  alt="Trivia"
                  src={require("../assets/img/send.jpg")}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Home;
