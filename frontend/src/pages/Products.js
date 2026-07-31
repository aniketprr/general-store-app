import React from "react";

import InventorySummary from "../components/InventorySummary";
import ProductFilters from "../components/ProductFilters";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

import useProducts from "../hooks/useProducts";

import "./Products.css";

function Products({ searchTerm, setSearchTerm }) {
    const {
        loading,
        error,
        filteredProducts,
        fetchProducts,
        formData,
        handleChange,
        handleSubmit,
        editMode,
        handleEdit,
        handleDelete,
        categoryFilter,
        setCategoryFilter,
        totalProducts,
        totalCategories,
        totalStock,
        lowStock,
    } = useProducts(searchTerm);

    if (loading) {
    return <h2>Loading...</h2>;
}

    if (error) {
        return ( <
            div className = "products-container" >
            <
            h2 > Unable to load products. < /h2>

            <
            button className = "retry-btn"
            onClick = { fetchProducts } >
            Retry <
            /button> <
            /div>
        );
    }

 return (
  <div className="products-container">

    <div className="products-header">
      <div>
        <h2>📦 Inventory Management</h2>
        <p>Manage your products, stock and pricing</p>
      </div>
    </div>

    <InventorySummary
      totalProducts={totalProducts}
      totalCategories={totalCategories}
      totalStock={totalStock}
      lowStock={lowStock}
    />

    <ProductFilters
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      categoryFilter={categoryFilter}
      setCategoryFilter={setCategoryFilter}
    />

    <ProductForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      editMode={editMode}
    />

    <ProductTable
      filteredProducts={filteredProducts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />

  </div>
);
}

export default Products;
