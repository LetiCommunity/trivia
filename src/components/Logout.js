import React, { Fragment } from "react";
import axios from "axios";
import { Button, Card, CardBody, Col, Row } from "reactstrap";

const Logout = () => {
  const token = localStorage.getItem("token");
  const headers = {
    token: `${token}`,
    "Content-Type": "application/json",
  };

  const handleClose = () => {
    window.history.back();
  };

  const handleLogout = async () => {
    try {
      axios.post("https://trivi4.com/api/trivia/auth/signout", {
        headers,
      });
    } catch (error) {
      console.error("Error", error);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return (window.location.href = "/home");
  };

  return (
    <Fragment>
      <div className="content">
        <Row className="justify-content-center align-items-center">
          <Col md="5" sm="10" xs="10" className="my-5 py-5">
            <Card className="border-0 shadow-lg bg-white">
              <CardBody>
                <p className="text-center">¿Quiere cerrar la sesión?</p>
                <Row>
                  <Col md="6" sm="6" xs="6">
                    <div>
                      <Button
                        type="button"
                        onClick={handleLogout}
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
                        onClick={handleClose}
                        className="btn btn-danger text-white"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Logout;
