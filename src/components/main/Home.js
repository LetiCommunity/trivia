import React, { Fragment, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");
  let navigate = useNavigate();
  const [searchTrip, setSearchTrip] = useState({
    origin: "Malabo",
    destination: "Bata",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchTrip((prevSearchTrip) => ({
      ...prevSearchTrip,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      origin: searchTrip.origin,
      destination: searchTrip.destination,
    };

    if (!data.origin || !data.destination) {
      return;
    }

    if (data.origin.trim() === "" || data.destination.trim() === "") {
      return;
    }

    return navigate(
      `/search-trip?origin=${data.origin}&destination=${data.destination}`
    );
  };

  const handlePublishTrip = () => {
    if (token) {
      localStorage.setItem("package", "true");
      return navigate("/publish-trip");
    } else {
      return navigate("/login");
    }
  };

  const handleSendPackage = () => {
    if (token) {
      localStorage.setItem("travel", "true");
      return navigate("/send-package");
    } else {
      return navigate("/login");
    }
  };

  const handleSearchTrip = (origin, destination) => {
    if (!origin || !destination) {
      return navigate(`/search-trip`);
    }
    return navigate(`/search-trip?origin=${origin}&destination=${destination}`);
  };

  return (
    <Fragment>
      <div className="content">
        <div className="position-relative">
          <Row>
            <Col md="12" sm="12">
              <div>
                <h2 className="title">Envía fácil y rápido tu paquete</h2>
                <img
                  className="img-fluid w-100 background"
                  alt="Trivia"
                  src={require("../../assets/img/bg1.jpg")}
                />
                <div className="search_trip">
                  <Card className="px-2">
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="5">
                          <div className="pt-2">
                            <FormGroup floating>
                              <Input
                                type="select"
                                id="origin"
                                name="origin"
                                value={searchTrip.origin}
                                onChange={handleChange}
                                placeholder="¿Desde qué ciudad hace el envío?"
                                className="form-control-lg border-0 border-bottom"
                              >
                                <option value="Malabo">Malabo</option>
                                <option value="Bata">Bata</option>
                                <option value="Madrid">Madrid</option>
                              </Input>
                              <Label for="origin">
                                ¿Desde qué ciudad hace el envío?
                              </Label>
                            </FormGroup>
                          </div>
                        </Col>
                        <Col md="5">
                          <div className="pt-2">
                            <FormGroup floating>
                              <Input
                                type="select"
                                id="destination"
                                name="destination"
                                value={searchTrip.destination}
                                onChange={handleChange}
                                placeholder="¿Cuál es la ciudad de destino?"
                                className="form-control-lg border-0 border-bottom"
                              >
                                <option value="Malabo">Malabo</option>
                                <option value="Bata">Bata</option>
                                <option value="Madrid">Madrid</option>
                              </Input>
                              <Label for="destination">
                                ¿Cuál es la ciudad de destino?
                              </Label>
                            </FormGroup>
                          </div>
                        </Col>
                        <Col md="2">
                          <div className="d-grid gap-2 py-3">
                            <Button
                              type="submit"
                              className="btn btn-info text-white form-control-lg"
                            >
                              Buscar
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="position-relative my-5">
          <div className="center-element margin-services">
            <div className="">
              <Row>
                <Col md="4">
                  <div className="">
                    <div className="">
                      <i className="bi bi-box icon-size"></i>
                    </div>
                    <div>
                      <h5>Envíos al mejor precio</h5>
                      <p>
                        Gracias a nuestra red de viajeros, ofrecemos los mejores
                        precios del mercado.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md="4">
                  <div className="">
                    <div className="">
                      <i className="bi bi-lock icon-size"></i>
                    </div>
                    <div>
                      <h5>Envíos seguros</h5>
                      <p>
                        Trivia se encarga de que su paquete llegue al destino
                        con toda la garantía de seguridad.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md="4">
                  <div>
                    <div>
                      <i className="bi bi-calendar icon-size"></i>
                    </div>
                    <div>
                      <h5>Variedad de fechas disponibles</h5>
                      <p>
                        Gracias a nuestra extensa red de viajeros, ofrecemos una
                        variedad de fechas para que usted pueda enviar su
                        paquete cuando quiera.
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="my-5">
              <Row className="align-items-center my-5 py-2">
                <Col md="6">
                  <div className="text-center">
                    <div className="">
                      <img
                        className="img-fluid shadow-lg bg-light"
                        alt="Trivia"
                        src={require("../../assets/img/win.jpg")}
                      />
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="main">
                    <h3>Gana dinero viajando</h3>
                    <p className="">
                      Gane dinero adicional compartiendo el espacio de su
                      equipaje. Compense los gastos del viaje con ese dinero
                      adicional.
                    </p>
                    <div className="text-center">
                      <Button
                        type="button"
                        onClick={handlePublishTrip}
                        className="btn btn-info text-white"
                      >
                        Publica tu viaje
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="align-items-center my-5 py-2">
                <Col xs="12" sm="12" md="6" className="order-2 order-md-1">
                  <div className="main">
                    <h3>Envío fácil, rápido y seguro</h3>
                    <p>
                      Nuestra red de viajeros se encargan de hacer llegar su
                      paquete a su destino de forma segura, en el menor tiempo
                      posible y a un buen precio.
                    </p>
                    <div className="text-center">
                      <Button
                        type="button"
                        onClick={handleSendPackage}
                        className="btn btn-info text-white"
                      >
                        Realiza tu envío
                      </Button>
                    </div>
                  </div>
                </Col>
                <Col xs="12" sm="12" md="6" className="order-1 order-md-2">
                  <div>
                    <div>
                      <img
                        className="img-fluid shadow-lg bg-light right"
                        alt="Trivia"
                        src={require("../../assets/img/send3.jpg")}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className="bg-white my-5 py-3 px-5">
            <div className="my-3">
              <Row>
                <Col md="12">
                  <h3 className="text-white">
                    Lugares donde puedes realizar tus envíos
                  </h3>
                </Col>
              </Row>
            </div>
            {/* <div className="">
              <Row>
                <Col md="4">
                  <Link
                    to={{ pathname: handleSearchTrip("malabo", "bata")}}
                    className="text-white text_decoration_a left"
                  >
                    <Card className="mb-2 bg-light">
                      <p className="p-3 text-size">Malabo a Bata</p>
                    </Card>
                  </Link>
                </Col>
                <Col md="4">
                  <Link
                    to={{
                      pathname: handleSearchTrip("malabo", "madrid"),
                    }}
                    className="text-white text_decoration_a left"
                  >
                    <Card className="mb-2 bg-light">
                      <p className="p-3 text-size">Malabo a Madrid</p>
                    </Card>
                  </Link>
                </Col>
                <Col md="4">
                  <Link
                    to={{
                      pathname: handleSearchTrip("malabo", "mongomeyen"),
                    }}
                    className="text-white text_decoration_a left"
                  >
                    <Card className="mb-2 bg-light">
                      <p className="p-3 text-size">Malabo a Mongomeyen</p>
                    </Card>
                  </Link>
                </Col>
              </Row>
            </div> */}
            <div className="">
              <Row>
                <Col md="4">
                  <Card
                    onClick={() => handleSearchTrip("malabo", "bata")}
                    className="mb-2 bg-light card_pointer"
                  >
                    <p className="p-3 text-size">Malabo a Bata</p>
                  </Card>
                </Col>
                <Col md="4">
                  <Card
                    onClick={() => handleSearchTrip("malabo", "madrid")}
                    className="mb-2 bg-light card_pointer"
                  >
                    <p className="p-3 text-size">Malabo a Madrid</p>
                  </Card>
                </Col>
                <Col md="4">
                  <Card
                    onClick={() => handleSearchTrip("malabo", "mongomeyen")}
                    className="mb-2 bg-light card_pointer"
                  >
                    <p className="p-3 text-size">Malabo a Mongomeyen</p>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer bg-dark text-white">
        <Footer />
      </footer>
    </Fragment>
  );
};

export default Home;
