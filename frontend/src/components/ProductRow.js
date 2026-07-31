import React from "react";

function ProductRow({
  product,
  handleEdit,
  handleDelete,
}) {
  return (
    <tr>

      <td>{product.id}</td>

      <td>
        <strong>{product.name}</strong>
      </td>

      <td>{product.category}</td>

      <td>{product.quantity}</td>

      <td>₹{Number(product.price).toFixed(2)}</td>

      <td>
        {product.quantity < 10 ? (
          <span className="low-stock">
            Low Stock
          </span>
        ) : (
          <span className="in-stock">
            In Stock
          </span>
        )}
      </td>

      <td className="action-buttons">

        <button
          className="edit-btn"
          onClick={() => handleEdit(product)}
        >
          ✏ Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => handleDelete(product.id)}
        >
          🗑 Delete
        </button>

      </td>

    </tr>
  );
}

export default ProductRow;