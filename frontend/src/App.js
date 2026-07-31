import React, { useState } from "react";
import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./Navbar";

import Dashboard from "./Dashboard";

import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import SalesHistory from "./pages/SalesHistory";
import Settings from "./pages/Settings";

function DashboardPage() {
  return <Dashboard />;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {};

  return (
    <BrowserRouter>
      <div className="app">

        <Sidebar onLogout={handleLogout} />

        <div className="main-content">

          <Navbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <Routes>

            <Route
              path="/"
              element={<DashboardPage />}
            />

            <Route
              path="/products"
              element={
                <Products
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              }
            />

            <Route
              path="/sales"
              element={<Sales />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

            <Route
              path="/history"
              element={<SalesHistory />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;