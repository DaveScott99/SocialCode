import React from "react";

export default function Input({name, type, placeholder, onChange, className}) {
    return (
        <input 
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            className={className}
        />
    );
}