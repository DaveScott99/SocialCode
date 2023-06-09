import React from "react";

import './Button.css'

export default function Button({ type, text, onClick, disabled, className, htmlFor }){
    return(
        <button 
        type={type}
        text={text}
        onClick={onClick}
        disabled={disabled}
        className={className}
        htmlFor={htmlFor}
        >
            {text}
        </button>
    )
}
