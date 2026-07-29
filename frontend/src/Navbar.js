import React, { useState, useEffect, useMemo } from "react";
import "./Navbar.css";
import { FaBell, FaStore } from "react-icons/fa";
import debounce from "lodash.debounce";

function Navbar({ searchTerm, setSearchTerm }) {
    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const [localSearch, setLocalSearch] = useState(searchTerm);

    useEffect(() => {
        setLocalSearch(searchTerm);
    }, [searchTerm]);

    const debouncedSearch = useMemo(
        () =>
        debounce((value) => {
            setSearchTerm(value);
        }, 300), [setSearchTerm]
    );

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    return ( <
        header className = "navbar" >
        <
        div className = "navbar-left" >
        <
        h2 >
        <
        FaStore style = {
            { marginRight: "10px" } }
        />
        General Store Management <
        /h2>

        <
        p > { today } < /p> <
        /div>

        <
        div className = "navbar-right" >
        <
        input type = "text"
        placeholder = "🔍 Search Products..."
        value = { localSearch }
        onChange = {
            (e) => {
                const value = e.target.value;
                setLocalSearch(value);
                debouncedSearch(value);
            }
        }
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
        div className = "avatar" > A < /div>

        <
        div >
        <
        h4 > Admin < /h4> <
        small > Store Manager < /small> <
        /div> <
        /div> <
        /div> <
        /header>
    );
}

export default Navbar;