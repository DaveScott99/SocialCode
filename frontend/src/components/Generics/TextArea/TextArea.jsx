import React from "react";
import { FieldNameTextArea, TextAreaContainer, TextAreaInput } from "./TextAreaStyles";

export default function TextArea({ name, fieldName, onChange, valueDefault, 
                                   placeholder, padding, background, border,
                                   height }) {

    const handleResize = (event) => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    }

    return (
        <TextAreaContainer>
            <TextAreaInput 
                name={name}
                onChange={onChange} 
                onInput={handleResize}
                value={valueDefault}
                placeholder={placeholder}
                padding={padding}
                background={background}
                border={border}
                height={height}
                required
            />
            <FieldNameTextArea>{fieldName}</FieldNameTextArea>
        </TextAreaContainer>
    );
};