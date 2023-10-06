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
`;

export const Container = styled.div`
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.black};
    border-radius: 10px;

    min-width: 300px;
    width: 1000px;
    max-width: 1200px;

    box-shadow: 1px 0px 10px 2px rgba(0, 0, 0, 0.073);
    padding: 10px 5px 5px 5px;

`;

export const Body = styled.div`
    width: 100%;

    min-height: 200px;
    height: 700px;
    max-height: 800px;

    display: flex;
    justify-content: center;
    overflow: auto;
    position: relative;
`;

export const CloseButton = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 50%;
    padding: 5px;
    transition: all .1s;

    svg {
        font-size: 1.5em;
    }

    &:hover {
        background: #9d9d9d32;
    }

`;