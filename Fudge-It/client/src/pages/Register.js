import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./Login.css";
import fudgeitLogo from "../img/fudgeitLogo.png";

const Register = () => {
  const { register } = useContext(UserProfileContext);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cashflow, setCashflow] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const history = useHistory();

  let cashflowAsNumber = 0;

  const convertCashflow = (string) => {
    cashflowAsNumber = Number(string);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length <= 5) {
      toast.error("Password must be longer than 5 characters");
      return;
    }

    setLoading(true);
    const profile = {
      firstName,
      lastName,
      cashflow,
      email,
    };
    register(profile, password)
      .then((user) => {
        setLoading(false);
        toast.info(`Welcome ${user.firstName}`);
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Invalid email");
      });
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="avatar login-avatar-bg">
          <img src={fudgeitLogo} alt="Avatar" />
        </div>
        <h2 className="text-center">User Register</h2>
        <div className="form-group">
          <Input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            className="form-control"
            name="firstName"
            placeholder="First Name"
            required="required"
          />
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            className="form-control"
            name="lastName"
            placeholder="Last Name"
            required="required"
          />
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => {
              setCashflow(e.target.value);
              convertCashflow(cashflow);
            }}
            type="number"
            className="form-control"
            name="cashflow"
            placeholder="Monthly Income"
            required="required"
          />
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            required="required"
          />
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            required="required"
          />
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => setConfirm(e.target.value)}
            type="password"
            className="form-control"
            name="confirmPassword"
            placeholder="Confirm Password"
            required="required"
          />
        </div>
        <div className="form-group">
          <Button type="submit" block color="danger" disabled={loading}>
            Sign Up
          </Button>
        </div>
        <div className="text-center small">
          Already have an account?
          <div>
            <Link to="/login">Log in here</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
