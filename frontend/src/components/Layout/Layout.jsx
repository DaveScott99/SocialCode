import React from "react";
import Nav from "../Nav/Nav";
import Sidebar from "../Sidebar";

import { Content, ContentContainer, Header, Main, Sentinel, Wrapper } from "./LayoutStyles";

export default function Layout({ children }) {
  return (
    <Wrapper>
      <Main>
        {/*

      */}

        <Sidebar />

        <ContentContainer>
          <Header>
            <Nav />
          </Header>

          <Content>
            {children}
            <Sentinel id="sentinel" />
          </Content>
          
        </ContentContainer>

      </Main>
    </Wrapper>
  );
}
