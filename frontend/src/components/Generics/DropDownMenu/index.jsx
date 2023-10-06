import React from "react";

import { ContentSubMenu, DropDownContainer } from "./styled";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export default function DropDownMenu({ children, iconMenu }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

  useEffect(() => {
    const closeSubMenu = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', closeSubMenu);

    return () => {
      document.removeEventListener('mousedown', closeSubMenu);
    };
  }, []);

  return (
    <DropDownContainer>
      <div onClick={() => setIsOpen(!isOpen)}>{iconMenu}</div>

      {isOpen ? 
            <ContentSubMenu ref={dropDownRef}>
                { children }
            </ContentSubMenu>
        : null
      }
      
    </DropDownContainer>
  );
}
