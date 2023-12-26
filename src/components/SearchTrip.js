import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Input, Row } from "reactstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const SearchTrip = () => {
  const [travels, setTravels] = useState([]);
  const [travelFilter, setTravelFilter] = useState([]);
  let location = useLocation();
  const [searchTrip, setSearchTrip] = useState({
    origin: "",
    destination: "",
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
          "https://trivi4.com/api/trivia/travels"
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

  // const filterTrip = () => {
  //   let filter;
  //   if (!searchTrip.origin || !searchTrip.destination) {
  //     filter = (travel) => {
  //       return travel.origin === origin && travel.destination === destination;
  //     };
  //   } else {
  //     filter = (travel) => {
  //       return (
  //         travel.origin === searchTrip.origin &&
  //         travel.destination === searchTrip.destination
  //       );
  //     };
  //   }
  //   setTravelFilter(travels.filter(filter));
  // };

  // filterTrip();

  return (
    <Fragment>
      <div className="content">
        <div className="position-relative">
          <Row className="justify-content-center">
            <Col md="9" sm="11" xs="11">
              <div className="search_trip2">
                <Row>
                  <Col md="6" sm="6" xs="6">
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
                  <Col md="6" sm="6" xs="6">
                    <div className="py-1">
                      <Input
                        type="text"
                        id="destiny"
                        name="destiny"
                        value={searchTrip.destination}
                        onChange={handleChange}
                        placeholder="¿Cuál es la ciudad de destino?"
                        className="form-control-lg border-0 border-bottom"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <div className="position-relative py-5">
          <Row className="justify-content-center">
            <Col md="6" sm="11" xs="11">
              <div className="my-5 py-5 search_trip_found">
                {travelFilter.map((travel) => {
                  return (
                    <div key={travel.id}>
                      <div className="rounded bg-white text-dark p-3"></div>
                      <Card className="rounded text-dark p-3 shadow-lg bg-white border-0">
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
                        <p className="text-size">
                          {moment(travel.date).format("DD/MM/YYYY HH:mm:ss")}
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
