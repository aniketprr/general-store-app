import React from "react";
import "./Navbar.css";

function Navbar() {

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return ( <
        div className = "navbar" >

        <
        div className = "navbar-left" >

        <
        h2 > 🛒General Store Management < /h2>

        <
        p > { today } < /p>

        <
        /div>

        <
        div className = "navbar-right" >

        <
        input type = "text"
        placeholder = "🔍 Search..." /
        >

        <
        div className = "notification" > 🔔
        <
        /div>

        <
        div className = "profile" >

        <
        div className = "avatar" >
        A <
        /div>

        <
        div >
        <
        h4 > Admin < /h4> <
        small > Store Manager < /small> < /
        div >

        <
        /div>

        <
        /div>

        <
        /div>
    );
}

export default Navbar;