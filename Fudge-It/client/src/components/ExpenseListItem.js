import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
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
} from 'reactstrap';
import formatDate from '../utils/dateFormatter';

const ExpenseListItem = ({ expense }) => {
  const [editingEx, setEditingEx] = useState(false);

  const [editFormName, setEditFormName] = useState(expense);
  const [editFormDate, setEditFormDate] = useState(Date);
  const [editFormCost, setEditFormCost] = useState(0.0);
  const [editFormNeed, setEditFormNeed] = useState(false);
  const [editFormRecurring, setEditFormRecurring] = useState(false);

  const editFormNeedToggle = () => setEditFormNeed(!editFormNeed);

  const editFormRecurringToggle = () =>
    setEditFormRecurring(!editFormRecurring);

  const toggleEditingEx = () => {
    setEditingEx(!editingEx);
  };
  console.log(expense);
  return (
    <div
      className="justify-content-around row align-items-center"
      key={expense.id}
    >
      <span className="mx-auto">{expense.name}</span>{' '}
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
        <Button color="danger">DELETE</Button>
      </ButtonGroup>
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
                type="date"
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
              console.log('you clicked yeet');
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
    </div>
  );
};

export default ExpenseListItem;
