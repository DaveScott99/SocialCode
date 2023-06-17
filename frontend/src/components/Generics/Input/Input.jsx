import React from "react";

import { InputCustom } from "./InputStyles";

export default function Input({name, type, placeholder, onChange, className, disabled, value, onClick}) {
    return (
        <InputCustom 
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    );
}