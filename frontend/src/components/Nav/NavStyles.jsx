import { styled } from "styled-components";

export const NavContainer = styled.nav`
    padding: 20px 5px 0px 5px;
    display: flex;
    flex-direction: column;

    @media (max-width: 767px) {
        padding: 0;
    }
`;

export const Menu = styled.ul`
    list-style: none;

    @media (max-width: 767px) {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
    }
`;

export const MenuItem = styled.li`
    text-decoration: none;
    padding: 10px 4%;
    display: flex;
    border-radius: 10px;
    transition: .5s ease;
    color: ${props => props.theme.colors.black};
    justify-content: center;
    transition: .5s ease;
    margin-bottom: 5px;

    &:hover {
        background: ${props => props.theme.colors.grey};
    }

    @media (max-width: 767px) {
        width: 70px;
        padding: 5px;
    }
`;

export const IconItem = styled.i`
    display: flex;
    justify-content: center;
    font-size: 1.7em;
`

export const NameItem = styled.span`
    font-weight: 500;
    margin-left: 20px;
    font-size: 1em;
    display: none;
`;

export const ProfileImage = styled.div`

`