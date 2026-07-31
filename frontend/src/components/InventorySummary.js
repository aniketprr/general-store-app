import React from "react";
import {
  FaBoxes,
  FaTag,
  FaBox,
  FaExclamationTriangle,
} from "react-icons/fa";

function InventorySummary({
  totalProducts,
  totalCategories,
  totalStock,
  lowStock,
}) {
  return (
    <div className="stats-grid">

      <div className="stat-card">
        <div className="stat-icon blue">
          <FaBoxes />
        </div>

        <div>
          <span>Total Products</span>
          <h3>{totalProducts}</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon green">
          <FaTag />
        </div>

        <div>
          <span>Categories</span>
          <h3>{totalCategories}</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon orange">
          <FaBox />
        </div>

        <div>
          <span>Total Stock</span>
          <h3>{totalStock}</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon red">
          <FaExclamationTriangle />
        </div>

        <div>
          <span>Low Stock</span>
          <h3>{lowStock}</h3>
        </div>
      </div>

    </div>
  );
}

export default InventorySummary;