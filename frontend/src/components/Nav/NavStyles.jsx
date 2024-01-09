import { styled } from "styled-components";

export const NavContainer = styled.nav`
    width: 100%;
`;

export const Menu = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
        text-decoration: none;
    }
`;

export const MenuNavigation = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;

    a {
        width: 100%;
        max-width: 80px;
        display: flex;
    }

`

export const MenuItem = styled.li`
    text-decoration: none;
    color: ${(props) => props.theme.colors.black};
`;

export const ItemNavigation = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 55px;
    width: 100%;
    color: #000;
    font-weight: 500;
`

export const IconItem = styled.span`
    display: flex;
    justify-content: center;
    font-size: 1.8em;
    cursor: pointer;
`

export const ProfileImage = styled.div`
    cursor: pointer;
`

export const BackArrow = styled.div`
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 5px;
    cursor: pointer;

    svg {
        font-size: .9em;
    }

    &:hover {
        background: ${(props) => props.theme.colors.white_smoke};
    }
`

export const Label = styled.span`
    margin-left: 5px;
    font-size: .9em;
    font-weight: 500;
`

export const Right = styled.div`
    width: 40%;
    max-width: 600px;
    height: 50px;
    margin-left: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    padding: 0px 15px 0px 0px;
`

export const SubMenuItem = styled.li`
    color: ${props => props.theme.colors.black};
    font-weight: 400;
    text-decoration: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: .9em;
    display: flex;
    align-items: center;
    transition: all .1s;
    margin-bottom: 5px;

    svg {
        font-size: 1.5em;
        margin-right: 10px;
    }

    &:hover {
        background: ${props => props.theme.colors.grey};
    }
`

export const LineSeparator = styled.hr`
    border: 1px solid ${props => props.theme.colors.grey};
    margin-top: 5px;
    margin-bottom: 5px;
`