import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Col, Form, Input, Row } from "reactstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const SearchTrip = () => {
  const [travels, setTravels] = useState([]);
  const [searchTrip, setSearchTrip] = useState({
    origin: "",
    destiny: "",
  });

  useEffect(() => {
    const getTravels = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8989/trivia-api/v1/travels/"
        );
        setTravels(data);
      } catch (err) {
        console.error(err);
      }
    };
    getTravels();
  }, []);

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
  };

  return (
    <Fragment>
      <div className="content bg-secondary shadow-lg bg-light">
        <Row className="justify-content-center">
          <Col md="9" sm="11" xs="11">
            <div className="">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="5" sm="4" xs="4">
                    <div className="py-1">
                      <Input
                        type="text"
                        id="origin"
                        name="origin"
                        value={searchTrip.origin}
                        onChange={handleChange}
                        placeholder="¿Desde qué ciudad hace el envío?"
                        className="form-control-lg border-0 border-bottom"
                      />
                    </div>
                  </Col>
                  <Col md="5" sm="4" xs="4">
                    <div className="py-1">
                      <Input
                        type="text"
                        id="destiny"
                        name="destiny"
                        value={searchTrip.destiny}
                        onChange={handleChange}
                        placeholder="¿Cuál es la ciudad de destino?"
                        className="form-control-lg border-0 border-bottom"
                      />
                    </div>
                  </Col>
                  <Col md="2" sm="4" xs="4">
                    <div className="d-grid gap-2 py-2">
                      <Button
                        type="submit"
                        className="btn btn-info text-white form-control-lg"
                      >
                        Buscar
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="6" sm="11" xs="11">
            <div className="my-5">
              {travels.map((travel) => {
                return (
                  <a key={travel.id} href="#p" className="text_decoration_a">
                    <div className="rounded bg-white text-dark p-3">
                      <div className="input_wrapper">
                        <img
                          className="rounded-circle input_icon mt-3"
                          alt="https://icons8.com/icon/85356/male-user"
                          src={require("../assets/img/user-bar.png")}
                        />
                      </div>
                      <p className="text-size">
                        {travel.origin} a {travel.destination}
                      </p>
                      <p className="text-size">Viernes a las ...</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default SearchTrip;
