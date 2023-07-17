import React from "react";
import { FooterContainer, Links, Logo } from "./styles";

import { BiTerminal } from "react-icons/bi";

export default function Footer() {
    return (
        <FooterContainer id="sentinel">

            <Logo>
                <BiTerminal />
                <span> &copy; 2023 SocialCode</span>
            </Logo>

            <Links>
                <li>Contato</li>
                <li>GitHub</li>
                <li>Sobre</li>
            </Links>

        </FooterContainer>
    )
}