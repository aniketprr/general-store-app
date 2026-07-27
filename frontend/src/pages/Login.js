import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin = () => {} }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === "admin" && password === "admin123") {
            localStorage.setItem("loggedIn", "true");
            onLogin();
        } else {
            alert("Invalid Username or Password");
        }
    };

    return ( <
        div className = "login-page" >
        <
        div className = "login-card" >
        <
        h1 > 🛒General Store < /h1> <
        p > Store Management System < /p>

        <
        form onSubmit = { handleSubmit } >
        <
        input type = "text"
        placeholder = "Username"
        value = { username }
        onChange = {
            (e) => setUsername(e.target.value) }
        />

        <
        input type = "password"
        placeholder = "Password"
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value) }
        />

        <
        button type = "submit" > Login < /button> <
        /form> <
        /div> <
        /div>
    );
}

export default Login;