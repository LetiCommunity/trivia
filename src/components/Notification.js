import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Modal, Row } from "reactstrap";
import axios from "axios";

const Notification = () => {
  const token = localStorage.getItem("token");
  const [requests, setRequests] = useState();
  const [acceptedRequest, setAcceptedRequest] = useState();
  const [suggestions, setSuggestions] = useState();
  const [viewMoreRequests, setViewMoreRequests] = useState(false);
  const [viewMoreAcceptedRequests, setViewMoreAcceptedRequests] = useState(false);
  const [viewMoreSuggestions, setViewMoreSuggestions] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [acceptedRequestModal, setAcceptedRequestModal] = useState(false);
  const [suggestionsModal, setSuggestionsModal] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headers = {
    token: `${token}`,
    "Content-Type": "application/json",
  };

  const [userRequest, setUserRequest] = useState({});
  const [userAcceptedRequest, setUserAcceptedRequest] = useState({});
  const [userSuggestions, setUserSuggestions] = useState({});

  useEffect(() => {
    const getRequests = async () => {
      try {
        const { data } = await axios.get(
          "https://trivi4.com/api/trivia/packages/filterByRequest",
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
    const getAcceptedRequests = async () => {
      try {
        const { data } = await axios.get(
          "https://trivi4.com/api/trivia/packages/filterByAcceptedRequest",
          { headers }
        );
        if (viewMoreAcceptedRequests) {
          setAcceptedRequest(data);
        } else {
          setAcceptedRequest(data.slice(0, 3));
        }
      } catch (error) {
        console.error("Error", error.message);
      }
    };
    getAcceptedRequests();
  }, [headers, viewMoreAcceptedRequests]);

  useEffect(() => {
    const getSuggestions = async () => {
      try {
        const { data } = await axios.get(
          "https://trivi4.com/api/trivia/packages/filterByMatch",
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

  const handleViewMoreAcceptedRequests = () => {
    setViewMoreAcceptedRequests(!viewMoreAcceptedRequests);
  };

  const handleViewMoreSuggestions = () => {
    setViewMoreSuggestions(!viewMoreSuggestions);
  };

  const togglePackageDetails = () => {
    setRequestModal(!requestModal);
  };

  const togglePackageAcceptedDetails = () => {
    setAcceptedRequestModal(!acceptedRequestModal);
  };

  const toggleTravelDetails = () => {
    setSuggestionsModal(!suggestionsModal);
  };

  const handleRequestDetails = (item) => {
    setUserRequest(item);
    togglePackageDetails();
  };

  const handleAccptedRequestDetails = (item) => {
    setUserAcceptedRequest(item);
    togglePackageAcceptedDetails();
  };

  const handleSuggestionsDetails = (item) => {
    setUserSuggestions(item);
    toggleTravelDetails();
  };

  const handleConfirmation = async (id) => {
    try {
      await axios.get(
        `https://trivi4.com/api/trivia/packages/requests/confirmation/${id}`,
        { headers }
      );
      togglePackageDetails();
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  const handleAcceptance = async (id) => {
    try {
      await axios.get(
        `https://trivi4.com/api/trivia/packages/suggestions/confirmation/${id}`,
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
        `https://trivi4.com/api/trivia/packages/requests/rejection/${id}`,
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
            {acceptedRequest ? (
              <Col md="6" sm="10" xs="10">
                <div className="my-5 py-5">
                  <h3>Paquetes aceptados</h3>
                  {acceptedRequest.map((item) => {
                    return (
                      <div key={item._id}>
                        <div className="rounded bg-light text-dark p-3"></div>
                        <Card className="rounded text-dark p-3 shadow-lg bg-white border-0">
                          <p className="text-size">
                            Descripción: {item.description}
                          </p>
                          <Button
                            id="tooltip5456779"
                            title="Detalles del accepted request"
                            type="button"
                            color="link"
                            outline={true}
                            className="text-info"
                            onClick={() => handleAccptedRequestDetails(item)}
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
                      onClick={handleViewMoreAcceptedRequests}
                    >
                      {handleViewMoreAcceptedRequests ? "Ver menos" : "Ver más"}
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
                      <h4 className="modal-title">Detalles del paquete</h4>
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
                            <h5>Información del paquete</h5>
                            <p>Descripción: {userSuggestions.description}</p>
                            <img
                              className="package-image"
                              alt={userSuggestions.image}
                              src={`https://trivi4.com/api/trivia/packages/image/${userSuggestions.image}`}
                            />
                          </div>
                          <div>
                            <Row>
                              <Col md="6" sm="6" xs="6">
                                <div>
                                  <Button
                                    type="button"
                                    onClick={() =>
                                      handleAcceptance(userSuggestions._id)
                                    }
                                    className="btn btn-info text-white"
                                  >
                                    Aceptar
                                  </Button>
                                </div>
                              </Col>
                              {/* <Col md="6" sm="6" xs="6">
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
                              </Col> */}
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
          <Row
            className="justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Col md="5" sm="10" xs="10" className="my-5 py-5">
              <Modal
                isOpen={acceptedRequestModal}
                toggle={togglePackageAcceptedDetails}
                backdrop={false}
              >
                <Card className="border-0 shadow-lg bg-white">
                  <CardBody>
                    <div className="modal-header">
                      <h4 className="modal-title">Detalles del Paquete</h4>
                      <button
                        type="button"
                        className="close"
                        onClick={togglePackageAcceptedDetails}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      {userAcceptedRequest && (
                        <div>
                          <div>
                            <h5>Información del paquete</h5>
                            <p>Descripción: {userAcceptedRequest.description}</p>
                            <img
                              className="package-image"
                              alt={userAcceptedRequest.image}
                              src={`https://trivi4.com/api/trivia/packages/image/${userAcceptedRequest.image}`}
                            />
                            <p>Su paquete ha sido aceptado</p>
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
