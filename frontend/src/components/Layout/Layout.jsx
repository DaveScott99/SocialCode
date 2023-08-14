import React from "react";
import Nav from "../Nav/Nav";

import {
  Aside,
  Content,
  Header,
  Main,
  Sentinel,
  Wrapper,
} from "./LayoutStyles";

export default function Layout({ children, backPath, asideItens }) {
  return (
    <Wrapper>
      <Header>
        <Nav backPath={backPath} />
      </Header>

      <Main>
        <Content>
          {children}
          <Sentinel id="sentinel" />
        </Content>
        {
          asideItens ?
            <Aside>{asideItens}</Aside>
          : null

        }
      </Main>
    </Wrapper>
  );
}
