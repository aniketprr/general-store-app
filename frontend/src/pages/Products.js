import React, { useEffect, useMemo, useState } from "react";
import {
    FaBox,
    FaBoxes,
    FaExclamationTriangle,
    FaSearch,
    FaTag,
} from "react-icons/fa";

import { toast } from "react-toastify";

import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
} from "../services/productService";

import ProductSkeleton from "../components/ProductSkeleton";

import "./Products.css";

function Products({ searchTerm, setSearchTerm }) {
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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

    const fetchProducts = async() => {
        try {
            setLoading(true);
            setError(false);

            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            console.error(err);
            setError(true);
            toast.error("Unable to load products");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setEditMode(false);
        setEditId(null);

        setFormData({
            product_name: "",
            category: "",
            quantity: "",
            price: "",
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const productData = {
            product_name: formData.product_name,
            category: formData.category,
            quantity: Number(formData.quantity),
            price: Number(formData.price),
        };

        try {
            if (editMode) {
                await updateProduct(editId, productData);
                toast.success("Product Updated Successfully");
            } else {
                await addProduct(productData);
                toast.success("Product Added Successfully");
            }

            resetForm();
            fetchProducts();
        } catch (err) {
            console.error(err);

            toast.error(
                editMode ?
                "Unable to update product" :
                "Unable to add product"
            );
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

    const handleDelete = async(id) => {
        if (!window.confirm("Delete this product?")) return;

        try {
            await deleteProduct(id);

            toast.success("Product Deleted Successfully");

            fetchProducts();
        } catch (err) {
            console.error(err);

            toast.error("Unable to delete product");
        }
    };

    const filteredProducts = useMemo(() => {
        return products
            .filter((product) =>
                product[1]
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .filter((product) => {
                if (categoryFilter === "") return true;

                return product[2] === categoryFilter;
            });
    }, [products, searchTerm, categoryFilter]);

    const totalProducts = products.length;

    const totalCategories = [
        ...new Set(products.map((item) => item[2])),
    ].length;

    const totalStock = products.reduce(
        (sum, item) => sum + Number(item[3]),
        0
    );

    const lowStock = products.filter(
        (item) => Number(item[3]) < 10
    ).length;

    if (loading) {
        return <ProductSkeleton / > ;
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
            /button> < /
            div >
        );
    }
    return ( <
        div className = "products-container" >

        <
        div className = "products-header" >
        <
        div >
        <
        h2 > 📦Inventory Management < /h2> <
        p > Manage your products, stock and pricing < /p> < /
        div > <
        /div>

        { /* ---------- Statistics ---------- */ }

        <
        div className = "stats-grid" >

        <
        div className = "stat-card" >
        <
        div className = "stat-icon blue" >
        <
        FaBoxes / >
        <
        /div>

        <
        div >
        <
        span > Total Products < /span> <
        h3 > { totalProducts } < /h3> < /
        div > <
        /div>

        <
        div className = "stat-card" >
        <
        div className = "stat-icon green" >
        <
        FaTag / >
        <
        /div>

        <
        div >
        <
        span > Categories < /span> <
        h3 > { totalCategories } < /h3> < /
        div > <
        /div>

        <
        div className = "stat-card" >
        <
        div className = "stat-icon orange" >
        <
        FaBox / >
        <
        /div>

        <
        div >
        <
        span > Total Stock < /span> <
        h3 > { totalStock } < /h3> < /
        div > <
        /div>

        <
        div className = "stat-card" >
        <
        div className = "stat-icon red" >
        <
        FaExclamationTriangle / >
        <
        /div>

        <
        div >
        <
        span > Low Stock < /span> <
        h3 > { lowStock } < /h3> < /
        div > <
        /div>

        <
        /div>

        { /* ---------- Toolbar ---------- */ }

        <
        div className = "toolbar" >

        <
        div className = "search-box" >

        <
        FaSearch / >

        <
        input type = "text"
        placeholder = "Search products..."
        value = { searchTerm }
        onChange = {
            (e) => setSearchTerm(e.target.value)
        }
        />

        <
        /div>

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

        { /* ---------- Product Form ---------- */ }

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
        name = "price"
        placeholder = "Price"
        step = "0.01"
        value = { formData.price }
        onChange = { handleChange }
        required /
        >

        <
        button type = "submit" > { editMode ? "Update Product" : "Add Product" } <
        /button>

        <
        /form>

        { /* ---------- Product Table ---------- */ }

        <
        div className = "table-container" >

        <
        table className = "product-table" >

        <
        thead >

        <
        tr >

        <
        th > ID < /th>

        <
        th > Product < /th>

        <
        th > Category < /th>

        <
        th > Quantity < /th>

        <
        th > Price < /th>

        <
        th > Status < /th>

        <
        th > Actions < /th>

        <
        /tr>

        <
        /thead>

        <
        tbody >

        {
            filteredProducts.length === 0 ? ( <
                tr >

                <
                td colSpan = "7"
                className = "empty-state" >
                No Products Found <
                /td>

                <
                /tr>
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
                    td > ₹{ Number(product[4]).toFixed(2) } <
                    /td>

                    <
                    td > {
                        Number(product[3]) < 10 ? ( <
                            span className = "low-stock" >
                            Low Stock <
                            /span>
                        ) : ( <
                            span className = "in-stock" >
                            In Stock <
                            /span>
                        )
                    } <
                    /td>

                    <
                    td className = "action-buttons" >
                    <
                    button className = "edit-btn"
                    onClick = {
                        () => handleEdit(product)
                    } >
                    Edit <
                    /button>

                    <
                    button className = "delete-btn"
                    onClick = {
                        () => handleDelete(product[0])
                    } >
                    Delete <
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