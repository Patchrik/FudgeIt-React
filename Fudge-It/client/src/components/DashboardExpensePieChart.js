import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ExpenseContext } from "../providers/ExpenseProvider";
import { Doughnut, Pie } from "react-chartjs-2";
import "./DashboardExpensePieChart.css";

const DashboardExpensePieChart = () => {
  const { getToken } = useContext(UserProfileContext);
  const [rawData, setRawData] = useState({});
  const { expenses } = useContext(ExpenseContext);

  const chartColors = [
    "#BEDB39",
    "#BDD684",
    "#588F27",
    "#33691E",
    "#67CC8E",
    "#00796B",
  ];

  const getUsersDashchart = () => {
    getToken().then((token) =>
      fetch(`/api/dashboard/dashchart`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 404) {
            toast.error(
              "Oops something went wrong with this dashchart api call"
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
    getUsersDashchart();
  }, [expenses]);

  const data = {
    labels: rawData.labels,
    datasets: [
      {
        label: "Spending Based On Tags",
        data: rawData.sums,
        backgroundColor: chartColors,
        hoverOffset: 1,
        hoverBorderColor: "#45BF55",
        hoverBorderWidth: 3,
      },
    ],
  };
  const cashRemainingdata = {
    labels: ["Money Spent", "Money Remaining"],
    datasets: [
      {
        labels: ["Money Spent", "Money Remaining"],
        label: "Monthly Cashflow",
        data: [rawData.moneySpent, rawData.cashRemaining],
        backgroundColor: ["#33691E", "#BDC3C7"],
        hoverOffset: 1,
        hoverBorderColor: "#45BF55",
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
    },
  };

  const render = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <Doughnut
              data={data}
              width={200}
              height={400}
              options={options}
            ></Doughnut>
          </div>
          <div className="col-sm">
            <Doughnut
              data={cashRemainingdata}
              width={200}
              height={400}
              options={options}
            ></Doughnut>
          </div>
        </div>
        <h3>You have ${rawData.cashRemaining} to spend.</h3>
      </div>
    );
  };
  return render();
};
export default DashboardExpensePieChart;
