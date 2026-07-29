import React from "react";
import "./Navbar.css";
import { FaBell, FaStore } from "react-icons/fa";

function Navbar({ searchTerm, setSearchTerm }) {

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
        h2 >
        <
        FaStore style = {
            { marginRight: "10px" } }
        />
        General Store Management <
        /h2> <
        p > { today } < /p>

        <
        /div>

        <
        div className = "navbar-right" >

        <
        input type = "text"
        placeholder = "🔍 Search Products..."
        value = { searchTerm }
        onChange = {
            (e) => setSearchTerm(e.target.value) }
        />

        <
        div className = "notification" >
        <
        FaBell / >
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
        small > Store Manager < /small> <
        /div>

        <
        /div>

        <
        /div>

        <
        /div>
    );
}

export default Navbar;