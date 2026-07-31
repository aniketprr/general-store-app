import React from "react";
import { FaPlus, FaEdit } from "react-icons/fa";

function ProductForm({
  formData,
  handleChange,
  handleSubmit,
  editMode,
}) {
  return (
    <div className="form-card">
      <h2 className="form-title">
        {editMode ? (
          <>
            <FaEdit /> Update Product
          </>
        ) : (
          <>
            <FaPlus /> Add New Product
          </>
        )}
      </h2>

      <form className="product-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="product_name"
            placeholder="Enter product name"
            value={formData.product_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            placeholder="Enter category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <button className="submit-btn" type="submit">
          {editMode ? (
            <>
              <FaEdit /> Update Product
            </>
          ) : (
            <>
              <FaPlus /> Add Product
            </>
          )}
        </button>

      </form>
    </div>
  );
}

export default ProductForm;