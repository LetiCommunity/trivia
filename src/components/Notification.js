import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "reactstrap";
import axios from "axios";

const Notification = () => {
  const token = localStorage.getItem("token");
  const [Requests, setRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [viewMoreRequests, setViewMoreRequests] = useState(false);
  const [viewMoreSuggestions, setViewMoreSuggestions] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headers = {
    token: `${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const getRequests = async () => {
      try {
        const { data } = await axios.get(
          "https://trivi4.com/api/trivia/packages/filterByTraveler",
          { headers }
        );
        if (viewMoreRequests) {
          setRequests(data);
        } else {
          setRequests(data.slice(0, 3));
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    getRequests();
  }, [headers, viewMoreRequests]);

  useEffect(() => {
    const getSuggestions = async () => {
      try {
        const { data } = await axios.get(
          "https://trivi4.com/api/trivia/travels/filterByMatch",
          { headers }
        );
        if (viewMoreSuggestions) {
          setSuggestions(data);
        } else {
          setSuggestions(data.slice(0, 3));
        }
      } catch (err) {
        console.error(err);
      }
    };
    getSuggestions();
  }, [headers, suggestions, viewMoreSuggestions]);

  const handleViewMoreRequests = () => {
    setViewMoreRequests(!viewMoreRequests);
  };

  const handleViewMoreSuggestions = () => {
    setViewMoreSuggestions(!viewMoreSuggestions);
  };

  return (
    <Fragment>
      <div className="content">
        <div className="px-5">
          <Row className="justify-content-center">
            <Col md="6" sm="10" xs="10">
              <div className="my-5 py-5">
                <h3>Solicitudes de envío</h3>
                {Requests.map((item) => {
                  return (
                    <div key={item._id}>
                      <div className="rounded bg-light text-dark p-3"></div>
                      <Card className="rounded text-dark p-3 shadow-lg bg-white border-0">
                        <div className="">
                          <img
                            className="package-image input_icon"
                            alt={item.image}
                            src={`https://trivi4.com/api/trivia/packages/image/${item.image}`}
                          />
                        </div>
                        <p className="text-size">
                          Descripción: {item.description}
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
                    onClick={handleViewMoreRequests}
                  >
                    {viewMoreRequests ? "Ver menos" : "Ver más"}
                  </Button>
                </div>
              </div>
            </Col>
            <Col md="6" sm="10" xs="10">
              <div className="my-5 py-5">
                <h3>Sugerencias</h3>
                {suggestions.map((item) => {
                  return (
                    <div key={item._id}>
                      <div className="rounded bg-light text-dark p-3"></div>
                      <Card className="rounded text-dark p-3 shadow-lg bg-white border-0">
                        <div className="">
                          <img
                            className="package-image input_icon"
                            alt={item.image}
                            src={`https://trivi4.com/api/trivia/packages/image/${item.image}`}
                          />
                        </div>
                        <p className="text-size">
                          Descripción: {item.description}
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
                    onClick={handleViewMoreSuggestions}
                  >
                    {viewMoreSuggestions ? "Ver menos" : "Ver más"}
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

export default Notification;
