import React, { useEffect, useState } from "react";
import {
    FaBoxOpen,
    FaRupeeSign,
    FaShoppingCart,
    FaExclamationTriangle,
} from "react-icons/fa";

import { getDashboard } from "./services/dashboardService";
import "./Dashboard.css";

function Dashboard() {
    const [dashboard, setDashboard] = useState({
        products: 0,
        revenue: 0,
        sales: 0,
        low_stock: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchDashboard = async() => {
        try {
            setLoading(true);
            setError(false);

            const data = await getDashboard();

            console.log("Dashboard Data:", data);

            setDashboard(data);
        } catch (err) {
            console.error("Dashboard Error:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (loading) {
        return ( <
            div className = "dashboard" >
            <
            h2 > Loading Dashboard... < /h2> <
            /div>
        );
    }

    if (error) {
        return ( <
            div className = "dashboard" >
            <
            h2 > Unable to load dashboard. < /h2>

            <
            button onClick = { fetchDashboard } >
            Retry <
            /button> <
            /div>
        );
    }

    return ( <
        div className = "dashboard" >
        <
        h1 > 📊Dashboard < /h1>

        <
        div className = "dashboard-cards" >

        <
        div className = "card products-card" >
        <
        div className = "card-icon" >
        <
        FaBoxOpen / >
        <
        /div>

        <
        div className = "card-details" >
        <
        p > Total Products < /p> <
        h2 > { dashboard.products } < /h2> <
        /div> <
        /div>

        <
        div className = "card revenue-card" >
        <
        div className = "card-icon" >
        <
        FaRupeeSign / >
        <
        /div>

        <
        div className = "card-details" >
        <
        p > Total Revenue < /p> <
        h2 > ₹{ dashboard.revenue } < /h2> <
        /div> <
        /div>

        <
        div className = "card sales-card" >
        <
        div className = "card-icon" >
        <
        FaShoppingCart / >
        <
        /div>

        <
        div className = "card-details" >
        <
        p > Total Sales < /p> <
        h2 > { dashboard.sales } < /h2> <
        /div> <
        /div>

        <
        div className = "card stock-card" >
        <
        div className = "card-icon" >
        <
        FaExclamationTriangle / >
        <
        /div>

        <
        div className = "card-details" >
        <
        p > Low Stock < /p> <
        h2 > { dashboard.low_stock } < /h2> <
        /div> <
        /div>

        <
        /div> <
        /div>
    );
}

export default Dashboard;