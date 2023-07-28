import React from "react";
import { FooterContainer, Logo } from "./styles";

import { BiTerminal } from "react-icons/bi";

export default function Footer() {
  return (
    <FooterContainer>
      <Logo>
        <BiTerminal />
        <span> &copy; 2023 SocialCode</span>
      </Logo>
    </FooterContainer>
  );
}
