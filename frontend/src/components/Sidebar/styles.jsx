import { styled } from "styled-components";
import theme  from "../../styles/theme"

export const SidebarContainer = styled.aside`
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;

  margin-right: 10px;
`;


export const Logo = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 20px;
    margin-bottom: 20px;

    color: ${(props) => props.theme.colors.black};

    svg {
        font-size: 2.5em;
        user-select: none;
    }

`

export const Menu = styled.ul`
    list-style: none;
    padding: 10px;

    display: flex;
    flex-direction: column;


    width: 100%;
    height: 100vh;

    a {
        text-decoration: none;
        margin-bottom: 5px;
        color: ${(props) => props.theme.colors.black};
        font-weight: 500;
        border-radius: 5px;    


    }

`;

export const MenuItem = styled.li`

    display: flex;
    align-items: center;

    width: 100%;

    padding: 10px;

    border-radius: 5px;
    transition: all .1s;

    background-color: ${({ selected }) => (selected ? theme.colors.primary : 'transparent')};
    color: ${({ selected }) => (selected ? theme.colors.white : '#000')};
    
    &:hover {
            background: ${(props) => props.theme.colors.primary};
            color: ${(props) => props.theme.colors.white};
        }

    
`;

export const Label = styled.span`

`

export const Icon = styled.i`
    display: flex;
    justify-content: center;
    font-size: 1.5em;

    margin-right: 10px;

`

export const LineSeparator = styled.div`
    margin-top: 30px;
`

export const Line = styled.hr`

`

export const SectionName = styled.div`
    font-size: .8em;
    margin-top: 10px;

    margin-bottom: 20px;
`