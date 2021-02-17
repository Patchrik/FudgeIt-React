import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";

const UserManager = () => {
  const { getToken, getCurrentUser } = useContext(UserProfileContext);
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(true);

  useEffect(() => {
    const activeUser = getCurrentUser();
    setUser(activeUser);
  }, []);

  const toggleEditState = () => {
    setEditing(!editing);
  };

  const labelStyle = { "font-size": "medium", "text-align": "left" };
  console.log(user);
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
                              value={user.firstName}
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
                              value={user.lastName}
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
                              value={user.email}
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
                              value={user.cashflow}
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
                          toggleEditState();
                        }}
                      >
                        Save Edit
                      </Button>
                      <Button
                        color="danger"
                        className="mx-1"
                        onClick={(e) => {
                          toggleEditState();
                        }}
                      >
                        Cancel Edit
                      </Button>
                    </div>
                  )}
                </CardText>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManager;
