import React, { useEffect, useState, useContext } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Input,
  InputGroup,
  Button,
} from 'reactstrap';
import { UserProfileContext } from '../providers/UserProfileProvider';
import { toast } from 'react-toastify';
import ExpenseListItem from '../components/ExpenseListItem';
const ExpenseManager = () => {
  const { getToken, getCurrentUser } = useContext(UserProfileContext);
  const activeUser = getCurrentUser();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getUsersExpenses();
  }, []);

  const getUsersExpenses = () => {
    console.log('expense list made a fetch call');
    getToken().then((token) =>
      fetch(`/api/expense/${activeUser.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 404) {
            toast.error('Oops something went wrong with this expense api call');
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

  return (
    <div className="container mt-5">
      <h2> Manage Expenses </h2>
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-8 col-md-6 col-lg-8">
          <div className="my-4">
            <Button className="my-2" color="success" size="lg" block>
              Add New Expense
            </Button>
          </div>
          <ListGroup>
            {expenses.map((expense) => {
              return (
                <ListGroupItem key={expense.id}>
                  <ExpenseListItem expense={expense} />
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default ExpenseManager;
