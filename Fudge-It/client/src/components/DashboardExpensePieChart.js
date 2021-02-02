import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UserProfileContext } from '../providers/UserProfileProvider';
import { Pie } from 'react-chartjs-2';

const DashboardExpensePieChart = () => {
  const { getToken, getCurrentUser } = useContext(UserProfileContext);
  const [rawExpenseTagData, setRawExpenseTagData] = useState([]);

  const activeUser = getCurrentUser();

  const getUsersExpenses = () => {
    getToken().then((token) =>
      fetch(`/api/dashboard/dashchart`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 404) {
            toast.error(
              'Oops something went wrong with this dashchart api call'
            );
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (data !== undefined) {
            setRawExpenseTagData(data);
          }
        })
    );
  };

  useEffect(() => {
    getUsersExpenses();
  }, []);

  const parseDataForChart = () => {};

  const data = {
    labels: [],
    dataset: [
      {
        data: [],
      },
    ],
  };
  console.log(rawExpenseTagData);
  return (
    <div>
      <p>I am a pie chart. Just BELIEVE!</p>
    </div>
  );
};
export default DashboardExpensePieChart;
