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
import { TagContext } from "../providers/TagProvider";

import TagListItem from "../components/TagListItem";
const TagManager = () => {
  const { tags, getUsersTags } = useContext(TagContext);
  const { getToken } = useContext(UserProfileContext);

  useEffect(() => {
    getUsersTags();
  }, []);

  const [addingTag, setAddingTag] = useState(false);
  const [formName, setFormName] = useState("");

  const addingTagToggle = () => {
    setAddingTag(!addingTag);
    setFormName("");
  };

  const saveNewTag = () => {
    const tagToAdd = {
      name: formName,
    };
    getToken().then((token) => {
      fetch(`api/tag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tagToAdd),
      }).then(() => {
        setFormName("");
        getUsersTags();
      });
    });
  };

  return (
    <div className="container mt-5">
      <h2> Manage Tags </h2>
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-8 col-md-6 col-lg-8">
          <div className="my-4">
            <Button
              className="my-2"
              color="success"
              size="lg"
              block
              onClick={addingTagToggle}
            >
              Add New Tag
            </Button>
          </div>
          <ListGroup>
            {tags.map((tag) => {
              return (
                <ListGroupItem key={tag.id}>
                  <TagListItem tag={tag} />
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </div>
      </div>
      <Modal
        isOpen={addingTag}
        toggle={addingTagToggle}
        className="DashBoard-Add-Ex-Modal"
      >
        <ModalHeader toggle={addingTagToggle}>Add A New Tag</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="tagName">Tag Name</Label>
              <Input
                required
                name="tgName"
                id="tagName"
                placeholder="Tag Name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={(e) => {
              saveNewTag();
              setTimeout(() => {
                addingTagToggle();
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

export default TagManager;
