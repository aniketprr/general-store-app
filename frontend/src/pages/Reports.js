import React, { useEffect, useState } from "react";
import api from "../services/api";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import "./Reports.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
        api.get("/dashboard")
            .then((res) => setDashboard(res.data))
            .catch((err) => console.log(err));
    }, []);

    const chartData = {
        labels: [
            "Products",
            "Sales",
            "Revenue",
            "Profit",
            "Low Stock",
        ],
        datasets: [{
            label: "Store Overview",
            data: [
                dashboard.products,
                dashboard.sales,
                dashboard.revenue,
                dashboard.profit,
                dashboard.low_stock,
            ],
            backgroundColor: [
                "#2563eb",
                "#10b981",
                "#f59e0b",
                "#8b5cf6",
                "#ef4444",
            ],
            borderRadius: 8,
        }, ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return ( <
        div className = "reports-container" >

        <
        h1 > 📊Reports & Analytics < /h1>

        <
        div className = "report-cards" >

        <
        div className = "report-card" >
        <
        h3 > Total Products < /h3> <
        h2 > { dashboard.products } < /h2> < /
        div >

        <
        div className = "report-card" >
        <
        h3 > Total Sales < /h3> <
        h2 > { dashboard.sales } < /h2> < /
        div >

        <
        div className = "report-card" >
        <
        h3 > Total Revenue < /h3> <
        h2 > ₹{ dashboard.revenue } < /h2> < /
        div >

        <
        div className = "report-card" >
        <
        h3 > Total Profit < /h3> <
        h2 > ₹{ dashboard.profit } < /h2> < /
        div >

        <
        div className = "report-card" >
        <
        h3 > Low Stock < /h3> <
        h2 > { dashboard.low_stock } < /h2> < /
        div >

        <
        /div>

        <
        div className = "chart-card" >

        <
        h2 > Store Performance < /h2>

        <
        /div>

        <
        /div>
    );
}

export default Reports;