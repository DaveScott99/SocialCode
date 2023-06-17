import React from "react";
import { CustomTextField, FieldName, InputTextField } from "./TextFieldStyles";

export default function TextField({ type, fieldName, value, name, onChange }) {
    return (
        <CustomTextField>
            <InputTextField type={type} required value={value} name={name} onChange={onChange}/>
            <FieldName>{fieldName}</FieldName>
        </CustomTextField>
    );
};