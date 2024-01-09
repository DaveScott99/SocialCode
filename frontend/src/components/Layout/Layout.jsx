import React from "react";
import Nav from "../Nav/Nav";

import {
  Aside,
  AsideAbsolute,
  AsideButton,
  Content,
  Header,
  Logo,
  Main,
  NavAside,
  NavAsideAbsolute,
  Overlay,
  PlataformName,
  Sentinel,
  Wrapper,
} from "./LayoutStyles";
import { Link } from "react-router-dom";
import { BiTerminal } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

export default function Layout({
  children,
  backPath,
  asideItens,
  asideItensAbsolute,
}) {
  const [expandAside, setExpandAside] = useState(false);

  const [expandAsideAbsolute, setExpandAsideAbsolute] = useState(false);

  return (
    <Wrapper>
      <Header>
        {/*asideItens ? (
          <AsideButton onClick={() => setExpandAside(!expandAside)}>
            <RxHamburgerMenu />
          </AsideButton>
        ) : null}

        {asideItensAbsolute ? (
          <AsideButton
            onClick={() => setExpandAsideAbsolute(!expandAsideAbsolute)}
          >
            <RxHamburgerMenu />
          </AsideButton>
        ) : null*/}

        <Logo>
            <BiTerminal />
            <PlataformName>SocialCode</PlataformName>
        </Logo>

        <Nav backPath={backPath} />
      </Header>

      <Main>
        <Content>
          {children}
          <Sentinel id="sentinel" />
        </Content>
        {/*asideItens ? (
          <Aside expand={expandAside}>
            <NavAside expand={expandAside}>{asideItens}</NavAside>
          </Aside>
        ) : null}

        { asideItensAbsolute ? (
          <Overlay expand={expandAsideAbsolute} onClick={() => setExpandAsideAbsolute(!expandAsideAbsolute)}>
            <AsideAbsolute>
              <NavAsideAbsolute>
                {asideItensAbsolute}
              </NavAsideAbsolute>
            </AsideAbsolute>
          </Overlay>
        ) : null*/}
      </Main>
    </Wrapper>
  );
}
