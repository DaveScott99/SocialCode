import React from "react";
import { CustomButton } from "./ButtonStyles";

export function Button({ children, onClick, type, disabled, width, background, padding, 
                         borderradius, fontcolor, fontWeight, fontSize, hoverbackground,
                         position, top, bottom, left, right, justify }){
    return(
        <CustomButton 
            onClick={onClick}
            type={type}
            disabled={disabled}
            width={width}
            background={background}
            padding={padding}
            borderradius={borderradius}
            fontcolor={fontcolor}
            fontWeight={fontWeight}
            fontSize={fontSize}
            hoverbackground={hoverbackground}
            position={position}
            left={left}
            top={top}
            right={right}
            bottom={bottom}
            justify={justify}
        >
            {children}
        </CustomButton>
    )
}
