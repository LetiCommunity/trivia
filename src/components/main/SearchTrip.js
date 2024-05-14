import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import axios from "axios";
import moment from "moment";

//import inicialImage from "../../assets/img/user-bar.png";

const SearchTrip = () => {
  const token = localStorage.getItem("token");
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [page, setPage] = useState(1);
  //const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let navigate = useNavigate();
  let location = useLocation();
  const [searchTrip, setSearchTrip] = useState({
    origin: "Malabo",
    destination: "Bata",
  });

  let queryParams = new URLSearchParams(location.search);
  let origin = queryParams.get("origin");
  let destination = queryParams.get("destination");
  origin = origin.charAt(0).toUpperCase() + origin.slice(1);
  destination = destination.charAt(0).toUpperCase() + destination.slice(1);

  const getTravels = async () => {
    try {
      const { data } = await axios.get(
        `https://api.trivi4.com/api/trivia/travels/filterByCity/${origin}/${destination}`
      );
      setTravels(data);
      setLoadingPage(false);
    } catch (error) {
      console.error(error.message);
      setLoadingPage(false);
    }
  };
  getTravels();

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

    if (data.origin === data.destination) {
      return;
    }

    return navigate(
      `/search-trip?origin=${data.origin}&destination=${data.destination}`
    );
  };

  const handleSelectedTrip = (traveler) => {
    localStorage.setItem("request", traveler);
    if (token) {
      return navigate(`/send-package`);
    } else {
      return navigate(`/login`);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;

    if (scrollHeight - scrollTop === clientHeight && !loading) {
      setLoading(true);
      getTravels(page).then((newTravels) => {
        setTravels((prevTravels) => [...prevTravels, ...newTravels]);
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
      });
    }
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <Container className="search_trip_container">
      <div className="position-relative">
        <Row xs="1" sm="1" md="1" className="justify-content-center">
          <Col>
            <div className="search_trip">
              <Form onSubmit={handleSubmit}>
                <div className="search_trip2">
                  <Row xs="2" sm="2" md="3">
                    <Col xs="6" sm="6" md="5">
                      <div className="">
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
                          <Label for="origin">Origen del envío</Label>
                        </FormGroup>
                      </div>
                    </Col>
                    <Col xs="6" sm="6" md="5">
                      <div className="">
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
                            {/* <option value="Madrid">Madrid</option> */}
                          </Input>
                          <Label for="destination">Destino del envío</Label>
                        </FormGroup>
                      </div>
                    </Col>
                    <Col xs="12" sm="12" md="2">
                      <div className="d-grid gap-2 pt-2">
                        <Button
                          type="submit"
                          className="btn btn-info text-white form-control-lg"
                        >
                          Buscar
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
      <div className="search_trip_found_content" onScroll={handleScroll}>
        <Row xs="1" sm="1" md="2" className="justify-content-center">
          <Col>
            <div className="search_trip_found">
              {travels.map((travel) => {
                return (
                  <>
                    <div key={travel._id}>
                      <Card
                        onClick={() => handleSelectedTrip(travel.traveler._id)}
                        className="rounded text-dark p-2 shadow-lg bg-white border-0 card_pointer"
                      >
                        {/* <div className="input_wrapper">
                          <img
                            alt="Imagen cargada"
                            className="rounded-circle input_icon mt-3"
                            src={
                              travel.image
                                ? `https://api.trivi4.com/api/trivia/profiles/image/${travel.image}`
                                : inicialImage
                            }
                          />
                        </div> */}
                        <p className="text-size">
                          {travel.origin} a {travel.destination}
                        </p>
                        <p className="text-size">
                          {moment(travel.date).format("DD/MM/YYYY")}
                        </p>
                      </Card>
                    </div>
                  </>
                );
              })}
            </div>
          </Col>
        </Row>
      </div>
      <div className={`loading-screen ${loadingPage ? "visible" : "hidden"}`}>
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    </Container>
  );
};

export default SearchTrip;
