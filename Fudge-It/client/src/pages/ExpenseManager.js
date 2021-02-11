import React, { useEffect, useState, useContext } from "react";
import {
  ListGroup,
  ListGroupItem,
  Input,
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
import ExpenseListItem from "../components/ExpenseListItem";
import ExpenseManagerNeedWantPieChart from "../components/ExpenseManagerNeedWantPieChart";
const ExpenseManager = () => {
  const { expenses, getUsersExpenses, getUsersExpensesByTagId } = useContext(
    ExpenseContext
  );
  const { getToken } = useContext(UserProfileContext);
  const { saveExpenseTag } = useContext(ExpenseTagContext);
  const { tags, getUsersTags } = useContext(TagContext);
  useEffect(() => {
    getUsersExpenses();
    getUsersTags();
    usedTagsButtons();
  }, []);

  useEffect(() => {
    getUsersTags();
    findTotalCost();
  }, [expenses]);

  useEffect(() => {
    usedTagsButtons();
  }, [tags]);

  const [addingEx, setAddingEx] = useState(false);
  const [formName, setFormName] = useState("");
  const [formDate, setFormDate] = useState(Date);
  const [formCost, setFormCost] = useState(0.0);
  const [formNeed, setFormNeed] = useState(false);
  const [formRecurring, setFormRecurring] = useState(false);
  const [tagDropdown, setTagDropdown] = useState("0");
  const [sortedByTag, setSortedByTag] = useState(false);
  const [sumOfExpenses, setSumOfExpenses] = useState("0.0");
  const [sortedTagName, setSortedTagName] = useState("");
  const [usedTags, setUsedTags] = useState([]);

  const addingExToggle = () => {
    setAddingEx(!addingEx);
    setFormName("");
    setFormDate(Date);
    setFormCost(0.0);
    setFormNeed(false);
    setFormRecurring(false);
    setTagDropdown("0");
  };

  const findTotalCost = () => {
    if (expenses.length >= 1) {
      let costArray = expenses.map((exp) => exp.cost);
      let totalCost = costArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
      setSumOfExpenses(Number.parseFloat(totalCost).toFixed(2));
    }
  };

  const usedTagsButtons = () => {
    if (tags.length >= 1) {
      let allTags = tags.map((tag) => tag);
      let tagsWithExpenses = allTags.filter(
        (tag) => tag.expenseTags.length >= 1
      );
      setUsedTags(tagsWithExpenses);
    }
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
          if (tagDropdown !== "0") {
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
          <div className="container">
            <h5>Sort By Tag</h5>
            <h6>
              {sortedByTag ? (
                <p>
                  Total Spent On {sortedTagName}: ${sumOfExpenses}
                </p>
              ) : (
                <p>Total Spent On All Tags: ${sumOfExpenses}</p>
              )}
            </h6>
            <div className="row">
              <Button
                className="col-sm mx-2 my-2"
                onClick={(e) => {
                  setSortedByTag(false);
                  getUsersExpenses();
                }}
              >
                All Tags
              </Button>
              {usedTags.map((tag) => (
                <Button
                  className="col-sm mx-2 my-2"
                  onClick={(e) => {
                    setSortedByTag(!sortedByTag);
                    setSortedTagName(tag.name);
                    getUsersExpensesByTagId(tag.id);
                  }}
                >
                  {tag.name}
                </Button>
              ))}
            </div>
          </div>
          <ListGroup className="container">
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
                  setTagDropdown(e.target.value);
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
              }, 100);
            }}
            size="lg"
            block
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ExpenseManager;
