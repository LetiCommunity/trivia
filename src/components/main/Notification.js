import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Container, Modal, Row } from "reactstrap";
import axios from "axios";

const Notification = () => {
  const token = localStorage.getItem("token");
  const [requests, setRequests] = useState([]);
  const [acceptedRequest, setAcceptedRequest] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [viewMoreRequests, setViewMoreRequests] = useState(true);
  const [viewMoreAcceptedRequests, setViewMoreAcceptedRequests] =
    useState(true);
  const [viewMoreSuggestions, setViewMoreSuggestions] = useState(true);
  const [requestModal, setRequestModal] = useState(false);
  const [acceptedRequestModal, setAcceptedRequestModal] = useState(false);
  const [suggestionsModal, setSuggestionsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);
  const [loadingAcceptedRequest, setLoadingAcceptedRequest] = useState(true);
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
          setLoadingRequests(false);
        } else {
          setRequests([]);
        }
      } catch (error) {
        console.error("Error", error.message);
        setLoadingRequests(false);
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
          setLoadingAcceptedRequest(false);
        } else {
          setAcceptedRequest([]);
        }
      } catch (error) {
        console.error("Error", error.message);
        setLoadingAcceptedRequest(false);
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
          setLoadingSuggestions(false);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error", error.message);
        setLoadingSuggestions(false);
      }
    };
    getSuggestions();
  }, [headers, viewMoreSuggestions]);

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
    setLoading(true);
    try {
      await axios.get(
        `https://trivi4.com/api/trivia/packages/requests/confirmation/${id}`,
        { headers }
      );
      togglePackageDetails();
      setLoading(false);
    } catch (error) {
      console.error("Error", error.message);
      setLoading(false);
    }
  };

  const handleAcceptance = async (id) => {
    setLoading(true);
    try {
      await axios.get(
        `https://trivi4.com/api/trivia/packages/suggestions/confirmation/${id}`,
        { headers }
      );
      togglePackageDetails();
      setLoading(false);
    } catch (error) {
      console.error("Error", error.message);
      setLoading(false);
    }
  };

  const handleRejection = async (id) => {
    setLoading(true);
    try {
      await axios.get(
        `https://trivi4.com/api/trivia/packages/requests/rejection/${id}`,
        {
          headers,
        }
      );
      togglePackageDetails();
      setLoading(false);
    } catch (error) {
      console.error("Error", error.message);
      setLoading(false);
    }
  };

  return (
    <Container>
      <div>
        <Row className="justify-content-center">
          <Col md="5" sm="11" xs="11">
            <div className="pt-2">
              <div>
                <Button
                  type="button"
                  color="link"
                  outline={true}
                  className="text-black"
                  onClick={handleViewMoreRequests}
                >
                  Solicitudes de envío
                  {viewMoreRequests ? (
                    <i className="bi bi-caret-up-fill"></i>
                  ) : (
                    <i className="bi bi-caret-down-fill"></i>
                  )}
                </Button>
              </div>
              {requests ? (
                <div>
                  {requests.map((item) => {
                    return (
                      <div key={item._id}>
                        <div className="rounded bg-light text-dark p-1"></div>
                        <Card
                          className="rounded text-dark p-2 shadow-lg bg-white border-0 card_pointer"
                          onClick={() => handleRequestDetails(item)}
                        >
                          <p className="text-size">
                            Descripción: {item.description}
                          </p>
                          <p className="text-size">
                            Gane {item.weight * 750} XAF por el envío
                          </p>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </Col>
          <Col md="5" sm="11" xs="11">
            <div className="pt-2">
              <div>
                <Button
                  type="button"
                  color="link"
                  outline={true}
                  className="text-black"
                  onClick={handleViewMoreAcceptedRequests}
                >
                  Paquetes aceptados
                  {viewMoreAcceptedRequests ? (
                    <i className="bi bi-caret-up-fill"></i>
                  ) : (
                    <i className="bi bi-caret-down-fill"></i>
                  )}
                </Button>
              </div>
              {acceptedRequest ? (
                <div>
                  {acceptedRequest.map((item) => {
                    return (
                      <div key={item._id}>
                        <div className="rounded bg-light text-dark p-1"></div>
                        <Card
                          className="rounded text-dark p-2 shadow-lg bg-white border-0 card_pointer"
                          onClick={() => handleAccptedRequestDetails(item)}
                        >
                          <p className="text-size">
                            Descripción: {item.description}
                          </p>
                          <p className="text-size">Estado: {item.state}</p>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </Col>
          <Col md="5" sm="11" xs="11">
            <div className="pt-2">
              <div>
                <Button
                  type="button"
                  color="link"
                  outline={true}
                  className="text-black"
                  onClick={handleViewMoreSuggestions}
                >
                  Sugerencias
                  {viewMoreSuggestions ? (
                    <i className="bi bi-caret-up-fill"></i>
                  ) : (
                    <i className="bi bi-caret-down-fill"></i>
                  )}
                </Button>
              </div>
              {suggestions ? (
                <div>
                  {suggestions.map((item) => {
                    return (
                      <div key={item._id}>
                        <div className="rounded bg-light text-dark p-1"></div>
                        <Card
                          className="rounded text-dark p-2 shadow-lg bg-white border-0 card_pointer"
                          onClick={() => handleSuggestionsDetails(item)}
                        >
                          <p className="text-size">
                            Descripción: {item.description}
                          </p>
                          <p className="text-size">
                            Gane {item.weight * 750} XAF por el envío
                          </p>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </Col>
          <Col md="5" sm="11" xs="11">
            <div className="pt-2"></div>
          </Col>
        </Row>
      </div>
      <div>
        <Row>
          <Col>
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
                          <p className="text-size">
                            Gane {userSuggestions.weight * 750} XAF por el envío
                          </p>
                          <img
                            className="package-image"
                            alt="paquete"
                            src={`https://trivi4.com/api/trivia/packages/image/${userSuggestions.image}`}
                          />
                        </div>
                        <div className="pt-3">
                          <Row>
                            <Col>
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
        <Row>
          <Col>
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
                          <p className="text-size">
                            Gane {userRequest.weight * 750} por el envío
                          </p>
                          <img
                            className="package-image"
                            alt="paquete"
                            src={`https://trivi4.com/api/trivia/packages/image/${userRequest.image}`}
                          />
                        </div>
                        <div className="pt-3">
                          <Row>
                            <Col>
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
                            <Col>
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
        <Row>
          <Col>
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
                            alt="paquete"
                            src={`https://trivi4.com/api/trivia/packages/image/${userAcceptedRequest.image}`}
                          />
                          <p>
                            Su paquete ha sido aceptado, por favor, diríjase a
                            la oficina más cercana:
                            <ul>
                              <li>Malabo: Semu, rotonda Bilisa, Mercafacil</li>
                            </ul>
                          </p>
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
      <div
        className={`loading-screen ${
          loadingSuggestions ||
          loadingRequests ||
          loadingAcceptedRequest ||
          loading
            ? "visible"
            : "hidden"
        }`}
      >
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    </Container>
  );
};

export default Notification;
