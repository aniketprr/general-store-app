import React from "react";
import ProductRow from "./ProductRow";

function ProductTable({
  filteredProducts,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="table-container">

      <table className="product-table">

        <caption>📦 Inventory Product List</caption>

        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredProducts.length === 0 ? (

            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#666",
                  fontWeight: "600",
                }}
              >
                No Products Found
              </td>
            </tr>

          ) : (

            filteredProducts.map((product) => (

              <ProductRow
                key={product.id}
                product={product}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default ProductTable;