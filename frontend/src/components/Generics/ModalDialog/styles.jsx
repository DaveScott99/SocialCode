import { styled } from "styled-components";

export const Overlay = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: rgba(75, 75, 75, 0.195);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
`;

export const Container = styled.div`
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.black};
    border-radius: 20px;
    width: 400px;
    max-width: 600px;
    min-width: 300px;
    height: 400px;
    box-shadow: 1px 0px 10px 2px rgba(0, 0, 0, 0.073);
    position: relative;
    padding: 10px 5px 5px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Body = styled.div`
    width: 100%;
`;

export const CloseButton = styled.svg`
    cursor: pointer;
    color: ${props => props.theme.colors.black};
    font-size: 1.5em;
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    margin-bottom: 5px;
`;