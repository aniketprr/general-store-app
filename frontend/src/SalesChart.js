import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function SalesChart() {
    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
            label: "Sales",
            data: [500, 700, 400, 900, 650, 1200, 800],
            backgroundColor: "#2563eb",
        }, ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return ( <
        div style = {
            {
                width: "90%",
                margin: "30px auto",
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,.1)",
            }
        } >
        <
        h2 > Weekly Sales < /h2> <
        Bar data = { data }
        options = { options }
        /> <
        /div>
    );
}

export default SalesChart;