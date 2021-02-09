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
import { TagContext } from "../providers/TagProvider";
import { ExpenseTagContext } from "../providers/ExpenseTagProvider";
import { toast } from "react-toastify";
import ExpenseListItem from "../components/ExpenseListItem";
import ExpenseManagerNeedWantPieChart from "../components/ExpenseManagerNeedWantPieChart";
const ExpenseManager = () => {
  const { expenses, getUsersExpenses } = useContext(ExpenseContext);
  const { getToken } = useContext(UserProfileContext);
  const { saveExpenseTag } = useContext(ExpenseTagContext);
  const { tags, getUsersTags } = useContext(TagContext);

  useEffect(() => {
    getUsersExpenses();
    getUsersTags();
    console.log(expenses);
  }, []);

  const [addingEx, setAddingEx] = useState(false);
  const [formName, setFormName] = useState("");
  const [formDate, setFormDate] = useState(Date);
  const [formCost, setFormCost] = useState(0.0);
  const [formNeed, setFormNeed] = useState(false);
  const [formRecurring, setFormRecurring] = useState(false);
  const [tagDropdown, setTagDrowdown] = useState("0");

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
      })
        .then((res) => res.json())
        .then((newExpense) => {
          console.log("This is the new expense", newExpense);
          if (tagDropdown != "0") {
            saveExpenseTag(parseInt(tagDropdown), newExpense.id);
          }
        })
        .then(() => {
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
      <h5>Spending On Needs vs. Wants</h5>
      <ExpenseManagerNeedWantPieChart />
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
            <FormGroup className="dashBoard-tag-dropdown-container">
              <Input
                type="select"
                name="selectTagDropdown"
                id="tagDropdown"
                value={tagDropdown}
                onChange={(e) => {
                  setTagDrowdown(e.target.value);
                  console.log(tagDropdown);
                }}
              >
                <option value="0">Select a tag?</option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </Input>
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
