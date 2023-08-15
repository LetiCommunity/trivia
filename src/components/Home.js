import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Button, Container, Form, Input } from "reactstrap";

const Home = () => {
  return (
    <Fragment>
      <Container fluid>
        <div className="thumbnail">
          <h1 className="title">Envía fácil y rápido tu paquete</h1>
          <img
            className="img-fluid w-100"
            alt="Trivia"
            src={require("../assets/img/bg.jpg")}
          />
          <div className="search_trip">
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
                <Button type="submit" className="btn btn-info d-grid gap-2">
                  Buscar
                </Button>
              </div>
            </Form>
          </div>
        </div>
        <div className="text-center">
          <div className="pt-5">
            <h5>Gana dinero viajando</h5>
            <img
              className="img-fluid w-100"
              alt="Trivia"
              src={require("../assets/img/bg.jpg")}
            />
            <p>Gana dinero extra compartiendo espacio en tu equipaje</p>
          </div>
          <div>
            <h5>Envío fácil, rápido y seguro</h5>
            <img
              className="img-fluid w-100"
              alt="Trivia"
              src={require("../assets/img/bg.jpg")}
            />
            <p>
              Envía tus paquetes de forma segura y económica al destino deseado
            </p>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Home;
