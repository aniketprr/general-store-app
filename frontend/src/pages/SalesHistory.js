import React, { useEffect, useState } from "react";
import axios from "axios";
//import "./SalesHistory.css";

function SalesHistory() {

    const [sales, setSales] = useState([]);

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = () => {
        axios
            .get("https://general-store-app-2.onrender.com/sales")
            .then((res) => {
                setSales(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return ( <
        div className = "history-container" >

        <
        h2 > 🧾Sales History < /h2>

        <
        table className = "history-table" >

        <
        thead >
        <
        tr >
        <
        th > Invoice < /th> <
        th > Product < /th> <
        th > Category < /th> <
        th > Quantity < /th> <
        th > Total < /th> < /
        tr > <
        /thead>

       <tbody>

  {sales.map((sale) => (

    <tr key={sale.sale_id}>

      <td>INV-{sale.sale_id}</td>

      <td>{sale.product_name}</td>

      <td>{sale.category}</td>

      <td>{sale.quantity_sold}</td>

      <td>₹{Number(sale.total_amount).toFixed(2)}</td>

    </tr>

  ))}

</tbody>

        <
        /table>

        <
        /div>
    );
}

export default SalesHistory;