import React from "react";
import { CgClose } from "react-icons/cg";
import { Body, CloseButton, Container, Header, Overlay, Title } from "./styles";

export default function ModalPost({
  children,
  title,
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
