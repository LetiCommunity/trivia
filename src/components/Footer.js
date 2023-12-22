import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Nav, NavItem, NavLink, Row } from "reactstrap";

const Footer = () => {
  let navigate = useNavigate();
  const handleTerms = () => {
    return navigate("/terms");
  };
  return (
    <Fragment>
      <div className="mt-5 px-5 py-5 text-center">
        <Row>
          <Col>
            <div>
              <Nav>
                <NavItem>
                  <p>
                    <NavLink href="#" className="text-white">
                      Sobre nosotros
                    </NavLink>
                  </p>
                </NavItem>
                <NavItem>
                  <p>
                    <NavLink href="contact" className="text-white">
                      Contáctanos
                    </NavLink>
                  </p>
                </NavItem>
              </Nav>
            </div>
            <div className="copyright">
              {/* <img
                className="logo2"
                alt="Trivia"
                src={require("../assets/img/logo1.png")}
              /> */}
              © {new Date().getFullYear()} Todos los derechos reservados.
            </div>
            <div>
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
              <Button
                type="button"
                onClick={handleTerms}
                color="link"
                outline={true}
                className="text-info"
              >
                Términos
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Footer;
