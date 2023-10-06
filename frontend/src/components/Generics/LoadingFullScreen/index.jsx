import React from "react";
import { Container, Logo } from "./styles";
import { BiTerminal } from "react-icons/bi";

const LoadingFullScreen = () => {
  return (
    <Container>
      <Logo>
        <BiTerminal />
      </Logo>
    </Container>
  );
};

export default LoadingFullScreen;
