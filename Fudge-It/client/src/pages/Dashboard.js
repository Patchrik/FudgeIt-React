import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Button, Container, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { UserProfileContext } from '../providers/UserProfileProvider';
import DashboardExpenseList from '../components/DashboardExpenseList';
import DashboardExpensePieChart from '../components/DashboardExpensePieChart';

const Dashboard = () => {
  const { getToken } = useContext(UserProfileContext);

  return (
    <div className="Dashboard container">
      <div className="row">
        <div className="col-md">
          I will hold the chart
          <DashboardExpensePieChart />
        </div>
        <div className="col-md">
          I will hold the expense list
          <DashboardExpenseList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
