import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ExpenseManager from "../pages/ExpenseManager";
import UserManager from "../pages/UserManager";
import { ExpenseProvider } from "../providers/ExpenseProvider";
import { TagProvider } from "../providers/TagProvider";
import { ExpenseTagProvider } from "../providers/ExpenseTagProvider";
import TagManager from "../pages/TagManager";

const ApplicationViews = () => {
  const { isLoggedIn, getCurrentUser } = useContext(UserProfileContext);
  const user = getCurrentUser();

  return (
    <Switch>
      <Route path="/" exact>
        <ExpenseTagProvider>
          <TagProvider>
            <ExpenseProvider>
              {isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
            </ExpenseProvider>
          </TagProvider>
        </ExpenseTagProvider>
      </Route>

      <Route path="/expenses" exact>
        <ExpenseTagProvider>
          <TagProvider>
            <ExpenseProvider>
              {isLoggedIn ? <ExpenseManager /> : <Redirect to="/login" />}
            </ExpenseProvider>
          </TagProvider>
        </ExpenseTagProvider>
      </Route>

      <Route path="/tags" exact>
        <TagProvider>
          {isLoggedIn ? <TagManager /> : <Redirect to="/login" />}
        </TagProvider>
      </Route>

      <Route path="/settings" exact>
        <TagProvider>
          {isLoggedIn ? (
            <UserManager activeUser={user} />
          ) : (
            <Redirect to="/login" />
          )}
        </TagProvider>
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
