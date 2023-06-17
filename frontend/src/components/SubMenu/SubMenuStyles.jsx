import { styled } from "styled-components";

export const SubMenuContainer = styled.div`
    display: inline-block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 5px;

    @media (max-width: 767px) {
        display: none;
    }
`

export const SubMenuButton = styled.button`
    background: none;
    border: none;
    color: ${props => props.theme.colors.black};
    font-size: 1.4em;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    justify-content: center;
    transition: .5s ease;

    &:hover {
        background: ${props => props.theme.colors.grey};
    }

    svg {
        font-size: 1.2em;
    }
`

export const SubMenuContent = styled.div`
    padding: 10px;
    border-radius: 10px;
    background: ${props => props.theme.colors.white};
    min-width: 160px;
    display: none;
    position: absolute;
    bottom: 0;
    left: 90px;
    width: 80%;
    margin-bottom: 5px;
`

export const SubMenuItem = styled.span`
    color: ${props => props.theme.colors.black};
    font-weight: 300;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;
    border-radius: 10px;
    font-size: 1em;
    display: flex;
    align-items: center;

    &:hover {
        background: ${props => props.theme.colors.grey};
    }
`

export const LineSeparator = styled.hr`
    border: 1px solid ${props => props.theme.colors.grey};
    margin-top: 5px;
    margin-bottom: 5px;
`