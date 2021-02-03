import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ExpenseManager from "../pages/ExpenseManager";
import { ExpenseProvider } from "../providers/ExpenseProvider";

const ApplicationViews = () => {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <Switch>
      <Route path="/" exact>
        <ExpenseProvider>
          {isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
        </ExpenseProvider>
      </Route>

      <Route path="/expenses" exact>
        <ExpenseProvider>
          {isLoggedIn ? <ExpenseManager /> : <Redirect to="/login" />}
        </ExpenseProvider>
      </Route>

      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  );
};

export default ApplicationViews;
