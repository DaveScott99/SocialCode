import React from "react";
import { Button } from "../Button/Button";
import Success from "../Success";

import { Container, Message, SucessContainer } from "./styles";
import { Link } from "react-router-dom";

export default function Dialog({ message, pagePath }) {

  return (
    <Container>

      <SucessContainer>
        <Success />
        <Message>{message}</Message>
      </SucessContainer>

      <Link to={pagePath}>
        <Button
          width={50}
          padding={10}
          borderradius={5}
          fontSize={1}
          fontWeight={600}
          justify="center"
        >
          Voltar
        </Button>
      </Link>

    </Container>
  );
}
