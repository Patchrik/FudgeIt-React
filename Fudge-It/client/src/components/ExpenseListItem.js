import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import formatDate from "../utils/dateFormatter";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ExpenseContext } from "../providers/ExpenseProvider";
import { TagContext } from "../providers/TagProvider";
import { ExpenseTagContext } from "../providers/ExpenseTagProvider";

const ExpenseListItem = ({ expense }) => {
  const { getToken, getCurrentUser } = useContext(UserProfileContext);
  const { getUsersExpenses, deleteExpense } = useContext(ExpenseContext);
  const { saveExpenseTag } = useContext(ExpenseTagContext);
  const { tags, getUsersTags } = useContext(TagContext);

  ////////////////// This is state for the editing Modal /////////////////////////////
  const [editingEx, setEditingEx] = useState(false);
  const [editFormName, setEditFormName] = useState(expense.name);
  const [editFormDate, setEditFormDate] = useState(
    formatDate(expense.expenseDate)
  );
  const [editFormCost, setEditFormCost] = useState(expense.cost);
  const [editFormNeed, setEditFormNeed] = useState(expense.need);
  const [editFormRecurring, setEditFormRecurring] = useState(expense.recurring);
  const [tagDropdown, setTagDrowdown] = useState("0");
  ////////////////////////////////////////////////////////////////////////////////////

  // These are functions to toggle the booleans related to the edit modal ////////////
  const editFormNeedToggle = () => setEditFormNeed(!editFormNeed);

  const editFormRecurringToggle = () =>
    setEditFormRecurring(!editFormRecurring);

  const toggleEditingEx = () => {
    setEditingEx(!editingEx);
  };
  ////////////////////////////////////////////////////////////////////////////////

  // This function creates a new Expense obj from the edit form's state and then makes a fetch call
  const editExpense = (expenseId) => {
    const user = getCurrentUser();
    const editedExpense = {
      id: expenseId,
      name: editFormName,
      expenseDate: editFormDate,
      cost: editFormCost,
      need: editFormNeed,
      recurring: editFormRecurring,
      userProfileId: user.id,
    };

    getToken().then((token) => {
      fetch(`/api/expense/${expenseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedExpense),
      })
        .then(() => {
          if (tagDropdown != "0") {
            saveExpenseTag(parseInt(tagDropdown), expenseId);
          }
        })
        .then(() => {
          getUsersExpenses();
        });
    });
  };
  // /////////////////////////////////////////////////////////////////////////////////////////////

  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  return (
    <div
      className="justify-content-around row align-items-center"
      key={expense.id}
    >
      <span className="mx-auto">{expense.name}</span>{" "}
      <span className="mx-auto">${expense.cost}</span>
      <span className="mx-auto"> {formatDate(expense.expenseDate)} </span>
      <span className="mx-auto">
        {expense.recurring ? <FontAwesomeIcon icon={faRedo} /> : null}
      </span>
      {expense.need ? (
        <span className="mx-auto badge badge-pill badge-success d-inline-flex justify-content-start">
          Need
        </span>
      ) : (
        <span className="mx-auto badge badge-pill badge-secondary d-inline-flex justify-content-start">
          Want
        </span>
      )}
      <ButtonGroup className="align-self-end">
        <Button onClick={toggleEditingEx}>EDIT</Button>
        <Button color="danger" onClick={toggleDeleteModal}>
          DELETE
        </Button>
      </ButtonGroup>
      {/* This is the Modal for adding a new expense */}
      <Modal
        isOpen={editingEx}
        toggle={toggleEditingEx}
        className="DashBoard-Add-Ex-Modal"
      >
        <ModalHeader toggle={toggleEditingEx}>Add A New Expense</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="expenseName">Expense Name</Label>
              <Input
                required
                name="exName"
                id="expenseName"
                placeholder="Expense Name"
                value={editFormName}
                onChange={(e) => setEditFormName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="expenseDate">Expense Date</Label>
              <Input
                required
                type="datetime"
                name="exDate"
                id="expenseDate"
                placeholder="Expense Date"
                value={editFormDate}
                onChange={(e) => setEditFormDate(e.target.value)}
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
                value={editFormCost}
                onChange={(e) => setEditFormCost(parseFloat(e.target.value))}
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
                    checked={editFormNeed}
                    onChange={editFormNeedToggle}
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
                    checked={editFormRecurring}
                    onChange={editFormRecurringToggle}
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
              editExpense(expense.id);
              setTimeout(() => {
                toggleEditingEx();
              }, 500);
            }}
            size="lg"
            block
          >
            Yeet
          </Button>
        </ModalFooter>
      </Modal>
      {/* This will be the confirm delete modal */}
      <Modal isOpen={deleteModal}>
        <ModalHeader>Delete This Expense?</ModalHeader>
        <ModalBody>
          <div
            className="justify-content-around row align-items-center"
            key={expense.id}
          >
            <span className="mx-auto">{expense.name}</span>{" "}
            <span className="mx-auto">${expense.cost}</span>
            <span className="mx-auto"> {formatDate(expense.expenseDate)} </span>
            <span className="mx-auto">
              {expense.recurring ? <FontAwesomeIcon icon={faRedo} /> : null}
            </span>
            {expense.need ? (
              <span className="mx-auto badge badge-pill badge-success d-inline-flex justify-content-start">
                Need
              </span>
            ) : (
              <span className="mx-auto badge badge-pill badge-secondary d-inline-flex justify-content-start">
                Want
              </span>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={(e) => {
              deleteExpense(expense.id);
              toggleDeleteModal();
              getUsersExpenses();
            }}
          >
            DELETE
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ExpenseListItem;
