import React from "react";
import Nav from "../Nav/Nav";

import {
  Aside,
  AsideButton,
  Content,
  Header,
  Logo,
  Main,
  NavAside,
  PlataformName,
  Sentinel,
  Wrapper,
} from "./LayoutStyles";
import { Link } from "react-router-dom";
import { BiTerminal } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

export default function Layout({ children, backPath, asideItens }) {
  const [expandAside, setExpandAside] = useState(false);

  return (
    <Wrapper>
      <Header>
        {asideItens ? (
          <AsideButton onClick={() => setExpandAside(!expandAside)}>
            <RxHamburgerMenu />
          </AsideButton>
        ) : null}

        <Logo>
          <Link to="/">
            <BiTerminal />
            <PlataformName>SocialCode</PlataformName>
          </Link>
        </Logo>

        <Nav backPath={backPath} />
      </Header>

      <Main>
        <Content>
          {children}
          <Sentinel id="sentinel" />
        </Content>
        {asideItens ? (
          <Aside expand={expandAside}>
            <NavAside expand={expandAside}>{asideItens}</NavAside>
          </Aside>
        ) : null}
      </Main>
    </Wrapper>
  );
}
