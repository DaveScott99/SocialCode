import React, { useState } from "react";
import { CgClose } from "react-icons/cg"
import { Body, Container, Header, Overlay, Title } from "./ModalStyles";
import { Button } from "../Button/Button";

export default function Modal({ children, title, textButton, buttonBackground, buttonPadding, 
                                buttonBorderRadius, buttonFontColor ,buttonFontWeight, buttonFontSize, buttonTextCenter,
                                buttonHoverBackground, positionButton, buttonWidth, top, left, right, bottom }) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const handleCloseModal = () => {
        setIsModalVisible(false);
    }

    const handleOutsideClick = (event) => {
        if (event.target.id === "modal") {
            setIsModalVisible(false);
        }
    }

    return(
        <> 
            <Button 
                onClick={() => setIsModalVisible(true)} 
                background={buttonBackground}
                padding={buttonPadding}
                borderradius={buttonBorderRadius}
                fontcolor={buttonFontColor}
                fontWeight={buttonFontWeight}
                fontSize={buttonFontSize}
                hoverbackground={buttonHoverBackground}
                position={positionButton}
                left={left}
                top={top}
                right={right}
                bottom={bottom}
                width={buttonWidth}
                justify={buttonTextCenter}
            >
                {textButton}
            </Button>

            {
                isModalVisible 
                    ?
                    <Overlay id="modal" onClick={handleOutsideClick}>
                        <Container>
                        
                            <Header>
                                <Title>{title}</Title>
                                <CgClose onClick={handleCloseModal} />
                            </Header>

                            <Body>
                                { children }
                            </Body>
                    
                        </Container>
                    </Overlay>
                    :
                        null

            }
        </>
    );
};