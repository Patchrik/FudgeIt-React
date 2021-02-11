import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext } from "react";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import formatDate from "../utils/dateFormatter";
import { ExpenseContext } from "../providers/ExpenseProvider";
import ExpenseItemEditModal from "./ExpenseItemEditModal";

const ExpenseListItem = ({ expense }) => {
  const { getUsersExpenses, deleteExpense } = useContext(ExpenseContext);

  ////////////////// This is state for the editing Modal /////////////////////////////
  const [editModalOpen, setEditModalOpen] = useState(false);

  const toggleEditModalOpen = () => {
    setEditModalOpen(!editModalOpen);
  };
  ////////////////////////////////////////////////////////////////////////////////

  // Delete Modal state and toggle function
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };
  //

  return (
    <div
      className="justify-content-around row align-items-center"
      key={expense.id}
    >
      <div className="col-sm">
        <span className="mx-auto">{expense.name}</span>{" "}
        <span className="mx-auto">
          {" "}
          <strong>${expense.cost}</strong>
        </span>
      </div>
      <span className="mx-auto"> {formatDate(expense.expenseDate)} </span>
      <div className="col-sm">
        {expense.expenseTags.map((expTag) => (
          <span className="mx-auto badge badge-pill badge-primary d-inline-flex justify-content-start">
            {expTag.tag.name}
          </span>
        ))}
      </div>
      <span className="mx-1">
        {expense.recurring ? <FontAwesomeIcon icon={faCalendarAlt} /> : null}
      </span>
      <div className="col-sm">
        {expense.need ? (
          <span className="mx-1 badge badge-pill badge-success d-inline-flex justify-content-start">
            Need
          </span>
        ) : (
          <span className="mx-1 badge badge-pill badge-secondary d-inline-flex justify-content-start">
            Want
          </span>
        )}
      </div>
      <div>
        <ButtonGroup className="align-self-end">
          <Button onClick={toggleEditModalOpen}>EDIT</Button>
          <Button color="danger" onClick={toggleDeleteModal}>
            DELETE
          </Button>
        </ButtonGroup>
      </div>
      <ExpenseItemEditModal
        expense={expense}
        editModalOpen={editModalOpen}
        toggleEditModalOpen={toggleEditModalOpen}
      />
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
              {expense.recurring ? (
                <FontAwesomeIcon icon={faCalendarAlt} />
              ) : null}
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
