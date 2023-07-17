import React from "react";
import Nav from "../Nav/Nav";
import Footer from "../Footer";

import { Header, Main, Wrapper } from "./LayoutStyles";

export default function Layout({ children }) {
  return (
    <Wrapper>
      <Main>
        <Header>
          <Nav />
        </Header>

        {children}

        <Footer />

      </Main>
    </Wrapper>
  );
}
