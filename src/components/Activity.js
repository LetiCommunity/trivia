import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Modal, Row } from "reactstrap";
import axios from "axios";
import moment from "moment";

const Activity = () => {
  const token = localStorage.getItem("token");
  let navigate = useNavigate();
  //const localStoragePackage = localStorage.getItem("package");
  //const localStorageRequest = localStorage.getItem("request");
  //const localStorageTravel = localStorage.getItem("travel");
  const [packages, setPackages] = useState();
  const [travels, setTravels] = useState();
  const [viewMorePackages, setViewMorePackages] = useState(false);
  const [viewMoreTravels, setViewMoreTravels] = useState(false);
  const [packageDetailsModal, setPackageDetailsModal] = useState(false);
  const [travelDetailsModal, setTravelDetailsModal] = useState(false);
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
        } else {
          setPackages(data.slice(0, 3));
        }
      } catch (err) {
        console.error(err);
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
        } else {
          setTravels(data.slice(0, 3));
        }
      } catch (err) {
        console.error(err);
      }
    };
    getTravels();
  }, [headers, viewMoreTravels]);

  // const handleLocalStorageData = async () => {
  //   if (localStoragePackage) {
  //     try {
  //       if (localStorageRequest) {
  //         await axios.post(
  //           `https://trivi4.com/api/trivia/packages/${localStorageRequest}`,
  //           JSON.parse(localStoragePackage),
  //           { headers }
  //         );
  //       } else {
  //         await axios.post(
  //           "https://trivi4.com/api/trivia/packages",
  //           JSON.parse(localStoragePackage),
  //           { headers }
  //         );
  //       }
  //       localStorage.removeItem("package");
  //     } catch (error) {
  //       console.error("Error", error);
  //       return;
  //     }
  //   }

  //   if (localStorageTravel) {
  //     try {
  //       await axios.post(
  //         "https://trivi4.com/api/trivia/travels",
  //         JSON.parse(localStorageTravel),
  //         { headers }
  //       );
  //       localStorage.removeItem("travel");
  //     } catch (error) {
  //       console.error("Error", error);
  //       return;
  //     }
  //   }
  // };

  // handleLocalStorageData();

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
    try {
      await axios.delete(
        `https://trivi4.com/api/trivia/packages/cancelation/${id}`,
        {
          headers,
        }
      );
      togglePackageDetails();
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  const handleCancelTravel = async (id) => {
    try {
      await axios.delete(
        `https://trivi4.com/api/trivia/travels/cancelation/${id}`,
        {
          headers,
        }
      );
      toggleTravelDetails();
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  return (
    <Fragment>
      <div className="content">
        <div className="px-5">
          <Row className="justify-content-center">
            {travels ? (
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
                            {moment(item.date).format("DD/MM/YYYY")}
                          </p>
                          <Button
                            id="tooltip5456778"
                            title="Detalles del viaje"
                            type="button"
                            color="link"
                            outline={true}
                            className="text-info"
                            onClick={() => handleTravelDetails(item)}
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
                      onClick={handleViewMoreTravels}
                    >
                      {viewMoreTravels ? "Ver menos" : "Ver más"}
                    </Button>
                  </div>
                </div>
              </Col>
            ) : null}
            {packages ? (
              <Col md="6" sm="10" xs="10">
                <div className="my-5 py-5">
                  <h3>Paquetes publicados</h3>
                  {packages.map((item) => {
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
                          <p className="text-size">Para: {item.receiverName}</p>
                          <p className="text-size">Estado: {item.state}</p>
                          <p className="text-size">
                            Fecha:{" "}
                            {moment(item.createdAt).format(
                              "DD/MM/YYYY HH:mm:ss"
                            )}
                          </p>
                          <Button
                            id="tooltip5456779"
                            title="Detalles del paquete"
                            type="button"
                            color="link"
                            outline={true}
                            className="text-info"
                            onClick={() => handlePackageDetails(item)}
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
                      onClick={handleViewMorePackages}
                    >
                      {viewMorePackages ? "Ver menos" : "Ver más"}
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
                              <Col md="6" sm="6" xs="6">
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
                                    <i className="bi bi-pencil-square"></i>{" "}
                                    Editar
                                  </Button>
                                </div>
                              </Col>
                              <Col md="6" sm="6" xs="6">
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
          <Row
            className="justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Col md="5" sm="10" xs="10" className="my-5 py-5">
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
                              {moment(userTravel.createdAt).format(
                                "DD/MM/YYYY"
                              )}
                            </p>
                            <p>Descripción: {userPackage.description}</p>
                          </div>
                          <div>
                            <Row>
                              <Col md="6" sm="6" xs="6">
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
                              <Col md="6" sm="6" xs="6">
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

export default Activity;
