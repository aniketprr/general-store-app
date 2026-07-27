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
            .get("http://127.0.0.1:5000/sales")
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
        th > Total < /th> <
        /tr> <
        /thead>

        <
        tbody >

        {
            sales.map((sale) => (

                <
                tr key = { sale[0] } >

                <
                td > INV - { sale[0] } < /td>

                <
                td > { sale[1] } < /td>

                <
                td > { sale[2] } < /td>

                <
                td > { sale[3] } < /td>

                <
                td > ₹{ Number(sale[4]).toFixed(2) } < /td>

                <
                /tr>

            ))
        }

        <
        /tbody>

        <
        /table>

        <
        /div>
    );
}

export default SalesHistory;