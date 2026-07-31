import React, { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "./Sales.css";

function Sales() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [saleData, setSaleData] = useState({
        product_id: "",
        quantity_sold: "",
    });

    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
    api
        .get("/products")
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));
};  
    const handleProductChange = (e) => {
        const id = Number(e.target.value);

        const product = products.find((p) => p.id === id);

        setSelectedProduct(product);

        setSaleData({
            ...saleData,
            product_id: id,
        });
    };

    const handleQuantityChange = (e) => {
        setSaleData({
            ...saleData,
            quantity_sold: e.target.value,
        });
    };

    const total =
        selectedProduct && saleData.quantity_sold ?
        Number(selectedProduct.price) * Number(saleData.quantity_sold) :
        0;

    // ===========================
    // PDF Invoice
    // ===========================

    const generateInvoice = (product, quantity, totalAmount) => {
        const doc = new jsPDF();

        const invoiceNo = Math.floor(Math.random() * 100000);
        const now = new Date();

        doc.setFontSize(22);
        doc.text("GENERAL STORE", 60, 20);

        doc.setFontSize(14);
        doc.text("SALES INVOICE", 73, 30);

        doc.line(20, 35, 190, 35);

        doc.setFontSize(12);

        doc.text(`Invoice No : INV-${invoiceNo}`, 20, 50);
        doc.text(`Date : ${now.toLocaleDateString()}`, 20, 60);
        doc.text(`Time : ${now.toLocaleTimeString()}`, 20, 70);

        doc.line(20, 80, 190, 80);

        doc.text(`Product : ${product.name}`, 20, 95);
        doc.text(`Category : ${product.category}`, 20, 105);
        doc.text(`Price : ₹${Number(product.price).toFixed(2)}`, 20, 115);
        doc.text(`Quantity : ${quantity}`, 20, 125);

        doc.line(20, 135, 190, 135);

        doc.setFontSize(16);
        doc.text(
            `TOTAL AMOUNT : ₹${Number(totalAmount).toFixed(2)}`,
            20,
            150
        );

        doc.line(20, 160, 190, 160);

        doc.setFontSize(12);
        doc.text("Thank You For Shopping With Us!", 50, 180);

        doc.save(`Invoice_${invoiceNo}.pdf`);
    };

    // ===========================
    // Submit Sale
    // ===========================

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        api
    .post("/sales", {
                product_id: Number(saleData.product_id),
                quantity_sold: Number(saleData.quantity_sold),
            })
            .then((res) => {
                toast.success(
                    `🎉 Sale Recorded Successfully!\nBill Amount: ₹${res.data.total_amount}`
                );

                generateInvoice(
                    selectedProduct,
                    Number(saleData.quantity_sold),
                    res.data.total_amount
                );

                setSaleData({
                    product_id: "",
                    quantity_sold: "",
                });

                setSelectedProduct(null);

                fetchProducts();
            })
            .catch((err) => {
                console.log(err);

                if (
                    err.response &&
                    err.response.data &&
                    err.response.data.error
                ) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error("Unable to Record Sale");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return ( <
        div className = "sales-container" >

        <
        div className = "sales-header" >
        <
        div >
        <
        h2 > 🛒Sales Management < /h2> <
        p > Record product sales and generate bill < /p> <
        /div> <
        /div>

        <
        form className = "sales-form"
        onSubmit = { handleSubmit } >

        <
        select value = { saleData.product_id }
        onChange = { handleProductChange }
        required >
        <
        option value = "" > Select Product < /option>

        {
            products.map((product) => ( <
                option key = { product.id }
                value = { product.id } >
                { product.name }(Stock: { product.quantity }) <
                /option>
            ))
        } <
        /select>

        <
        input type = "number"
        min = "1"
        placeholder = "Quantity"
        required value = { saleData.quantity_sold }
        onChange = { handleQuantityChange }
        />

        {
            selectedProduct && ( <
                div className = "bill-card" >

                <
                h3 > 🧾Bill Summary < /h3>

                <
                div className = "bill-details" >

                <
                div className = "bill-row" >
                <
                span > Product < /span> <
                strong > { selectedProduct.name } < /strong> <
                /div>

                <
                div className = "bill-row" >
                <
                span > Category < /span> <
                strong > { selectedProduct.category } < /strong> <
                /div>

                <
                div className = "bill-row" >
                <
                span > Price < /span> <
                strong > ₹{ Number(selectedProduct.price).toFixed(2) } <
                /strong> <
                /div>

                <
                div className = "bill-row" >
                <
                span > Available Stock < /span> <
                strong > { selectedProduct.quantity } < /strong> <
                /div>

                <
                div className = "bill-row" >
                <
                span > Quantity < /span> <
                strong > { saleData.quantity_sold || 0 } < /strong> <
                /div>

                <
                hr / >

                <
                div className = "bill-total" >
                <
                span > Total Amount < /span> <
                h2 > ₹{ total.toFixed(2) } < /h2> <
                /div>

                <
                /div>

                <
                /div>
            )
        }

        <
        button className = "sale-btn"
        type = "submit"
        disabled = { loading } >
        { loading ? "Recording..." : "💳 Record Sale" } <
        /button>

        <
        /form>

        <
        /div>
    );
}

export default Sales;