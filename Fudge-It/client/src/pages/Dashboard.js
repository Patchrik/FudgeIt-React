import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ExpenseContext } from "../providers/ExpenseProvider";
import DashboardExpenseList from "../components/DashboardExpenseList";
import DashboardExpensePieChart from "../components/DashboardExpensePieChart";
import "./Dashboard.css";

const Dashboard = () => {
  const { getToken, getCurrentUser } = useContext(UserProfileContext);
  const { getUsersExpenses } = useContext(ExpenseContext);
  const [addingEx, setAddingEx] = useState(false);

  const [formName, setFormName] = useState("");
  const [formDate, setFormDate] = useState(Date);
  const [formCost, setFormCost] = useState(0.0);
  const [formNeed, setFormNeed] = useState(false);
  const [formRecurring, setFormRecurring] = useState(false);

  // const [expenses, setExpenses] = useState([]);

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

  const activeUser = getCurrentUser();

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
        console.log(expenseToAdd);
        setFormName("");
        setFormDate(Date);
        setFormCost(0.0);
        setFormNeed(false);
        setFormRecurring(false);
        getUsersExpenses();
      });
    });
  };
  console.log();
  return (
    <div className="Dashboard container">
      <div className="column">
        <div className="my-2 col-md">
          <DashboardExpensePieChart />
        </div>
        <div className="my-2 col-md">
          <Button
            color="success"
            size="lg"
            block
            onClick={() => {
              console.log("What up boy you want a new expense?");
              addingExToggle();
            }}
          >
            Create New Expense
          </Button>
        </div>
        <div className="my-2 col-md">
          <DashboardExpenseList />
        </div>
        {/* Here is the Adding Modal */}
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
    </div>
  );
};

export default Dashboard;
