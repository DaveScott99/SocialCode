import { styled } from "styled-components";
import theme from "../../styles/theme";

export const NavContainer = styled.nav`
    width: 100%;
    padding: 3px;
`;

export const Left = styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    max-width: 600px;
    height: 50px;
    padding: 0px 0px 0px 15px;
    margin-right: 10px;
`

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.black};

  svg {
    font-size: 2.2em;
    user-select: none;
  }
`;

export const PlataformName = styled.h1`
    font-size: 1.2em;
    margin-left: 5px;
`

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
    justify-content: center;
    align-items: center;

    a {
        width: 100%;
        max-width: 150px;
        margin-right: 10px;
        margin-left: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
 
    }

`

export const MenuItem = styled.li`
    text-decoration: none;
    color: ${(props) => props.theme.colors.black};
`;

export const ItemNavigation = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.1s;

    height:  ${({ selected }) => (selected ? "55px" : "45px")};
    width: 100%;
    max-width: 150px;

    border-radius: ${({ selected }) => (!selected ? "10px" : "0px")};

    border-bottom: 3px solid ${({ selected }) =>
        selected ? theme.colors.primary : "transparent"};
    color: ${({ selected }) => (selected ? theme.colors.primary : "#000")};

    &:hover {
        background: ${({ selected }) => (selected ? "transparent" : theme.colors.white_smoke)};
        color: ${({ selected }) => (selected ? theme.colors.primary : "#000")};
    }
    
    svg {
        font-size: 1.1em;
    }

`

export const IconItem = styled.i`
    display: flex;
    justify-content: center;
    font-size: 1.6em;
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
    width: 90%;
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