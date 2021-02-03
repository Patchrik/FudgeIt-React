import React, { useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const ExpenseContext = createContext();

export const ExpenseProvider = (props) => {
  const { getToken, getCurrentUser } = useContext(UserProfileContext);

  const activeUser = getCurrentUser();

  const [expenses, setExpenses] = useState([]);

  const getUsersExpenses = () => {
    console.log("expense list made a fetch call");
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

  const deleteExpense = (expenseId) => {
    getToken().then((token) => {
      fetch(`/api/expense/${expenseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        getUsersExpenses,
        deleteExpense,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};
