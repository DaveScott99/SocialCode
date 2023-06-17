import { styled } from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    background: ${props => props.theme.colors.white_smoke};

    @media (max-width: 767px) {
        flex-direction: column;
        align-items: center;
    }
`

export const Header = styled.header`
    display: flex;
    width: 100%;
    display: none;

    @media (max-width: 767px) {
        display: block;
    }
`;

export const Main = styled.main`
    width: 100%;
    height: 100vh;
    overflow: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: var(--white-smoke);

    @media (max-width: 767px) {
        width: 100%;
        height: 100vh;
        margin: 0;
        display: block;
    }
`

export const Sidebar = styled.nav`
    width: 80px;
    height: 95vh;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    border-radius: 10px;
    background: ${props => props.theme.colors.white};
    margin-left: 10px;

    @media (max-width: 767px) {
        border-top: 1px solid ${props => props.theme.colors.grey};
        width: 100%;
        height: 60px;
        padding: 0;
        justify-content: center;
        bottom: 0;
        z-index: 4;
        margin-left: 0;
    }
`