import { styled } from "styled-components";

export const FooterContainer = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    
    @media (max-width: 767px) {
        display: none;
    }
`

export const Logo = styled.div`
    color: #00000097;
    display: flex;
    align-items: center;
    padding: 10px;

    svg {
        font-size: 1.5em;
        margin-right: 5px;
    }

    span {
        font-size: .9em;
        font-weight: 400;
    }
`

export const Links = styled.ul`
    list-style: none;
    display: flex;
    padding: 10px;

    li {
        margin-right: 20px;
        font-size: .9em;
    }
`

