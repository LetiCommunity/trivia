import React, { useState } from "react";
import axios from "axios";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { signOut } from "firebase/auth";

import auth from "../config/firebase";

const DeleteAccount = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const headers = {
    token: `${token}`,
    "Content-Type": "application/json",
  };

  const handleClose = () => {
    window.history.back();
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await axios.delete("http://localhost:5000/api/trivia/profiles/profile", {
        headers,
      });
      signOut(auth)
        .then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("travel");
          localStorage.removeItem("package");
          localStorage.removeItem("request");
          return (window.location.href = "/home");
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error", error.message);
        });
    } catch (error) {
      setLoading(false);
      console.error("Error", error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center">
        <Col xs="11" sm="11" md="5" className="my-5 py-5">
          <Card className="border-0 shadow-lg bg-white">
            <CardBody>
              <p className="text-center">
                ¿Seguro que quiere eliminar su cuenta?
              </p>
              <Row>
                <Col>
                  <div>
                    <Button
                      type="button"
                      onClick={handleDeleteAccount}
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
          <div className={`loading-screen ${loading ? "visible" : "hidden"}`}>
            <div className="spinner"></div>
            <p>Cargando...</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DeleteAccount;
