import React from "react";
import { Button } from "../Button/Button";

import {
  Container,
  ContainerButtons,
  MessageBody,
  MessageContainer,
  MessageTitle,
} from "./styles";

export default function DialogConfirmation({
  functionIfYes,
  title,
  body,
  onClose = () => {},
}) {
  return (
    <Container>
      <MessageContainer>
        <MessageTitle>{title}</MessageTitle>
        <MessageBody>{body}</MessageBody>
      </MessageContainer>

      <ContainerButtons>
        <Button
          padding={10}
          borderradius={5}
          fontSize={0.9}
          justify="center"
          marginright={10}
          background="#fff"
          fontcolor="#878787"
          hoverbackground="#cdcdcd44"
          onClick={onClose}
        >
          Cancelar
        </Button>

        <Button
          borderradius={5}
          fontSize={0.9}
          justify="center"
          onClick={functionIfYes}
        >
          Sim
        </Button>
      </ContainerButtons>
    </Container>
  );
}
