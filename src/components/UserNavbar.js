import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Container, Navbar } from "reactstrap";
const UserNavbar = () => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  return (
    <Fragment>
      <Navbar className="navbar-absolute">
        <Container fluid>
          <div className="navbar-wrapper">
            <div>
              <p>Tivia</p>
            </div>
          </div>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default UserNavbar;
