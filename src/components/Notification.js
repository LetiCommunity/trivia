import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Modal, Row } from "reactstrap";
import axios from "axios";
import moment from "moment";

const Notification = () => {
  const token = localStorage.getItem("token");
  const [requests, setRequests] = useState();
  const [suggestions, setSuggestions] = useState();
  const [viewMoreRequests, setViewMoreRequests] = useState(false);
  const [viewMoreSuggestions, setViewMoreSuggestions] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [suggestionsModal, setSuggestionsModal] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headers = {
    token: `${token}`,
    "Content-Type": "application/json",
  };

  const [userRequest, setUserRequest] = useState({});
  const [userSuggestions, setUserSuggestions] = useState({});

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
        console.error("Error", error.message);
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
      } catch (error) {
        console.error("Error", error.message);
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

  const togglePackageDetails = () => {
    setRequestModal(!requestModal);
  };

  const toggleTravelDetails = () => {
    setSuggestionsModal(!suggestionsModal);
  };

  const handleRequestDetails = (item) => {
    setUserRequest(item);
    togglePackageDetails();
  };

  const handleSuggestionsDetails = (item) => {
    setUserSuggestions(item);
    toggleTravelDetails();
  };

  const handleConfirmation = async (id) => {
    try {
      await axios.get(
        `https://trivi4.com/api/trivia/packages/confirmation/${id}`,
        { headers }
      );
      togglePackageDetails();
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  const handleRejection = async (id) => {
    try {
      await axios.get(
        `https://trivi4.com/api/trivia/packages/rejection/${id}`,
        {
          headers,
        }
      );
      togglePackageDetails();
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  return (
    <Fragment>
      <div className="content">
        <div className="px-5">
          <Row className="justify-content-center">
            {requests ? (
              <Col md="6" sm="10" xs="10">
                <div className="my-5 py-5">
                  <h3>Solicitudes de envío</h3>
                  {requests.map((item) => {
                    return (
                      <div key={item._id}>
                        <div className="rounded bg-light text-dark p-3"></div>
                        <Card className="rounded text-dark p-3 shadow-lg bg-white border-0">
                          <p className="text-size">
                            Descripción: {item.description}
                          </p>
                          <Button
                            id="tooltip5456779"
                            title="Detalles del request"
                            type="button"
                            color="link"
                            outline={true}
                            className="text-info"
                            onClick={() => handleRequestDetails(item)}
                          >
                            Ver más
                          </Button>
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
            ) : null}
            {suggestions ? (
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
                          <Button
                            id="tooltip5456779"
                            title="Detalles del sugerencia"
                            type="button"
                            color="link"
                            outline={true}
                            className="text-info"
                            onClick={() => handleSuggestionsDetails(item)}
                          >
                            Ver más
                          </Button>
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
            ) : null}
          </Row>
        </div>
        <div>
          <Row>
            <Col md="12">
              <Modal
                isOpen={suggestionsModal}
                toggle={toggleTravelDetails}
                backdrop={false}
              >
                <Card className="border-0 shadow-lg bg-white">
                  <CardBody>
                    <div className="modal-header">
                      <h4 className="modal-title">Detalles del viaje</h4>
                      <button
                        type="button"
                        className="close"
                        onClick={toggleTravelDetails}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      {userSuggestions && (
                        <div>
                          <div>
                            <h5>Información del viaje</h5>
                            <p>Origen: {userSuggestions.origin}</p>
                            <p>Destino: {userSuggestions.destination}</p>
                            <p>
                              Fecha:{" "}
                              {moment(userSuggestions.date).format(
                                "DD/MM/YYYY"
                              )}
                            </p>
                            <p>Aeropuerto: {userSuggestions.airport}</p>
                            <p>Terminal: {userSuggestions.terminal}</p>
                            <p>Compañía: {userSuggestions.company}</p>
                            <p>
                              Hora de facturación: {userSuggestions.billingTime}
                            </p>
                          </div>
                          <div>
                            <h5>Información de disponibilidad</h5>
                            <p>
                              Disponibilidad: {userSuggestions.availableWeight}{" "}
                              kilos
                            </p>
                          </div>
                          <div>
                            <Row>
                              <Col md="6" sm="6" xs="6">
                                <div>
                                  <Button
                                    type="button"
                                    onClick={() =>
                                      handleConfirmation(userSuggestions._id)
                                    }
                                    className="btn btn-info text-white"
                                  >
                                    Aceptar
                                  </Button>
                                </div>
                              </Col>
                              <Col md="6" sm="6" xs="6">
                                <div className="right">
                                  <Button
                                    type="button"
                                    onClick={() =>
                                      handleRejection(userSuggestions._id)
                                    }
                                    className="btn btn-danger text-white"
                                  >
                                    Rechazar
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Modal>
            </Col>
          </Row>
          <Row
            className="justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Col md="5" sm="10" xs="10" className="my-5 py-5">
              <Modal
                isOpen={requestModal}
                toggle={togglePackageDetails}
                backdrop={false}
              >
                <Card className="border-0 shadow-lg bg-white">
                  <CardBody>
                    <div className="modal-header">
                      <h4 className="modal-title">Detalles del Paquete</h4>
                      <button
                        type="button"
                        className="close"
                        onClick={togglePackageDetails}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      {userRequest && (
                        <div>
                          <div>
                            <h5>Información del paquete</h5>
                            <p>Descripción: {userRequest.description}</p>
                            <img
                              className="package-image"
                              alt={userRequest.image}
                              src={`https://trivi4.com/api/trivia/packages/image/${userRequest.image}`}
                            />
                          </div>
                          <div className="pt-2">
                            <Row>
                              <Col md="6" sm="6" xs="6">
                                <div>
                                  <Button
                                    type="button"
                                    onClick={() =>
                                      handleConfirmation(userRequest._id)
                                    }
                                    className="btn btn-info text-white"
                                  >
                                    Confirmar
                                  </Button>
                                </div>
                              </Col>
                              <Col md="6" sm="6" xs="6">
                                <div className="right">
                                  <Button
                                    type="button"
                                    onClick={() =>
                                      handleRejection(userRequest._id)
                                    }
                                    className="btn btn-danger text-white"
                                  >
                                    Rechazar
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Modal>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
};

export default Notification;
