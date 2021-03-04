import { useContext, useEffect } from "react";
import formatDate from "../utils/dateFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { ExpenseContext } from "../providers/ExpenseProvider";

const DashboardExpenseList = () => {
  const { dashboardExpenses, getUsersDashboardExpenses, expenses } = useContext(
    ExpenseContext
  );

  useEffect(getUsersDashboardExpenses, [expenses]);

  return (
    <div className="Dashboard-Expense-List container">
      <ul className="list-group">
        {dashboardExpenses.map((exp) => (
          <li className="list-group-item" key={exp.id}>
            <div className="col-sm">
              <span className="ml-1">{exp.name}</span>{" "}
              <span className="ml-1">${exp.cost}</span>
            </div>
            <div className="col-sm">
              <span className="ml-1"> {formatDate(exp.expenseDate)} </span>
              <span className="mx-1">
                {exp.recurring ? "Monthly " : null}
                {exp.recurring ? (
                  <FontAwesomeIcon icon={faCalendarAlt} />
                ) : null}
              </span>
            </div>
            {exp.need ? (
              <span className="ml-1 badge badge-success">Need</span>
            ) : (
              <span className="ml-1 badge badge-primary">Want</span>
            )}
            {exp.expenseTags.map((expTag) => (
              <span
                className="mx-1 badge badge-pill badge-secondary d-inline-flex justify-content-start"
                key={expTag.id}
              >
                {expTag.tag.name}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardExpenseList;
