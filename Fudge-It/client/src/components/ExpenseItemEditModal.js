import { useContext, useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { TagContext } from "../providers/TagProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ExpenseContext } from "../providers/ExpenseProvider";
import { ExpenseTagContext } from "../providers/ExpenseTagProvider";
import formatDate from "../utils/dateFormatter";

const ExpenseItemEditModal = ({
  expense,
  editModalOpen,
  toggleEditModalOpen,
}) => {
  const { tags, getUsersTags } = useContext(TagContext);
  const { getCurrentUser, getToken } = useContext(UserProfileContext);
  const { getUsersExpenses } = useContext(ExpenseContext);
  const { saveExpenseTag, deleteExpenseTagsByExpenseId } = useContext(
    ExpenseTagContext
  );
  ////////////////// This is state for the editing Modal /////////////////////////////
  const [editFormName, setEditFormName] = useState(expense.name);
  const [editFormDate, setEditFormDate] = useState(
    formatDate(expense.expenseDate)
  );
  const [editFormCost, setEditFormCost] = useState(expense.cost);
  const [editFormNeed, setEditFormNeed] = useState(expense.need);
  const [editFormRecurring, setEditFormRecurring] = useState(expense.recurring);
  const [expenseTags, setExpenseTags] = useState(expense.expenseTags || []);

  // These are functions to toggle the booleans related to the edit modal ////////////
  const editFormNeedToggle = () => setEditFormNeed(!editFormNeed);

  const editFormRecurringToggle = () =>
    setEditFormRecurring(!editFormRecurring);

  // State and Functions for Tag dropdown///////////////////////////////////////////////
  const [tagDropDownOptions, setTagDropDownOptions] = useState([]);
  const [tagChoice, setTagChoice] = useState("0");

  const filterTagDropDown = () => {
    let usedTags = [];
    let filteredDropdownTags = [];

    if (expenseTags) {
      expenseTags.forEach((expenseTag) => {
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

  useEffect(filterTagDropDown, [expenseTags, tags]);

  const handleTagSelect = (tagId) => {
    if (expenseTags.some((expTag) => expTag.tagId === parseInt(tagId))) {
      let filteredOutExpenseTag = expenseTags.filter(
        (expTag) => expTag.tagId !== parseInt(tagId)
      );
      setExpenseTags(filteredOutExpenseTag);
      return;
    }
    if (tagId && tagId !== "0" && tagId !== "") {
      const tagName = tags.find((tag) => tag.id === parseInt(tagId));
      const expTag = {
        tagId: parseInt(tagId),
        expenseId: expense.id,
        tag: { name: tagName.name ? tagName.name : "The name is blank" },
      };
      setExpenseTags([...expenseTags, expTag]);
    }
  };

  // // This function creates a new Expense obj from the edit form's state and then makes a fetch call
  const editExpense = async (expenseId) => {
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
    await deleteExpenseTagsByExpenseId(expenseId);
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
          expenseTags.forEach((expTag) => {
            saveExpenseTag(expTag.tagId, expTag.expenseId);
          });
        })
        .then(() => {
          getUsersExpenses();
        });
    });
    await getUsersTags();
  };
  // /////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Modal
      isOpen={editModalOpen}
      toggle={toggleEditModalOpen}
      className="DashBoard-Add-Ex-Modal"
    >
      <ModalHeader toggle={toggleEditModalOpen}>Edit Expense</ModalHeader>
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
              value={tagChoice}
              onChange={(e) => {
                setTagChoice(e.target.value);
                handleTagSelect(e.target.value);
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
            {expenseTags.map((expTag) => (
              <span className="mx-auto badge badge-primary">
                {expTag.tag.name}
                <Button
                  aria-label="close"
                  className="mx-auto close"
                  size="sm"
                  onClick={(e) => {
                    handleTagSelect(expTag.tagId);
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </Button>
              </span>
            ))}
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
            toggleEditModalOpen();
          }}
          size="lg"
          block
        >
          Edit
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ExpenseItemEditModal;
