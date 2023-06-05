import React from "react";

export default function Input({name, type, placeholder, onChange, className, disabled, value, onClick}) {
    return (
        <input 
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            className={className}
            disabled={disabled}
            value={value}
            onClick={onClick}
        />
    );
}