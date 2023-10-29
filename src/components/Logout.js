import React from "react";
import { Row, Col, Modal } from "reactstrap";

const Logout = ({ modalOpen, toggleModal }) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const logout = async (event) => {
    try {
      const response = await fetch("http://localhost:8989/trivia-api/v1/logout", {
        method: "GET",
        headers,
      });

      const jsonData = await response.json();
      console.log(jsonData)

      if (response.ok) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error", error);
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <div style={{ zIndex: 2000 }}>
      <Row className="">
        <Col md="12">
          <Modal isOpen={modalOpen} toggle={toggleModal} backdrop={false}>
            <div className="modal-header">
              <h4 className="modal-title">
                ¿Está seguro que quiere cerrar la sesión?
              </h4>
            </div>
            <div className="modal-body">
              <Row>
                <Col md="6">
                  <div>
                    <button
                      type="button"
                      className="btn btn-fill"
                      onClick={logout}
                    >
                      Confirmar
                    </button>
                  </div>
                </Col>
                <Col md="6">
                  <div className="text-right">
                    <button
                      type="button"
                      className="btn btn-danger"
                      color="Red"
                      onClick={toggleModal}
                    >
                      Cancelar
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default Logout;
