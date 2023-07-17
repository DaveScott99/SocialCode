import React from "react";
import { Body, Container, Overlay } from "./styles";

export default function ModalDialog({
  children,
  id = "modal",
  onClose = () => {},
}) {
  return (
    <Overlay id={id}>
      <Container>
        <Body>{children}</Body>
      </Container>
    </Overlay>
  );
}
