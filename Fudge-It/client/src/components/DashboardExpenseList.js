import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UserProfileContext } from '../providers/UserProfileProvider';
import formatDate from '../utils/dateFormatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

const DashboardExpenseList = ({ getUsersExpenses, expensesState }) => {
  const { getToken, getCurrentUser } = useContext(UserProfileContext);

  useEffect((_) => {
    getUsersExpenses();
  }, []);

  console.log('expense list rendered');
  return (
    <div className="Dashboard-Expense-List">
      <ul className="list-group">
        {expensesState.map((exp) => (
          <li className="list-group-item" key={exp.id}>
            <span className="ml-1">{exp.name}</span>{' '}
            <span className="ml-1">${exp.cost}</span>
            <span className="ml-1"> {formatDate(exp.expenseDate)} </span>
            <span className="mx-1">
              {exp.recurring ? <FontAwesomeIcon icon={faRedo} /> : null}
            </span>
            {exp.need ? (
              <span className="ml-1 badge badge-success">Need</span>
            ) : (
              <span className="ml-1 badge badge-secondary">Want</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardExpenseList;
