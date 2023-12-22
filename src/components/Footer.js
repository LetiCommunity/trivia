import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

const Footer = () => {
  return (
    <Fragment>
      <div className="mt-5 px-5 py-2">
        <Row>
          <Col>
            <div>
              <p className="">
                <Link
                  to={{ pathname: "/p" }}
                  className="text-white text_decoration_a left"
                >
                  Sobre nosotros
                </Link>{" "}
                <Link
                  to={{ pathname: "/p" }}
                  className="text-white text_decoration_a left"
                >
                  Contáctanos
                </Link>
              </p>
            </div>
            <div className="copyright text-center">
              {/* <img
                className="logo2"
                alt="Trivia"
                src={require("../assets/img/logo1.png")}
              /> */}
              © {new Date().getFullYear()} Todos los derechos reservados.
            </div>
            <div className="text-center">
              <a href="#p">
                <i className="bi bi-instagram text-white"></i>
              </a>{" "}
              <a href="#p">
                <i className="bi bi-facebook text-white"></i>
              </a>{" "}
              <a href="#p">
                <i className="bi bi-whatsapp text-white"></i>
              </a>
            </div>
            <div>
              <p className="right">
                <Link
                  to={{ pathname: "/terms" }}
                  className="text-white text_decoration_a"
                >
                  Términos
                </Link>{" "}
                y{" "}
                <Link
                  to={{ pathname: "/terms" }}
                  className="text-white text_decoration_a"
                >
                  Política de privacidad
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Footer;
