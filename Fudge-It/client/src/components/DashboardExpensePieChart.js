import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ExpenseContext } from "../providers/ExpenseProvider";
import { Doughnut, Pie } from "react-chartjs-2";
import "./DashboardExpensePieChart.css";

const DashboardExpensePieChart = () => {
  const { getToken, getCurrentUser } = useContext(UserProfileContext);
  const [rawData, setRawData] = useState({});
  const { expenses } = useContext(ExpenseContext);

  const activeUser = getCurrentUser();

  const userTotalSpent = 0.0;

  const chartColors = [
    "#BEDB39",
    "#BDD684",
    "#588F27",
    "#33691E",
    "#67CC8E",
    "#00796B",
  ];

  const getUsersDashchart = () => {
    console.log("expense chart made a fetch call");
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
    labels: [],
    datasets: [
      {
        labels: rawData.labels,
        label: "Spending Based On Tags",
        data: rawData.sums,
        backgroundColor: chartColors,
        hoverOffset: 1,
        hoverBorderColor: "#45BF55",
        hoverBorderWidth: 3,
      },
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
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var index = tooltipItem.index;
          return dataset.labels[index] + ": " + dataset.data[index];
        },
      },
    },
  };

  const render = () => {
    console.log("expense chart rendered");
    console.log(rawData);
    return (
      <div className="relative">
        <Doughnut
          data={data}
          options={options}
          height={400}
          width={600}
        ></Doughnut>
        <div className="absolute-center text-center">
          <p>${rawData.cashRemaining} Remaining</p>
        </div>
      </div>
    );
  };
  return render();
};
export default DashboardExpensePieChart;
