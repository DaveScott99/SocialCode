import React, { useContext, useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx"
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { LineSeparator, SubMenuButton, SubMenuContainer, SubMenuContent, SubMenuItem } from "./SubMenuStyles";

export default function SubMenu() {

    const [showSubMenu, setShowSubMenu] = useState(false);
    const subMenuRef = useRef(null);

    const handleClickShowSubMenu = () => {
        setShowSubMenu(!showSubMenu);
    }

    const style = showSubMenu ? { display: 'block' } : { display: 'none' };

    useEffect(() => {
        const closeSubMenyOnClickOutside = (event) => {
            if (showSubMenu && !subMenuRef.current.contains(event.target)) {
                setShowSubMenu(false);
            }
        }
        
        document.addEventListener('mousedown', closeSubMenyOnClickOutside);

        return () => {
            document.removeEventListener('mousedown', closeSubMenyOnClickOutside);
        }

    }, [showSubMenu])

    const { logout } = useContext(AuthContext);

    return (
        <SubMenuContainer ref={subMenuRef}>

            <SubMenuButton onClick={handleClickShowSubMenu}>
                <RxHamburgerMenu />
            </SubMenuButton>

            <SubMenuContent style={style}>
                <LineSeparator />
                <SubMenuItem onClick={logout}>Sair</SubMenuItem>
            </SubMenuContent>

        </SubMenuContainer>
    );
} 