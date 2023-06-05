import React from "react";

import "./TextField.css";

export default function TextField({ type, fieldName, value, name, onChange }) {
    return (

        <div className="input-box">
            <input type={type} required value={value} name={name} onChange={onChange}/>
            <span>{fieldName}</span>
        </div>
        
    );
};