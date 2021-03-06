import React, { useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { UserProfileContext } from "./UserProfileProvider";

export const ExpenseTagContext = createContext();

export const ExpenseTagProvider = (props) => {
  const { getToken } = useContext(UserProfileContext);

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

  const getExpenseTagsByExpenseId = (expId) => {
    getToken().then((token) =>
      fetch(`/api/expensetag/${expId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 404) {
            toast.error("Oops something went wrong get expense tags");
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (data !== undefined) {
            setExpenseTags(data);
          }
        })
    );
  };

  const deleteExpenseTagsByExpenseId = (expenseId) => {
    getToken().then((token) => {
      fetch(`/api/expensetag/byExpense/${expenseId}`, {
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
        deleteExpenseTagsByExpenseId,
        getExpenseTagsByExpenseId,
        expenseTags,
        setExpenseTags,
      }}
    >
      {props.children}
    </ExpenseTagContext.Provider>
  );
};
