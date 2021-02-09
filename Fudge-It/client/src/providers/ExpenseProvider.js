import React, { useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const ExpenseContext = createContext();

export const ExpenseProvider = (props) => {
  const { getToken, getCurrentUser } = useContext(UserProfileContext);

  const activeUser = getCurrentUser();

  const [expenses, setExpenses] = useState([]);

  const getUsersExpenses = () => {
    getToken().then((token) =>
      fetch(`/api/expense/${activeUser.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 404) {
            toast.error("Oops something went wrong with this expense api call");
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (data !== undefined) {
            setExpenses(data);
          }
        })
    );
  };

  const getUsersExpensesByTagId = (tagId) => {
    getToken().then((token) =>
      fetch(`/api/expense/bytagid/${tagId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 404) {
            toast.error(
              "Oops something went wrong, are you sure that's a tag?"
            );
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (data !== undefined) {
            const sortedExpenses = data.map((data) => {
              return data.expense;
            });
            console.log(sortedExpenses);
            setExpenses(sortedExpenses);
          }
        })
    );
  };

  const deleteExpense = (expenseId) => {
    getToken()
      .then((token) => {
        fetch(`/api/expense/${expenseId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then(() => {
        getUsersExpenses();
      });
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        getUsersExpenses,
        deleteExpense,
        getUsersExpensesByTagId,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};
