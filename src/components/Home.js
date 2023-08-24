import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Col, Form, Input, Row } from "reactstrap";
import Navbar from "./UserNavbar";
import Footer from "./Footer";

const Home = () => {
  return (
    <Fragment>
      <header>
        <Navbar />
      </header>
      <div className="text-center">
        <Row>
          <Col md="12" sm="12">
            <div className="thumbnail mb-5">
              <h1 className="title text-white">Envía fácil y rápido tu paquete</h1>
              <img
                className="img-fluid w-100"
                alt="Trivia"
                src={require("../assets/img/bg.jpg")}
              />
              <div className="search_trip">
                <Card>
                  <Form>
                    <div>
                      <Input
                        type="text"
                        placeholder="¿Desde qué ciudad hace el envío?"
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        placeholder="¿Cuál es la ciudad de destino?"
                      />
                    </div>
                    <div className="d-grid gap-2">
                      <Button
                        type="submit"
                        className="btn btn-info d-grid gap-2 text-white"
                      >
                        Buscar
                      </Button>
                    </div>
                  </Form>
                </Card>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col md="6">
            <div className="mt-5">
              <div className="py-2">
                <img
                  className="img-fluid w-100"
                  alt="Trivia"
                  src={require("../assets/img/win.jpg")}
                />
              </div>
            </div>
          </Col>
          <Col md="6">
            <div>
              <h5>Gana dinero viajando</h5>
              <p>
                Gana dinero extra compartiendo espacio de tu equipaje mientras
                viajas.
              </p>
              <Button type="button" className="btn btn-info text-white">
                Publica tu viaje
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mt-5 align-items-center">
          <Col xs="12" sm="12" md="6" className="order-2 order-md-1">
            <div>
              <h5>Envío fácil, rápido y seguro</h5>
              <p>
                Envía tus paquetes de forma segura y económica al destino
                deseado aprovechando la red de viajeros de Trivia.
              </p>
              <Button type="button" className="btn btn-info text-white">
                Realiza tu envío
              </Button>
            </div>
          </Col>
          <Col xs="12" sm="12" md="6" className="order-1 order-md-2">
            <div>
              <div className="py-2">
                <img
                  className="img-fluid w-100"
                  alt="Trivia"
                  src={require("../assets/img/sends.jpg")}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <footer className="footer bg-dark text-white fixed-button">
        <Footer />
      </footer>
    </Fragment>
  );
};

export default Home;
