import React, { useState } from "react";
import { Button, Col, Form, FormGroup, Input, Modal, Row } from "reactstrap";

const EditProfile = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = () => {};

  const handleSubmit = () => {};

  return (
    <div className="content">
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col md="6">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="hidden"
                id="id"
                name="id"
                value={user.id}
                onChange={handleChange}
                className="form-control"
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="name">Nombre</label>
              <Input
                placeholder="Nombre"
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="form-control bg-light"
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="surname">Apellidos</label>
              <Input
                placeholder="Apellidos"
                type="text"
                id="surname"
                name="surname"
                value={user.surname}
                onChange={handleChange}
                className="form-control bg-light"
              />
            </FormGroup>
            <Col md="12">
              <FormGroup className="text-center">
                <Button type="submit" className="btn btn-info text-white">
                  Guardar
                </Button>
              </FormGroup>
            </Col>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default EditProfile;
