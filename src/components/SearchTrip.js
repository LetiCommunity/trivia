import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import axios from "axios";
import moment from "moment";

import inicialImage from "../assets/img/user-bar.png";

const SearchTrip = () => {
  const [travels, setTravels] = useState([]);
  let navigate = useNavigate();
  let location = useLocation();
  const [searchTrip, setSearchTrip] = useState({
    origin: "Malabo",
    destination: "Bata",
  });

  let queryParams = new URLSearchParams(location.search);
  let origin = queryParams.get("origin");
  let destination = queryParams.get("destination");
  origin = origin.charAt(0).toUpperCase() + origin.slice(1);
  destination = destination.charAt(0).toUpperCase() + destination.slice(1);

  useEffect(() => {
    const getTravels = async () => {
      try {
        const { data } = await axios.get(
          `https://trivi4.com/api/trivia/travels/filterByCity/${origin}/${destination}`
        );
        setTravels(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getTravels();
  }, [destination, origin]);

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
      destination: searchTrip.destination,
    };

    if (!data.origin || !data.destination) {
      return;
    }

    if (data.origin.trim() === "" || data.destination.trim() === "") {
      return;
    }

    return navigate(
      `/search-trip?origin=${data.origin}&destination=${data.destination}`
    );
  };

  const handleSelectedTrip = (traveler) => {
    localStorage.setItem("request", traveler);
    return navigate(`/send-package`);
  };

  return (
    <Fragment>
      <div className="content">
        <div className="position-relative">
          <Row className="justify-content-center">
            <Col md="12" sm="12" xs="12">
              <div className="search_trip">
                <Card className="py-2 px-2">
                  <Form onSubmit={handleSubmit}>
                    <div className="search_trip2">
                      <Row>
                        <Col md="5" sm="6" xs="6">
                          <div className="">
                            <FormGroup floating>
                              <Input
                                type="select"
                                id="origin"
                                name="origin"
                                value={searchTrip.origin}
                                onChange={handleChange}
                                placeholder="¿Desde qué ciudad hace el envío?"
                                className="form-control-lg border-0 border-bottom"
                              >
                                <option value="Malabo">Malabo</option>
                                <option value="Bata">Bata</option>
                                <option value="Madrid">Madrid</option>
                              </Input>
                              <Label for="origin">
                                ¿Desde qué ciudad hace el envío?
                              </Label>
                            </FormGroup>
                          </div>
                        </Col>
                        <Col md="5" sm="6" xs="6">
                          <div className="">
                            <FormGroup floating>
                              <Input
                                type="select"
                                id="destination"
                                name="destination"
                                value={searchTrip.destination}
                                onChange={handleChange}
                                placeholder="¿Cuál es la ciudad de destino?"
                                className="form-control-lg border-0 border-bottom"
                              >
                                <option value="Malabo">Malabo</option>
                                <option value="Bata">Bata</option>
                                <option value="Madrid">Madrid</option>
                              </Input>
                              <Label for="destination">
                                ¿Cuál es la ciudad de destino?
                              </Label>
                            </FormGroup>
                          </div>
                        </Col>
                        <Col md="2">
                          <div className="d-grid gap-2 pt-2">
                            <Button
                              type="submit"
                              className="btn btn-info text-white form-control-lg"
                            >
                              Buscar
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
        <div className="position-relative py-5 search_trip_found_content">
          <Row className="justify-content-center">
            <Col md="6" sm="12" xs="12">
              <div className="my-5 py-5 search_trip_found">
                {travels.map((travel) => {
                  return (
                    <div key={travel.id}>
                      <div className="rounded bg-white text-dark p-3"></div>
                      <Card
                        onClick={() => handleSelectedTrip(travel.traveler._id)}
                        className="rounded text-dark p-3 shadow-lg bg-white border-0"
                      >
                        <div className="input_wrapper">
                          <img
                            alt="Imagen cargada"
                            className="rounded-circle input_icon mt-3"
                            src={
                              travel.image
                                ? `https://trivi4.com/api/trivia/profiles/image/${travel.image}`
                                : inicialImage
                            }
                          />
                        </div>
                        <p className="text-size">
                          {travel.origin} a {travel.destination}
                        </p>
                        <p className="text-size">
                          {moment(travel.date).format("DD/MM/YYYY")}
                        </p>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
};

export default SearchTrip;