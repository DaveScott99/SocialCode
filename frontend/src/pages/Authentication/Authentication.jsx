import React, { useState } from "react";
import FormRegistry from "../../components/Forms/FormRegistry/FormRegistry";
import FormLogin from "../../components/Forms/FormLogin/FormLogin";
import LoginImage from "../../assets/login-image.svg";
import { Card, Container, Image, ImageContainer, Logo, ToggleButton, ToggleButtonContainer } from "./AuthenticationStyles";

export default function Authentication() {

    const [renderForm, setRenderForm] = useState(true);

    const handleClickRender = () => {
        setRenderForm(!renderForm);
    }

    return(
        <Container>

            <ImageContainer>
                <Image src={LoginImage} alt="Imagem login" />
            </ImageContainer>

            <Card>
        
                <Logo>
                    <h1>SocialCode</h1>
                </Logo>

                {
                    renderForm 
                    ?
                    <>
                        <FormLogin /> 
                        <ToggleButtonContainer>
                            <span>Não tem uma conta? <ToggleButton onClick={handleClickRender}>Cadastre-se</ToggleButton></span>
                        </ToggleButtonContainer>
                    </> 
                    : 
                    <>
                        <FormRegistry />
                        <ToggleButtonContainer>
                            <span>Tem uma conta? <ToggleButton onClick={handleClickRender}>Entrar</ToggleButton></span>
                        </ToggleButtonContainer>
                    </>
                }
            </Card>

        </Container>
    );
};