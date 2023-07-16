import React from "react";
import Nav from "../Nav/Nav";

import { Footer, Header, Main, Wrapper } from "./LayoutStyles";

export default function Layout({ children }) {
  return (
    <Wrapper>
      <Main>
        <Header>
          <Nav />
        </Header>

        {children}

        <Footer id="sentinel">Footer</Footer>
      </Main>
    </Wrapper>
  );
}
