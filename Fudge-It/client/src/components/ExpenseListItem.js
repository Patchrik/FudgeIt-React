import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext, useEffect } from "react";
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
  const { saveExpenseTag, deleteExpenseTag } = useContext(ExpenseTagContext);
  const { tags } = useContext(TagContext);

  const [test, setTest] = useState(true);
  // State and Functions for Tag dropdown///////////////////////////////////////////////
  const [tagDropDownOptions, setTagDropDownOptions] = useState([]);

  const filterTagDropDown = () => {
    let usedTags = [];
    let filteredDropdownTags = [];

    if (expense.expenseTags) {
      expense.expenseTags.forEach((expenseTag) => {
        usedTags.push(expenseTag.tagId);
      });

      tags.forEach((tag) => {
        if (!usedTags.includes(tag.id)) {
          filteredDropdownTags.push(tag);
        }
      });
    }
    setTagDropDownOptions(filteredDropdownTags);
  };

  ////////////////////////////////////////////////////////////////////////////////////
  const [deleteExpTagState, setDeleteExpTagState] = useState([]);

  const toggleDeleteExpTagState = (expTagId) => {
    if (deleteExpTagState.includes(expTagId)) {
      let newToggleStateArray = deleteExpTagState.filter(
        (id) => id !== expTagId
      );
      setDeleteExpTagState(newToggleStateArray);
    } else {
      let updatedToggleExpTag = deleteExpTagState;
      updatedToggleExpTag.push(expTagId);
      setDeleteExpTagState(updatedToggleExpTag);
    }
    console.log("Ive updated delete exp tag state array");
  };

  ////////////////// This is state for the editing Modal /////////////////////////////
  const [editingEx, setEditingEx] = useState(false);
  const [editFormName, setEditFormName] = useState(expense.name);
  const [editFormDate, setEditFormDate] = useState(
    formatDate(expense.expenseDate)
  );
  const [editFormCost, setEditFormCost] = useState(expense.cost);
  const [editFormNeed, setEditFormNeed] = useState(expense.need);
  const [editFormRecurring, setEditFormRecurring] = useState(expense.recurring);
  const [tagDropdown, setTagDropdown] = useState("0");
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

  // Delete Modal state and toggle function
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };
  //

  useEffect(() => {
    filterTagDropDown();
  }, []);

  useEffect(() => {
    renderModal();
    console.log("I'm calling renderModal");
  }, [deleteExpTagState]);

  const renderModal = () => {
    console.log("renderModal has fired");
    return (
      <Modal
        isOpen={editingEx}
        toggle={toggleEditingEx}
        className="DashBoard-Add-Ex-Modal"
      >
        <ModalHeader toggle={toggleEditingEx}>Edit Expense</ModalHeader>
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
                  setTagDropdown(e.target.value);
                }}
              >
                <option value="0">Select a tag?</option>
                {tagDropDownOptions.map((tag) => {
                  return (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <div className="edit-modal-tag-container my-1 d-flex">
              {expense.expenseTags.map((expTag) => {
                if (deleteExpTagState.includes(expTag.id) === false) {
                  // debugger;
                  return (
                    <Button
                      outline
                      color="danger"
                      size="sm"
                      onClick={() => {
                        toggleDeleteExpTagState(expTag.id);
                        setTimeout(() => {
                          renderModal();
                        }, 500);
                      }}
                    >
                      Remove {expTag.tag.name} tag
                    </Button>
                  );
                } else {
                  // debugger;
                  return (
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => {
                        toggleDeleteExpTagState(expTag.id);
                        setTimeout(() => {
                          renderModal();
                        }, 500);
                      }}
                    >
                      Remove {expTag.tag.name} tag
                    </Button>
                  );
                }
              })}
            </div>
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
    );
  };

  return (
    <div
      className="justify-content-around row align-items-center"
      key={expense.id}
    >
      <span className="mx-auto">{expense.name}</span>{" "}
      <span className="mx-auto">${expense.cost}</span>
      <span className="mx-auto"> {formatDate(expense.expenseDate)} </span>
      {expense.expenseTags.map((expTag) => (
        <span className="mx-auto badge badge-pill badge-primary d-inline-flex justify-content-start">
          {expTag.tag.name}
        </span>
      ))}
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
      {renderModal()}
      {/* This is the Modal for adding a editing an expense */}
      {/* <Modal
        isOpen={editingEx}
        toggle={toggleEditingEx}
        className="DashBoard-Add-Ex-Modal"
      >
        <ModalHeader toggle={toggleEditingEx}>Edit Expense</ModalHeader>
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
                  setTagDropdown(e.target.value);
                  console.log(tagDropdown);
                }}
              >
                <option value="0">Select a tag?</option>
                {tagDropDownOptions.map((tag) => {
                  return (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <div className="edit-modal-tag-container my-1 d-flex">
              {expense.expenseTags.map((expTag) => {
                if (deleteExpTagState.includes(expTag.id) === false) {
                  return (
                    <Button
                      outline
                      color="danger"
                      size="sm"
                      onClick={() => {
                        toggleDeleteExpTagState(expTag.id);
                      }}
                    >
                      Remove {expTag.tag.name} tag
                    </Button>
                  );
                } else {
                  return (
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => {
                        toggleDeleteExpTagState(expTag.id);
                      }}
                    >
                      Remove {expTag.tag.name} tag
                    </Button>
                  );
                }
              })}
            </div>
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
      </Modal> */}
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
