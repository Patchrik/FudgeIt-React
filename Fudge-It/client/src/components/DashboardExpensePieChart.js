import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UserProfileContext } from '../providers/UserProfileProvider';
import { Pie } from 'react-chartjs-2';

const DashboardExpensePieChart = () => {
  const { getToken, getCurrentUser } = useContext(UserProfileContext);
  const [rawData, setRawData] = useState([]);

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
            setRawData(data);
            render();
          }
        })
    );
  };

  useEffect(() => {
    getUsersExpenses();
  }, []);

  const data = {
    labels: rawData.labels,
    dataset: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: rawData.sums,
      },
    ],
  };
  console.log(rawData);
  console.log(rawData.labels);
  console.log(rawData.sums);
  const render = () => {
    return (
      <div>
        <Pie data={data} />
      </div>
    );
  };
  return render();
};
export default DashboardExpensePieChart;
