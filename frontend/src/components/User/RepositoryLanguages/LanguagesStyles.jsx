import { styled } from "styled-components";

export const LanguageName = styled.span`
    padding: 5px 10px 5px 10px;
    background: ${props => props.theme.colors.primary_hover};
    color: ${props => props.theme.colors.white};
    font-weight: 600;
    border-radius: 10px;
    font-size: .7em;
`;
