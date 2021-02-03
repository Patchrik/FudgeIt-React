import React, { useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const TagContext = createContext();

export const TagProvider = (props) => {
  const { getToken, getCurrentUser } = useContext(UserProfileContext);

  const activeUser = getCurrentUser();

  const [tags, setTags] = useState([]);

  const getUsersTags = () => {
    getToken().then((token) =>
      fetch(`/api/tag/${activeUser.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 404) {
            toast.error("Oops something went wrong with the tag api call");
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (data !== undefined) {
            setTags(data);
          }
        })
    );
  };

  const deleteTag = (tagId) => {
    getToken().then((token) => {
      fetch(`/api/expense/${tagId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });
  };

  return (
    <TagContext.Provider
      value={{
        tags,
        setTags,
        getUsersTags,
        deleteTag,
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};
