import React from "react";
import { CgClose } from "react-icons/cg";
import { Body, CloseButton, Container, Overlay } from "./styles";

export default function ModalPost({
  children,
  id = "modal",
  onClose = () => {},
}) {
  const handleOutsideClick = (event) => {
    if (event.target.id === id) {
      onClose();
    }
  };

  return (
    <Overlay id={id} onClick={handleOutsideClick}>
      <Container>
        <Body>
          <CloseButton onClick={onClose}>
            <CgClose />
          </CloseButton>

          {children}
        </Body>
      </Container>
    </Overlay>
  );
}
