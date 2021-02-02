import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UserProfileContext } from '../providers/UserProfileProvider';
import { Doughnut } from 'react-chartjs-2';

const DashboardExpensePieChart = () => {
  const { getToken, getCurrentUser } = useContext(UserProfileContext);
  const [rawData, setRawData] = useState({});

  const activeUser = getCurrentUser();

  const chartColors = [
    '#BEDB39',
    '#BDD684',
    '#588F27',
    '#33691E',
    '#67CC8E',
    '#00796B',
  ];

  const getUsersExpenses = () => {
    console.log('expense chart made a fetch call');
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
    datasets: [
      {
        fill: false,
        lineTension: 0.1,
        backgroundColor: chartColors,
        hoverOffset: 1,
        hoverBorderColor: '#45BF55',
        hoverBorderWidth: 3,
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        data: rawData.sums,
      },
    ],
  };

  const render = () => {
    console.log('expense chart rendered');
    return (
      <div>
        <Doughnut data={data} height={400} width={600} />
      </div>
    );
  };
  return render();
};
export default DashboardExpensePieChart;
