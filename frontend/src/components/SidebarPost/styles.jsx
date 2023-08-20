import { styled } from "styled-components";
import theme from "../../styles/theme";

export const SidebarContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  transition: all .1s;


`;

export const MenuItem = styled.li`
  transition: all .1s;
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
  font-size: 1.5em;
`;

export const TecnologyIcon = styled.img`
  width: 25px;
  height: 25px;
`

export const ExpansiveDiv = styled.div`
  display: none;
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
