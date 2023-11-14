import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "reactstrap";
import axios from "axios";

const Activity = () => {
  const token = localStorage.getItem("token");
  const localStoragePackage = localStorage.getItem("package");
  const localStorageTravel = localStorage.getItem("travel");
  const [packages, setPackages] = useState([]);
  const [travels, setTravels] = useState([]);
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
        setPackages(data);
      } catch (err) {
        console.error(err);
      }
    };
    getPackages();
  }, []);

  useEffect(() => {
    const getTravels = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/trivia/travels/proprietor",
          { headers }
        );
        setTravels(data);
      } catch (err) {
        console.error(err);
      }
    };
    getTravels();
  }, []);

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
          JSON.parse(localStoragePackage),
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
                        <p className="text-size">{item.createdAt}</p>
                      </Card>
                    </div>
                  );
                })}
                <div>
                  <Button
                    type="button"
                    onClick={""}
                    color="link"
                    outline={true}
                    className="text-info"
                  >
                    Ver más
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
                          <img
                            className="rounded-circle input_icon mt-3"
                            alt={item.image}
                            src={`http://localhost:5000/api/trivia/packages/image/${item.image}`}
                          />
                        </div>
                        <p className="text-size">
                          {item.image} {item.description}
                        </p>
                        <p className="text-size">{item.createdAt}</p>
                      </Card>
                    </div>
                  );
                })}
                <div>
                  <Button
                    type="button"
                    onClick={""}
                    color="link"
                    outline={true}
                    className="text-info"
                  >
                    Ver más
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
