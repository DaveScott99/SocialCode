import React from "react";
import Nav from "../Nav/Nav";

import {
  Content,
  Header,
  Sentinel,
  Wrapper,
} from "./LayoutStyles";

export default function Layout({ children, backPath }) {
  return (
    <Wrapper>
      {/*
        <Sidebar />
      */}

      <Header>
        <Nav backPath={backPath} />
      </Header>

      <Content>
        {children}
        <Sentinel id="sentinel" />
      </Content>
    </Wrapper>
  );
}
