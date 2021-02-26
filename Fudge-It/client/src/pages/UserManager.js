import React, { useState, useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";

const UserManager = ({ activeUser }) => {
  const { updateUserDB, updateEmailANDUserDB, logout } = useContext(
    UserProfileContext
  );

  const [confirmingEdit, setConfirmingEdit] = useState(false);
  const [editing, setEditing] = useState(true);
  const [firstName, setFirstName] = useState(activeUser.firstName);
  const [lastName, setLastName] = useState(activeUser.lastName);
  const [email, setEmail] = useState(activeUser.email);
  const [cashflow, setCashflow] = useState(activeUser.cashflow);

  const toggleEditState = () => {
    setEditing(!editing);
  };

  const cancelEdit = () => {
    setFirstName(activeUser.firstName);
    setLastName(activeUser.lastName);
    setEmail(activeUser.email);
    setCashflow(activeUser.cashflow);
    toggleEditState();
  };

  const constructAndSaveEditedUser = () => {
    const editedUser = {
      cashflow: cashflow,
      email: email,
      firstName: firstName,
      lastName: lastName,
      id: activeUser.id,
    };

    if (email === activeUser.email) {
      updateUserDB(editedUser);
    } else {
      updateEmailANDUserDB(editedUser);
    }
  };

  const labelStyle = { fontSize: "medium", textAlign: "left" };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-8 col-md-6 col-lg-8">
          <div className="my-4">
            <Card className="text-center">
              <CardBody>
                <CardText>
                  <Form>
                    <Row className="justify-content-center" form>
                      <Col>
                        <FormGroup>
                          <Label
                            style={labelStyle}
                            className="mx-2"
                            for="exampleFirstName"
                          >
                            First Name
                            <Input
                              disabled={editing}
                              type="text"
                              name="firstName"
                              id="exampleFirstName"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label
                            style={labelStyle}
                            className="mx-2"
                            for="exampleCashflow"
                          >
                            Last Name
                            <Input
                              disabled={editing}
                              type="text"
                              name="lastName"
                              id="exampleLastName"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      <Col>
                        <FormGroup>
                          <Label
                            style={labelStyle}
                            className="mx-2"
                            for="exampleEmail"
                          >
                            Email
                            <Input
                              disabled={editing}
                              type="email"
                              name="email"
                              id="exampleEmail"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label
                            style={labelStyle}
                            className="mx-2"
                            for="exampleCashflow"
                          >
                            Monthly Cashflow
                            <Input
                              disabled={editing}
                              type="number"
                              name="cashflow"
                              id="exampleCashflow"
                              value={cashflow}
                              onChange={(e) =>
                                setCashflow(parseFloat(e.target.value))
                              }
                            />
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                  {editing ? (
                    <Button
                      color="primary"
                      onClick={(e) => {
                        toggleEditState();
                      }}
                    >
                      Edit Info
                    </Button>
                  ) : (
                    <div>
                      <Button
                        color="success"
                        className="mx-1"
                        onClick={(e) => {
                          setConfirmingEdit(!confirmingEdit);
                        }}
                      >
                        Save Edit
                      </Button>
                      <Button
                        color="danger"
                        className="mx-1"
                        onClick={(e) => {
                          cancelEdit();
                        }}
                      >
                        Cancel Edit
                      </Button>
                    </div>
                  )}
                </CardText>
              </CardBody>
            </Card>
            <Modal isOpen={confirmingEdit}>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <Card>
                  <CardBody>
                    <p>
                      Your New Info: {firstName} {lastName} - Cashflow:{" "}
                      {cashflow} - Email: {email}
                    </p>
                    <p>
                      Saving will cause you to be logged out. You will need to
                      use your new Email if applicable.
                    </p>
                  </CardBody>
                </Card>
              </ModalBody>
              <Button
                color="success"
                className="mx-1 my-1"
                onClick={(e) => {
                  constructAndSaveEditedUser();
                  setConfirmingEdit(!confirmingEdit);
                  logout();
                }}
              >
                Save Edit
              </Button>
              <Button
                color="danger"
                className="mx-1 my-1"
                onClick={(e) => {
                  cancelEdit();
                  setConfirmingEdit(!confirmingEdit);
                }}
              >
                Cancel Edit
              </Button>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManager;
