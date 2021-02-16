import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";

const UserManager = () => {
  const { getToken, getCurrentUser } = useContext(UserProfileContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    const activeUser = getCurrentUser();
    setUser(activeUser);
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-8 col-md-6 col-lg-8">
          <div className="my-4">
            <Card>
              <CardBody>
                <CardTitle>
                  User: {user.firstName + " " + user.lastName}
                </CardTitle>
                <CardText>
                  <Form>
                    <FormGroup>
                      <Label for="exampleEmail">
                        <Input
                          disabled={true}
                          type="email"
                          name="email"
                          id="exampleEmail"
                          value={user.email}
                        />
                      </Label>
                      <Label for="exampleCashflow">
                        <Input
                          disabled={true}
                          type="number"
                          name="cashflow"
                          id="exampleCashflow"
                          value={user.cashflow}
                        />
                      </Label>
                    </FormGroup>
                    <Button onClick={(e) => console.log(user)}>User</Button>
                  </Form>
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
