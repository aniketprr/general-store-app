import "./App.css";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import SalesChart from "./SalesChart";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import SalesHistory from "./pages/SalesHistory";
import Login from "./pages/Login";
import Settings from "./pages/Settings";

function App() {
    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem("loggedIn") === "true"
    );

    const [activePage, setActivePage] = useState("dashboard");

    // Search State
    const [searchTerm, setSearchTerm] = useState("");

    const handleLogin = () => {
        localStorage.setItem("loggedIn", "true");
        setLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("loggedIn");
        setLoggedIn(false);
    };
    // Login disabled temporarily for public demo
    // if (!loggedIn) {
    //   return <Login onLogin = { handleLogin }
    //  />;
}

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
    Navbar onLogout = { handleLogout }
    searchTerm = { searchTerm }
    setSearchTerm = { setSearchTerm }
    />

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
            />
        )
    }

    { activePage === "sales" && < Sales / > }

    { activePage === "reports" && < Reports / > }

    { activePage === "history" && < SalesHistory / > }

    { activePage === "settings" && < Settings / > } <
    /div>

    <
    /div>
);
}

export default App;