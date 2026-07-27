import React, { useState } from "react";
import {
    FaHome,
    FaBox,
    FaShoppingCart,
    FaChartBar,
    FaHistory,
    FaCog,
    FaSignOutAlt,
    FaBars,
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar({ activePage, setActivePage, onLogout }) {
    const [collapsed, setCollapsed] = useState(false);

    return ( <
            >
            <
            button className = "toggle-btn"
            onClick = {
                () => setCollapsed(!collapsed)
            } >
            <
            FaBars / >
            <
            /button>

            <
            div className = { `sidebar ${collapsed ? "collapsed" : ""}` } >

            <
            h2 className = "logo" > 🛒{!collapsed && "Store" } <
            /h2>

            <
            ul >

            <
            li className = { activePage === "dashboard" ? "active" : "" }
            onClick = {
                () => setActivePage("dashboard")
            } >
            <
            FaHome / > {!collapsed && < span > Dashboard < /span>} < /
                li >

                <
                li
                className = { activePage === "products" ? "active" : "" }
                onClick = {
                    () => {
                        console.log("Products clicked");
                        setActivePage("products");
                    }
                } >
                <
                FaBox / > {!collapsed && < span > Products < /span>} < /
                    li >

                    <
                    li
                    className = { activePage === "sales" ? "active" : "" }
                    onClick = {
                        () => setActivePage("sales")
                    } >
                    <
                    FaShoppingCart / > {!collapsed && < span > Sales < /span>} < /
                        li >

                        <
                        li
                        className = { activePage === "reports" ? "active" : "" }
                        onClick = {
                            () => setActivePage("reports")
                        } >
                        <
                        FaChartBar / > {!collapsed && < span > Reports < /span>} < /
                            li >

                            <
                            li
                            className = { activePage === "history" ? "active" : "" }
                            onClick = {
                                () => setActivePage("history")
                            } >
                            <
                            FaHistory / > {!collapsed && < span > Sales History < /span>} < /
                                li >

                                <
                                li
                                className = { activePage === "settings" ? "active" : "" }
                                onClick = {
                                    () => setActivePage("settings") } >
                                <
                                FaCog / > {!collapsed && < span > Settings < /span>} <
                                    /li> <
                                    /ul>

                                    <
                                    button
                                    className = "logout"
                                    onClick = { onLogout } >
                                    <
                                    FaSignOutAlt / > {!collapsed && < span > Logout < /span>} < /
                                        button >

                                        <
                                        /div> < /
                                        >
                                    );
                                }

                                export default Sidebar;