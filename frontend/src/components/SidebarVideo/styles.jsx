import { styled } from "styled-components";
import theme from "../../styles/theme";

export const SidebarContainer = styled.aside`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  height: 95vh;
  transition: all .1s;
  overflow: hidden;

  &:hover {
    overflow: auto;
  }

  @media (max-width: 767px) {
    width: 55px;
  }
`;

export const Menu = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 20px 5px 0px 5px;

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
  padding: 10px 10px 10px 15px;
  border-radius: 5px;
  transition: all 0.1s;
  cursor: pointer;

  background-color: ${({ selected }) =>
    selected ? theme.colors.grey : "transparent"};
  color: ${props => props.theme.colors.black };

  &:hover {
    background: ${(props) => props.theme.colors.grey};
    color: ${(props) => props.theme.colors.black};
  }
`;

export const Label = styled.span`
  font-size: .9em;
  font-weight: 400;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const Icon = styled.i`
  display: flex;
  justify-content: center;
  font-size: 1.5em;

  margin-right: 10px;
`;

export const TecnologyIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`

export const ExpansiveDiv = styled.div`
  height: ${(props) => props.isExpansive ? "max-content" : "45px"};
  overflow: hidden;
`

export const Line = styled.hr`
  width: 100%;
  border: 1px solid #00000018;

  margin-top: 5px;
  margin-bottom: 10px;
`;

export const SectionName = styled.span`
  font-size: 0.8em;
  margin-top: 10px;
`;
