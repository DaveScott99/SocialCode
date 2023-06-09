import React from "react";

import "./TextArea.css";

export default function TextArea({ name, fieldName, onChange, valueDefault }) {

    const handleResize = (event) => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    }

    return (
        <div className="text-area-box">
            <textarea 
                name={name}
                className="text-area" 
                onChange={onChange} 
                onInput={handleResize}
                value={valueDefault}
                required
            />

            <span>{fieldName}</span>
        </div>
    );
};