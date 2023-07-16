import { styled } from "styled-components";

export const NavContainer = styled.nav`
    width: 100%;
`;

export const Menu = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;

    @media (max-width: 767px) {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
    }
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;
    transition: all .1s ease-in-out;
    color: ${(props) => props.theme.colors.white};

    svg {
        font-size: 2.5em;
        cursor: pointer;
        user-select: none;
    }

    &:hover {
        color: #b6b6b6 ;
    }

`

export const MenuItem = styled.li`
    text-decoration: none;
    color: ${(props) => props.theme.colors.white};
`;

export const IconItem = styled.i`
    display: flex;
    justify-content: center;
    font-size: 1.5em;

    &:hover {
        color: #b6b6b6 ;
    }

`

export const ProfileImage = styled.div`

`

export const Left = styled.div`
    display: flex;
`

export const Center = styled.div`
    width: 500px;
`

export const Right = styled.div`
    display: flex;
    width: 100px;
    align-items: center;

    display: flex;
    justify-content: space-evenly;



`