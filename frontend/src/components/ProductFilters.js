import React from "react";
import { FaSearch } from "react-icons/fa";

function ProductFilters({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
}) {
  return (
    <div className="toolbar">

      <div className="search-box">
        <FaSearch />

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Grocery">Grocery</option>
        <option value="Snack">Snack</option>
        <option value="Beverage">Beverage</option>
        <option value="Dairy">Dairy</option>
      </select>

    </div>
  );
}

export default ProductFilters;