import React, { Suspense, lazy, useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Navbar from "./Navbar";

const Dashboard = lazy(() =>
    import ("./Dashboard"));
const SalesChart = lazy(() =>
    import ("./SalesChart"));
const Products = lazy(() =>
    import ("./pages/Products"));
const Sales = lazy(() =>
    import ("./pages/Sales"));
const Reports = lazy(() =>
    import ("./pages/Reports"));
const SalesHistory = lazy(() =>
    import ("./pages/SalesHistory"));
const Settings = lazy(() =>
    import ("./pages/Settings"));

function App() {
    const [activePage, setActivePage] = useState("dashboard");
    const [searchTerm, setSearchTerm] = useState("");

    const handleLogout = () => {};

    return ( <
        div className = "app" >
        <
        Sidebar activePage = { activePage }
        setActivePage = { setActivePage }
        onLogout = { handleLogout }
        />

        <
        div className = "main-content" >
        <
        Navbar searchTerm = { searchTerm }
        setSearchTerm = { setSearchTerm }
        />

        <
        Suspense fallback = { < h2 style = {
                { padding: "30px" }
            } > Loading... < /h2>}>

            {
                activePage === "dashboard" && ( <
                    >
                    <
                    Dashboard / >
                    <
                    SalesChart / >
                    <
                    />
                )
            }

            {
                activePage === "products" && ( <
                    Products searchTerm = { searchTerm }
                    setSearchTerm = { setSearchTerm }
                    />
                )
            }

            { activePage === "sales" && < Sales / > }

            { activePage === "reports" && < Reports / > }

            { activePage === "history" && < SalesHistory / > }

            { activePage === "settings" && < Settings / > }

            <
            /Suspense> < /
            div > <
            /div>
        );
    }

    export default App;