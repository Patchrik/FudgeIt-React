import React, { useEffect, useState, useContext } from "react";
import {
  ListGroup,
  ListGroupItem,
  Input,
  InputGroup,
  Button,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ExpenseContext } from "../providers/ExpenseProvider";
import { toast } from "react-toastify";
import ExpenseListItem from "../components/ExpenseListItem";
const ExpenseManager = () => {
  const { expenses, getUsersExpenses } = useContext(ExpenseContext);
  const { getToken } = useContext(UserProfileContext);

  useEffect(() => {
    getUsersExpenses();
  }, []);

  const [addingEx, setAddingEx] = useState(false);
  const [formName, setFormName] = useState("");
  const [formDate, setFormDate] = useState(Date);
  const [formCost, setFormCost] = useState(0.0);
  const [formNeed, setFormNeed] = useState(false);
  const [formRecurring, setFormRecurring] = useState(false);

  const addingExToggle = () => {
    setAddingEx(!addingEx);
    setFormName("");
    setFormDate(Date);
    setFormCost(0.0);
    setFormNeed(false);
    setFormRecurring(false);
  };

  const formNeedToggle = () => setFormNeed(!formNeed);

  const formRecurringToggle = () => setFormRecurring(!formRecurring);

  const saveNewExpense = () => {
    const expenseToAdd = {
      name: formName,
      expenseDate: formDate,
      cost: formCost,
      need: formNeed,
      recurring: formRecurring,
    };
    getToken().then((token) => {
      fetch(`api/expense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expenseToAdd),
      }).then(() => {
        setFormName("");
        setFormDate(Date);
        setFormCost(0.0);
        setFormNeed(false);
        setFormRecurring(false);
        getUsersExpenses();
      });
    });
  };

  return (
    <div className="container mt-5">
      <h2> Manage Expenses </h2>
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-8 col-md-6 col-lg-8">
          <div className="my-4">
            <Button
              className="my-2"
              color="success"
              size="lg"
              block
              onClick={addingExToggle}
            >
              Add New Expense
            </Button>
          </div>
          <ListGroup>
            {expenses.map((expense) => {
              return (
                <ListGroupItem key={expense.id}>
                  <ExpenseListItem expense={expense} />
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </div>
      </div>
      <Modal
        isOpen={addingEx}
        toggle={addingExToggle}
        className="DashBoard-Add-Ex-Modal"
      >
        <ModalHeader toggle={addingExToggle}>Add A New Expense</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="expenseName">Expense Name</Label>
              <Input
                required
                name="exName"
                id="expenseName"
                placeholder="Expense Name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="expenseDate">Expense Date</Label>
              <Input
                required
                type="date"
                name="exDate"
                id="expenseDate"
                placeholder="Expense Date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="expenseCost">Expense Cost</Label>
              <Input
                required
                type="number"
                name="exCost"
                id="expenseCost"
                placeholder="Expense Cost"
                value={formCost}
                onChange={(e) => setFormCost(parseFloat(e.target.value))}
              />
            </FormGroup>
            <FormGroup className="dashBoard-checkbox-container" row>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    id="wantCheckbox"
                    checked={formNeed}
                    onChange={formNeedToggle}
                  />
                  Need?
                </Label>
              </FormGroup>
            </FormGroup>
            <FormGroup className="dashBoard-checkbox-container" row>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    id="recurringCheckbox"
                    checked={formRecurring}
                    onChange={formRecurringToggle}
                  />
                  Recurring?
                </Label>
              </FormGroup>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={(e) => {
              saveNewExpense();
              setTimeout(() => {
                addingExToggle();
              }, 500);
            }}
            size="lg"
            block
          >
            Yeet
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ExpenseManager;
