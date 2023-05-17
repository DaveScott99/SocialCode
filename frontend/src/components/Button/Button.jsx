import React from "react";

import './Button.css'

export default function Button({ type, text, onClick, disabled, className }){
    return(
        <button 
        type={type}
        text={text}
        onClick={onClick}
        disabled={disabled}
        className={className}
        >
            {text}
        </button>
    )
}
