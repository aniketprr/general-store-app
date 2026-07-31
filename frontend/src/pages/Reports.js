import React, { useEffect, useState } from "react";
import api from "../services/api";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import "./Reports.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Reports() {

  const [dashboard, setDashboard] = useState({
    products: 0,
    revenue: 0,
    profit: 0,
    sales: 0,
    low_stock: 0,
  });

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => setDashboard(res.data))
      .catch((err) => console.log(err));
  }, []);

  const doughnutData = {
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

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="reports-container">

      <h1>📊 Reports & Analytics</h1>

      <div className="report-cards">

        <div className="report-card">
          <h3>Total Products</h3>
          <h2>{dashboard.products}</h2>
        </div>

        <div className="report-card">
          <h3>Total Sales</h3>
          <h2>{dashboard.sales}</h2>
        </div>

        <div className="report-card">
          <h3>Total Revenue</h3>
          <h2>₹{dashboard.revenue}</h2>
        </div>

        <div className="report-card">
          <h3>Total Profit</h3>
          <h2>₹{dashboard.profit}</h2>
        </div>

        <div className="report-card">
          <h3>Low Stock</h3>
          <h2>{dashboard.low_stock}</h2>
        </div>

      </div>

      <div className="chart-card">

        <h2>Store Performance</h2>

        <div className="chart-wrapper">

          <Doughnut
            data={doughnutData}
            options={doughnutOptions}
          />

        </div>

      </div>

    </div>
  );
}

export default Reports;