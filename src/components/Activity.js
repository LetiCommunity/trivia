import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "reactstrap";
import axios from "axios";
import moment from "moment";
//import { Buffer } from 'buffer';

const Activity = () => {
  const token = localStorage.getItem("token");
  const localStoragePackage = localStorage.getItem("package");
  const localStorageTravel = localStorage.getItem("travel");
  const [packages, setPackages] = useState([]);
  const [travels, setTravels] = useState([]);
  const [viewMorePackages, setViewMorePackages] = useState(false);
  const [viewMoreTravels, setViewMoreTravels] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headers = {
    token: `${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const getPackages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/trivia/packages/proprietor",
          { headers }
        );
        if (viewMorePackages) {
          setPackages(data);
        } else {
          setPackages(data.slice(0, 3));
        }
      } catch (err) {
        console.error(err);
      }
    };
    getPackages();
  }, [headers, travels, viewMorePackages]);

  useEffect(() => {
    const getTravels = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/trivia/travels/proprietor",
          { headers }
        );
        if (viewMoreTravels) {
          setTravels(data);
        } else {
          setTravels(data.slice(0, 3));
        }
      } catch (err) {
        console.error(err);
      }
    };
    getTravels();
  }, [headers, travels, viewMoreTravels]);

  const handleLocalStorageData = async () => {
    if (localStoragePackage) {
      try {
        await axios.post(
          "http://localhost:5000/api/trivia/packages",
          JSON.parse(localStoragePackage),
          { headers }
        );
        localStorage.removeItem("package");
      } catch (error) {
        console.error("Error", error);
        return;
      }
    }

    if (localStorageTravel) {
      try {
        await axios.post(
          "http://localhost:5000/api/trivia/travels",
          JSON.parse(localStorageTravel),
          { headers }
        );
        localStorage.removeItem("travel");
      } catch (error) {
        console.error("Error", error);
        return;
      }
    }
  };
  handleLocalStorageData();

  const handleViewMorePackages = () => {
    setViewMorePackages(!viewMorePackages);
  };

  const handleViewMoreTravels = () => {
    setViewMoreTravels(!viewMoreTravels);
  };

  return (
    <Fragment>
      <div className="content">
        <div className="px-5">
          <Row className="justify-content-center">
            <Col md="6" sm="10" xs="10">
              <div className="my-5 py-5">
                <h3>Viajes publicados</h3>
                {travels.map((item) => {
                  return (
                    <div key={item._id}>
                      <div className="rounded bg-light text-dark p-3"></div>
                      <Card className="rounded text-dark p-3 shadow-lg bg-white border-0">
                        <p className="text-size">
                          {item.origin} a {item.destination}
                        </p>
                        <p className="text-size">
                          {moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                        </p>
                      </Card>
                    </div>
                  );
                })}
                <div>
                  <Button
                    type="button"
                    color="link"
                    outline={true}
                    className="text-info"
                    onClick={handleViewMoreTravels}
                  >
                    {viewMoreTravels ? "Ver menos" : "Ver más"}
                  </Button>
                </div>
              </div>
            </Col>
            <Col md="6" sm="10" xs="10">
              <div className="my-5 py-5">
                <h3>Paquetes publicados</h3>
                {packages.map((item) => {
                  return (
                    <div key={item._id}>
                      <div className="rounded bg-light text-dark p-3"></div>
                      <Card className="rounded text-dark p-3 shadow-lg bg-white border-0">
                        <div className="input_wrapper">
                          {/* <img
                            className="rounded-circle input_icon mt-3"
                            alt={item.image}
                            src={axios
                              .get(
                                `http://localhost:5000/api/trivia/packages/image/${item.image}`,
                                { headers }
                              )
                              .then((response) => Buffer.from(response.data))}
                          /> */}
                        </div>
                        <p className="text-size">
                          {item.image} {item.description}
                        </p>
                        <p className="text-size">
                          {moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                        </p>
                      </Card>
                    </div>
                  );
                })}
                <div>
                  <Button
                    type="button"
                    color="link"
                    outline={true}
                    className="text-info"
                    onClick={handleViewMorePackages}
                  >
                    {viewMorePackages ? "Ver menos" : "Ver más"}
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
};

export default Activity;
