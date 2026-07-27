import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Products.css";

function Products({ searchTerm }) {
    const [products, setProducts] = useState([]);

    const [categoryFilter, setCategoryFilter] = useState("");

    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        product_name: "",
        category: "",
        quantity: "",
        price: "",
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios
            .get("https://general-store-app-2.onrender.com/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const productData = {
            product_name: formData.product_name,
            category: formData.category,
            quantity: Number(formData.quantity),
            price: Number(formData.price),
        };

        if (editMode) {
            axios
                .put(`https://general-store-app-2.onrender.com/products/${editId}`, productData)
                .then(() => {
                    toast.success("Product Updated Successfully!");

                    setEditMode(false);
                    setEditId(null);

                    setFormData({
                        product_name: "",
                        category: "",
                        quantity: "",
                        price: "",
                    });

                    fetchProducts();
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Unable to update product");
                });
        } else {
            axios
                .post("https://general-store-app-2.onrender.com/products", productData)
                .then(() => {
                    toast.success("Product Added Successfully!");

                    setFormData({
                        product_name: "",
                        category: "",
                        quantity: "",
                        price: "",
                    });

                    fetchProducts();
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Unable to add product");
                });
        }
    };

    const handleEdit = (product) => {
        setEditMode(true);

        setEditId(product[0]);

        setFormData({
            product_name: product[1],
            category: product[2],
            quantity: product[3],
            price: product[4],
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleDelete = (id) => {
        if (!window.confirm("Delete this product?")) return;

        axios
            .delete(`https://general-store-app-2.onrender.com/products/${id}`)
            .then(() => {
                toast.success("Product Deleted Successfully!");
                fetchProducts();
            })
            .catch((err) => console.log(err));
    };

    const filteredProducts = products
        .filter((product) =>
            product[1].toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((product) => {
            if (categoryFilter === "") return true;
            return product[2] === categoryFilter;
        });

    return ( <
        div className = "products-container" >

        <
        div className = "products-header" >
        <
        div >
        <
        h2 > 📦Product Management < /h2> <
        p > Manage inventory, stock and pricing < /p> < /
        div > <
        /div>

        <
        div className = "top-controls" >

        <
        input type = "text"
        placeholder = "🔍 Search Product..."
        value = { searchTerm }
        readOnly /
        >

        <
        select value = { categoryFilter }
        onChange = {
            (e) => setCategoryFilter(e.target.value)
        } >
        <
        option value = "" > All Categories < /option> <
        option value = "Grocery" > Grocery < /option> <
        option value = "Snack" > Snack < /option> <
        option value = "Beverage" > Beverage < /option> <
        option value = "Dairy" > Dairy < /option> < /
        select >

        <
        /div>

        <
        form className = "product-form"
        onSubmit = { handleSubmit } >

        <
        input type = "text"
        name = "product_name"
        placeholder = "Product Name"
        value = { formData.product_name }
        onChange = { handleChange }
        required /
        >

        <
        input type = "text"
        name = "category"
        placeholder = "Category"
        value = { formData.category }
        onChange = { handleChange }
        required /
        >

        <
        input type = "number"
        name = "quantity"
        placeholder = "Quantity"
        value = { formData.quantity }
        onChange = { handleChange }
        required /
        >

        <
        input type = "number"
        step = "0.01"
        name = "price"
        placeholder = "Price"
        value = { formData.price }
        onChange = { handleChange }
        required /
        >

        <
        button type = "submit" > { editMode ? "✏ Update Product" : "➕ Add Product" } <
        /button>

        <
        /form>

        <
        div className = "table-container" >

        <
        table className = "product-table" >

        <
        thead >
        <
        tr >
        <
        th > ID < /th> <
        th > Product < /th> <
        th > Category < /th> <
        th > Quantity < /th> <
        th > Price(₹) < /th> <
        th > Status < /th> <
        th > Actions < /th> < /
        tr > <
        /thead>

        <
        tbody >

        {
            filteredProducts.length === 0 ? ( <
                tr >
                <
                td colSpan = "7"
                style = {
                    { textAlign: "center", padding: "30px" }
                } >
                No Products Found <
                /td> < /
                tr >
            ) : (
                filteredProducts.map((product) => ( <
                    tr key = { product[0] } >

                    <
                    td > { product[0] } < /td>

                    <
                    td > { product[1] } < /td>

                    <
                    td > { product[2] } < /td>

                    <
                    td > { product[3] } < /td>

                    <
                    td > ₹{ Number(product[4]).toFixed(2) } < /td>

                    <
                    td > {
                        product[3] < 10 ? ( <
                            span className = "low-stock" > 🔴Low Stock < /span>
                        ) : ( <
                            span className = "in-stock" > 🟢In Stock < /span>
                        )
                    } <
                    /td>

                    <
                    td className = "action-buttons" >

                    <
                    button className = "edit-btn"
                    onClick = {
                        () => handleEdit(product)
                    } > ✏Edit <
                    /button>

                    <
                    button className = "delete-btn"
                    onClick = {
                        () => handleDelete(product[0])
                    } > 🗑Delete <
                    /button>

                    <
                    /td>

                    <
                    /tr>
                ))
            )
        }

        <
        /tbody>

        <
        /table>

        <
        /div>

        <
        /div>
    );
}

export default Products;