import { styled } from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.colors.white_smoke};
    
    @media (max-width: 1220px) {
        justify-content: center;
        align-items: center;
    }
`;

export const ImageContainer = styled.section`
    width: 700px;
    height: 500px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 1220px) {
        display: none;
    }
`;

export const Image = styled.img`
    width: 700px;
    height: 500px;
    padding: 10px;
`;

export const Card = styled.section`
    background: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.grey};
    width: 400px;
    height: 600px;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    padding: 10px;
`;

export const Logo = styled.div`
    padding: 50px;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.3em;
`;

export const ToggleButtonContainer = styled.div`
    font-size: .8em;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;

`;

export const ToggleButton = styled.span`
    text-decoration: none;
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
    font-weight: bold;
`;