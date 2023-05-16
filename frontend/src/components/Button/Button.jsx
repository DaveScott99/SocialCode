import React from "react";

import './Button.css'

export default function Button({ type, text, onClick, disable }){
    return(
        <button 
        type={type}
        text={text}
        onClick={onClick}
        disable={disable}
        className="button"
        >
            {text}
        </button>
    )
}
