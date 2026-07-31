import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
} from "../services/productService";

export default function useProducts(searchTerm) {
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

    const fetchProducts = async () => {
    try {
        setLoading(true);
        setError(false);

        const data = await getProducts();

        console.log("API DATA:", data);

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

        setEditId(product.id);

        setFormData({
            product_name: product.name,
            category: product.category,
            quantity: product.quantity,
            price: product.price,
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
      (product.name || "")
        .toLowerCase()
        .includes((searchTerm || "").toLowerCase())
    )
    .filter((product) => {
      if (categoryFilter === "") return true;
      return product.category === categoryFilter;
    });
}, [products, searchTerm, categoryFilter]);
    const totalProducts = products.length;

    const totalCategories = [
        ...new Set(products.map((item) => item.category)),
    ].length;

    const totalStock = products.reduce(
        (sum, item) => sum + Number(item.quantity),
        0
    );

    const lowStock = products.filter(
        (item) => Number(item.quantity) < 10
    ).length;

    return {
        loading,
        error,

        products,
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
    };
}