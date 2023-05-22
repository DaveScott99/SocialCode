import React, { useState } from "react";

export default function Textarea({ placeholder, className }) {

    const [text, setText] = useState();

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleResize = (event) => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    }

    return (
        <textarea
            value={text}
            onChange={handleChange}
            onInput={handleResize}
            placeholder={placeholder}
            className={className}
        />
    )
}