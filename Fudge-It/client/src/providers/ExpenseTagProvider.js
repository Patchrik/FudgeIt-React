import React, { useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { UserProfileContext } from "./UserProfileProvider";

export const ExpenseTagContext = createContext();

export const ExpenseTagProvider = (props) => {
  const { getToken, getCurrentUser } = useContext(UserProfileContext);

  const activeUser = getCurrentUser();

  const [expenseTags, setExpenseTags] = useState([]);

  const saveExpenseTag = (passedTagId, passedExpenseId) => {
    const newExpenseTag = { tagId: passedTagId, expenseId: passedExpenseId };
    getToken().then((token) =>
      fetch(`api/expensetag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newExpenseTag),
      })
    );
  };

  const deleteExpenseTag = (tagId) => {
    getToken().then((token) => {
      fetch(`/api/tag/${tagId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });
  };

  return (
    <ExpenseTagContext.Provider
      value={{
        saveExpenseTag,
      }}
    >
      {props.children}
    </ExpenseTagContext.Provider>
  );
};
