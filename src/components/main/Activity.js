import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Modal, Row } from "reactstrap";
import axios from "axios";
import moment from "moment";

const Activity = () => {
  const token = localStorage.getItem("token");
  let navigate = useNavigate();
  //const localStoragePackage = localStorage.getItem("package");
  //const localStorageRequest = localStorage.getItem("request");
  //const localStorageTravel = localStorage.getItem("travel");
  const [packages, setPackages] = useState([]);
  const [travels, setTravels] = useState([]);
  const [viewMorePackages, setViewMorePackages] = useState(true);
  const [viewMoreTravels, setViewMoreTravels] = useState(true);
  const [packageDetailsModal, setPackageDetailsModal] = useState(false);
  const [travelDetailsModal, setTravelDetailsModal] = useState(false);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [loadingTravels, setLoadingTravels] = useState(true);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headers = {
    token: `${token}`,
    "Content-Type": "application/json",
  };
  const [userPackage, setUserPackage] = useState({});
  const [userTravel, setUserTravel] = useState({});

  useEffect(() => {
    const getPackages = async () => {
      try {
        const { data } = await axios.get(
          "https://trivi4.com/api/trivia/packages/proprietor",
          { headers }
        );
        if (viewMorePackages) {
          setPackages(data);
          setLoadingPackages(false);
        } else {
          setPackages([]);
        }
      } catch (error) {
        console.error("Error", error.message);
      }
    };
    getPackages();
  }, [headers, viewMorePackages]);

  useEffect(() => {
    const getTravels = async () => {
      try {
        const { data } = await axios.get(
          "https://trivi4.com/api/trivia/travels/proprietor",
          { headers }
        );
        if (viewMoreTravels) {
          setTravels(data);
          setLoadingTravels(false);
        } else {
          setTravels([]);
        }
      } catch (error) {
        console.error("Error", error.message);
      }
    };
    getTravels();
  }, [headers, viewMoreTravels]);

  const handleViewMorePackages = () => {
    setViewMorePackages(!viewMorePackages);
  };

  const handleViewMoreTravels = () => {
    setViewMoreTravels(!viewMoreTravels);
  };

  const togglePackageDetails = () => {
    setPackageDetailsModal(!packageDetailsModal);
  };

  const toggleTravelDetails = () => {
    setTravelDetailsModal(!travelDetailsModal);
  };

  const handlePackageDetails = (item) => {
    setUserPackage(item);
    togglePackageDetails();
  };

  const handleTravelDetails = (item) => {
    setUserTravel(item);
    toggleTravelDetails();
  };

  const handleEditPackage = (id) => {
    return navigate(`/activity/edit-package/${id}`);
  };

  const handleEditTravel = (id) => {
    return navigate(`/activity/edit-trip/${id}`);
  };

  const handleCancelPackage = async (id) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://trivi4.com/api/trivia/packages/cancelation/${id}`,
        {
          headers,
        }
      );
      setLoading(false);
      togglePackageDetails();
    } catch (error) {
      setLoading(false);
      console.error("Error", error.message);
    }
  };

  const handleCancelTravel = async (id) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://trivi4.com/api/trivia/travels/cancelation/${id}`,
        {
          headers,
        }
      );
      setLoading(false);
      toggleTravelDetails();
    } catch (error) {
      setLoading(false);
      console.error("Error", error.message);
    }
  };

  return (
    <Container>
      <div>
        <Row className="justify-content-center">
          <Col md="5" sm="10" xs="10">
            <div className="pt-2">
              <div>
                <Button
                  type="button"
                  color="link"
                  outline={true}
                  className="text-black"
                  onClick={handleViewMoreTravels}
                >
                  Viajes publicados{" "}
                  {viewMoreTravels ? (
                    <i className="bi bi-caret-up-fill"></i>
                  ) : (
                    <i className="bi bi-caret-down-fill"></i>
                  )}
                </Button>
              </div>
              {travels && (
                <div>
                  {travels.map((item) => {
                    return (
                      <div key={item._id}>
                        <div className="rounded bg-light text-dark p-1"></div>
                        <Card
                          className="rounded text-dark p-2 shadow-lg bg-white border-0 card_pointer"
                          onClick={() => handleTravelDetails(item)}
                        >
                          <p className="text-size">
                            {item.origin} a {item.destination}
                          </p>
                          <p className="text-size">
                            {moment(item.date).format("DD/MM/YYYY")}
                          </p>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </Col>
          <Col md="5" sm="10" xs="10">
            <div className="pt-2">
              <div>
                <Button
                  type="button"
                  color="link"
                  outline={true}
                  className="text-black"
                  onClick={handleViewMorePackages}
                >
                  Paquetes publicados{" "}
                  {viewMorePackages ? (
                    <i className="bi bi-caret-up-fill"></i>
                  ) : (
                    <i className="bi bi-caret-down-fill"></i>
                  )}
                </Button>
              </div>
              {packages && (
                <div>
                  {packages.map((item) => {
                    return (
                      <div key={item._id}>
                        <div className="rounded bg-light text-dark p-1"></div>
                        <Card
                          className="rounded text-dark p-2 shadow-lg bg-white border-0 card_pointer"
                          onClick={() => handlePackageDetails(item)}
                        >
                          <p className="text-size">Para: {item.receiverName}</p>
                          <p className="text-size">Estado: {item.state}</p>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Row>
          <Col>
            <Modal
              isOpen={travelDetailsModal}
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
                    {userTravel && (
                      <div>
                        <div>
                          <h5>Información del viaje</h5>
                          <p>Origen: {userTravel.origin}</p>
                          <p>Destino: {userTravel.destination}</p>
                          <p>
                            Fecha:{" "}
                            {moment(userTravel.date).format("DD/MM/YYYY")}
                          </p>
                          <p>Aeropuerto: {userTravel.airport}</p>
                          <p>Terminal: {userTravel.terminal}</p>
                          <p>Compañía: {userTravel.company}</p>
                          <p>Hora de facturación: {userTravel.billingTime}</p>
                        </div>
                        <div>
                          <h5>Información de disponibilidad</h5>
                          <p>
                            Disponibilidad: {userTravel.availableWeight} kilos
                          </p>
                        </div>
                        <div>
                          <Row>
                            <Col>
                              <div>
                                <Button
                                  id="tooltip5456906"
                                  title="Editar Detalles del viaje"
                                  type="button"
                                  color="info"
                                  className="text-white"
                                  onClick={() =>
                                    handleEditTravel(userTravel._id)
                                  }
                                >
                                  <i className="bi bi-pencil-square"></i> Editar
                                </Button>
                              </div>
                            </Col>
                            <Col>
                              <div className="right">
                                <Button
                                  title="Cancelar envío"
                                  type="button"
                                  onClick={() =>
                                    handleCancelTravel(userTravel._id)
                                  }
                                  className="btn btn-danger text-white"
                                >
                                  <i className="bi bi-trash"></i> Cancelar
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
              isOpen={packageDetailsModal}
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
                    {userPackage && (
                      <div>
                        <div>
                          <h5>Información del receptor</h5>
                          <p>Nombre: {userPackage.receiverName}</p>
                          <p>Apellidos: {userPackage.receiverSurname}</p>
                          <p>Ciudad: {userPackage.receiverCity}</p>
                          <p>Calle / Barrio: {userPackage.receiverStreet}</p>
                          <p>Teléfono: {userPackage.receiverPhone}</p>
                        </div>
                        <div>
                          <h5>Información del paquete</h5>
                          <p>Peso aproximado: {userPackage.weight}</p>
                          <p>Estado: {userPackage.state}</p>
                          <p>
                            Fecha de publicación:{" "}
                            {moment(userPackage.createdAt).format("DD/MM/YYYY")}
                          </p>
                          <p>Descripción: {userPackage.description}</p>
                        </div>
                        <div className="">
                          <img
                            className="package-image input_icon"
                            alt={userPackage.image}
                            src={`https://trivi4.com/api/trivia/packages/image/${userPackage.image}`}
                          />
                        </div>
                        {(userPackage.state === "Publicado" ||
                          userPackage.state === "Proceso") && (
                          <div>
                            <Row>
                              <Col>
                                <div>
                                  <Button
                                    id="tooltip545670"
                                    title="Editar Detalles del paquete"
                                    type="button"
                                    className="btn btn-info text-white"
                                    onClick={() =>
                                      handleEditPackage(userPackage._id)
                                    }
                                  >
                                    <i className="bi bi-pencil-square"></i>{" "}
                                    Editar
                                  </Button>
                                </div>
                              </Col>
                              <Col>
                                <div className="right">
                                  <Button
                                    title="Cancelar envío"
                                    type="button"
                                    onClick={() =>
                                      handleCancelPackage(userPackage._id)
                                    }
                                    className="btn btn-danger text-white"
                                  >
                                    <i className="bi bi-trash"></i> Cancelar
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        )}
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
          loadingPackages || loadingTravels || loading ? "visible" : "hidden"
        }`}
      >
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    </Container>
  );
};

export default Activity;
