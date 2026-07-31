import React, { useState, useEffect } from "react";
import "./Dashboard.css";

import {
  FaBoxOpen,
  FaShoppingCart,
  FaRupeeSign,
  FaExclamationTriangle,
} from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

import { getDashboard } from "./services/dashboardService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {

  const [dashboard, setDashboard] = useState({
    products: 0,
    revenue: 0,
    sales: 0,
    low_stock: 0,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const fetchDashboard = async () => {

    try {

      setLoading(true);

      setError(false);

      const data = await getDashboard();

      setDashboard(data);

    } catch (err) {

      console.log(err);

      setError(true);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchDashboard();

  }, []);

  const salesData = {

    labels: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ],

    datasets: [
      {

        label: "Sales",

        data: [
          5,
          8,
          6,
          11,
          9,
          13,
          dashboard.sales,
        ],

        backgroundColor: "#2563eb",

        borderRadius: 8,

        borderSkipped: false,

      },
    ],
  };

  const salesOptions = {

    responsive: true,

    plugins: {

      legend: {

        display: false,

      },

    },

    scales: {

      y: {

        beginAtZero: true,

        grid: {

          color: "#eef2f7",

        },

      },

      x: {

        grid: {

          display: false,

        },

      },

    },

  };

  const categoryData = {

    labels: [

      "Products",

      "Sales",

      "Low Stock",

    ],

    datasets: [

      {

        data: [

          dashboard.products,

          dashboard.sales,

          dashboard.low_stock,

        ],

        backgroundColor: [

          "#2563eb",

          "#10b981",

          "#ef4444",

        ],

        borderWidth: 0,

      },

    ],

  };

  const categoryOptions = {

    responsive: true,

    cutout: "70%",

    plugins: {

      legend: {

        position: "bottom",

      },

    },

  };

  if (loading) {

    return (

      <div className="dashboard">

        <h2>Loading Dashboard...</h2>

      </div>

    );

  }

  if (error) {

    return (

      <div className="dashboard">

        <h2>Unable to load dashboard.</h2>

        <button onClick={fetchDashboard}>
          Retry
        </button>

      </div>

    );

  }

  return (

    <div className="dashboard">

      <div className="dashboard-header">

        <div>

          <h1>Dashboard</h1>

          <p>
            Welcome back, Admin. Here's today's overview.
          </p>

        </div>

      </div>

      <div className="dashboard-cards">

        <div className="card">

          <div className="card-icon blue">

            <FaBoxOpen />

          </div>

          <div className="card-info">

            <span>Total Products</span>

            <h2>{dashboard.products}</h2>

          </div>

        </div>

        <div className="card">

          <div className="card-icon green">

            <FaRupeeSign />

          </div>

          <div className="card-info">

            <span>Total Revenue</span>

            <h2>₹{dashboard.revenue}</h2>

          </div>

        </div>

        <div className="card">

          <div className="card-icon orange">

            <FaShoppingCart />

          </div>

          <div className="card-info">

            <span>Total Sales</span>

            <h2>{dashboard.sales}</h2>

          </div>

        </div>

        <div className="card">

          <div className="card-icon red">

            <FaExclamationTriangle />

          </div>

          <div className="card-info">

            <span>Low Stock</span>

            <h2>{dashboard.low_stock}</h2>

          </div>

        </div>

      </div>
            {/* Charts */}

      <div className="dashboard-charts">

        <div className="chart-card">

          <div className="chart-header">

            <h3>Sales Overview</h3>

            <p>Weekly Performance</p>

          </div>

         <div style={{ height: "350px" }}>
  <Bar
    data={salesData}
    options={{
      ...salesOptions,
      maintainAspectRatio: false,
    }}
  />
</div>
        </div>

        <div className="chart-card">

          <div className="chart-header">

            <h3>Inventory Distribution</h3>

            <p>Current Store Status</p>

          </div>

          <Doughnut
            data={categoryData}
            options={categoryOptions}
          />

        </div>

      </div>

      {/* Bottom Section */}

      <div className="dashboard-bottom">

        <div className="activity-card">

          <h3>Recent Activity</h3>

          <ul>

            <li>✅ Inventory updated successfully</li>

            <li>🛒 New order received</li>

            <li>📦 Product stock modified</li>

            <li>💰 Revenue report generated</li>

            <li>📈 Sales increased today</li>

          </ul>

        </div>

        <div className="summary-card">

          <h3>Inventory Summary</h3>

          <div className="summary-row">

            <span>Total Products</span>

            <strong>{dashboard.products}</strong>

          </div>

          <div className="summary-row">

            <span>Total Sales</span>

            <strong>{dashboard.sales}</strong>

          </div>

          <div className="summary-row">

            <span>Total Revenue</span>

            <strong>₹{dashboard.revenue}</strong>

          </div>

          <div className="summary-row">

            <span>Low Stock</span>

            <strong>{dashboard.low_stock}</strong>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;