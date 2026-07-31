import React, { useState } from "react";
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaChartBar,
  FaHistory,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

import "./Sidebar.css";

function Sidebar({ onLogout }) {

  const [open, setOpen] = useState(false);

  return (
    <>

      <button
        className="toggle-btn"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`sidebar ${open ? "open" : ""}`}
      >

        <h2 className="logo">
          🛒 Store
        </h2>

        <ul>

          <li>
            <NavLink
              to="/"
              className="nav-link"
              onClick={() => setOpen(false)}
            >
              <FaHome />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/products"
              className="nav-link"
              onClick={() => setOpen(false)}
            >
              <FaBox />
              <span>Products</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/sales"
              className="nav-link"
              onClick={() => setOpen(false)}
            >
              <FaShoppingCart />
              <span>Sales</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/reports"
              className="nav-link"
              onClick={() => setOpen(false)}
            >
              <FaChartBar />
              <span>Reports</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/history"
              className="nav-link"
              onClick={() => setOpen(false)}
            >
              <FaHistory />
              <span>Sales History</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/settings"
              className="nav-link"
              onClick={() => setOpen(false)}
            >
              <FaCog />
              <span>Settings</span>
            </NavLink>
          </li>

        </ul>

        <button
          className="logout"
          onClick={onLogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </aside>

    </>
  );
}

export default Sidebar;