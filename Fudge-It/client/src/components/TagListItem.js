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
import { UserProfileContext } from "../providers/UserProfileProvider";
import { TagContext } from "../providers/TagProvider";

const TagListItem = ({ tag }) => {
  const { getToken, getCurrentUser } = useContext(UserProfileContext);
  const { getUsersTags, deleteTag } = useContext(TagContext);

  ////////////////// This is state for the editing Modal /////////////////////////////
  const [editingTag, setEditingTag] = useState(false);
  const [editFormName, setEditFormName] = useState(tag.name);

  const toggleEditingTag = () => {
    setEditingTag(!editingTag);
  };
  ////////////////////////////////////////////////////////////////////////////////

  // This function creates a new Expense obj from the edit form's state and then makes a fetch call
  const editTag = (tagId) => {
    const user = getCurrentUser();
    const editedTag = {
      id: tagId,
      name: editFormName,
      userProfileId: user.id,
    };

    getToken().then((token) => {
      fetch(`/api/tag/${tagId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedTag),
      }).then(() => {
        getUsersTags();
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
      className="d-flex justify-content-between row align-items-center"
      key={tag.id}
    >
      <span className="mx-auto">{tag.name}</span>{" "}
      <ButtonGroup className="align-self-end">
        <Button onClick={toggleEditingTag}>EDIT</Button>
        <Button color="danger" onClick={toggleDeleteModal}>
          DELETE
        </Button>
      </ButtonGroup>
      {/* This is the Modal for adding a new expense */}
      <Modal
        isOpen={editingTag}
        toggle={toggleEditingTag}
        className="DashBoard-Add-Ex-Modal"
      >
        <ModalHeader toggle={toggleEditingTag}>Add A New Tag</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="expenseName">Tag Name</Label>
              <Input
                required
                name="exName"
                id="expenseName"
                placeholder="Expense Name"
                value={editFormName}
                onChange={(e) => setEditFormName(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={(e) => {
              editTag(tag.id);
              setTimeout(() => {
                toggleEditingTag();
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
            key={tag.id}
          >
            <span className="mx-auto">{tag.name}</span>{" "}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={(e) => {
              deleteTag(tag.id);
              toggleDeleteModal();
              getUsersTags();
            }}
          >
            DELETE
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default TagListItem;
