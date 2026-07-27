import React, { useState } from "react";
import "./Settings.css";

function Settings() {
    const [store, setStore] = useState({
        name: "General Store",
        address: "Mumbai, India",
        phone: "+91 9876543210",
        currency: "₹",
    });

    const handleChange = (e) => {
        setStore({
            ...store,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        alert("Settings Saved Successfully!");
    };

    return ( <
        div className = "settings-container" >

        <
        h2 > ⚙️Store Settings < /h2>

        <
        div className = "settings-card" >

        <
        label > Store Name < /label> <
        input type = "text"
        name = "name"
        value = { store.name }
        onChange = { handleChange }
        />

        <
        label > Store Address < /label> <
        input type = "text"
        name = "address"
        value = { store.address }
        onChange = { handleChange }
        />

        <
        label > Contact Number < /label> <
        input type = "text"
        name = "phone"
        value = { store.phone }
        onChange = { handleChange }
        />

        <
        label > Currency < /label> <
        input type = "text"
        name = "currency"
        value = { store.currency }
        onChange = { handleChange }
        />

        <
        button onClick = { handleSave } > 💾Save Settings <
        /button>

        <
        /div>

        <
        /div>
    );
}

export default Settings;