import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";
import fudgeitLogo from "../img/fudgeitLogo.png";
import "./AppHeader.css";

const AppHeader = () => {
  const { getCurrentUser, logout } = useContext(UserProfileContext);
  const user = getCurrentUser();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logoutAndReturn = () => {
    return logout().then(() => {
      toast.dark("You are now logged out");
      history.push("/login");
    });
  };

  return (
    <div>
      <Navbar className="color-nav" dark expand="md">
        <NavbarBrand tag={Link} to="/">
          <img
            id="header-logo"
            src={fudgeitLogo}
            width="30"
            height="30"
            className="mr-1"
            alt="FudgeIt Logo"
          />
          fudge it
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {user ? (
              <>
                <NavItem>
                  <NavLink className="nav-bar-link-text" to="/" tag={Link}>
                    Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-bar-link-text"
                    to="/expenses"
                    tag={Link}
                  >
                    Expenses
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-bar-link-text" to="/tags" tag={Link}>
                    Tags
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-bar-link-text"
                    onClick={logoutAndReturn}
                    tag={Link}
                  >
                    Logout
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink className="nav-bar-link-text" to="/login" tag={Link}>
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-bar-link-text"
                    to="/register"
                    tag={Link}
                  >
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          {user ? (
            <NavbarText className="d-sm-none d-md-block">
              Welcome {user.firstName + " " + user.lastName}
            </NavbarText>
          ) : null}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AppHeader;
