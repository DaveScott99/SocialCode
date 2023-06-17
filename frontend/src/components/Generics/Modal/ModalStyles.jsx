import { styled } from "styled-components";

export const Overlay = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: rgba(255, 255, 255, 0.452);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
`;

export const Container = styled.div`
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.black};
    border-radius: 20px;
    max-width: 1200px;
    min-width: 300px;
    box-shadow: 1px 0px 10px 2px rgba(0, 0, 0, 0.073);
    position: relative;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-bottom: 1px solid ${props => props.theme.colors.grey};

    svg {
        cursor: pointer;
        color: ${props => props.theme.colors.black};
        font-size: 1.5em;
        position: absolute;
        right: 10px;
    }
`;

export const Title = styled.h2`
    font-size: 1.2em;
`

export const Body = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
