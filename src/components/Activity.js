import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import axios from "axios";

const Activity = ({ token }) => {
  const localStoragePackage = localStorage.getItem("package");
  const localStorageTravel = localStorage.getItem("travel");
  const [packages, setPackages] = useState([]);
  const [travels, setTravels] = useState([]);
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  };

  useEffect(() => {
    const getPackages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8989/trivia-api/v1/packages/"
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
          "http://localhost:8989/trivia-api/v1/travels/"
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
          "http://localhost:8989/trivia-api/v1/packages",
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
          "http://localhost:8989/trivia-api/v1/travels/save",
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
        <div className="position-relative py-5">
          <Row className="justify-content-center">
            <Col md="6" sm="11" xs="11">
              <div className="my-5 py-5 search_trip_found">
                {travels.map((travel) => {
                  return (
                    <a key={travel.id} href="#p" className="text_decoration_a">
                      <div className="rounded bg-white text-dark p-3"></div>
                      <Card className="rounded text-dark p-3 shadow-lg bg-white border-0">
                        <p className="text-size">
                          {travel.origin} a {travel.destination}
                        </p>
                        <p className="text-size">{travel.date}</p>
                      </Card>
                    </a>
                  );
                })}
              </div>
              <div className="my-5 py-5 search_trip_found">
                {packages.map((item) => {
                  return (
                    <a key={item.id} href="#p" className="text_decoration_a">
                      <div className="rounded bg-white text-dark p-3"></div>
                      <Card className="rounded text-dark p-3 shadow-lg bg-white border-0">
                        <p className="text-size">{item.description}</p>
                        <p className="text-size">{item.date}</p>
                      </Card>
                    </a>
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

export default Activity;
