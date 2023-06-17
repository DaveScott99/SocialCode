import { styled } from "styled-components";

export const InputCustom = styled.input`
    padding: 10px;
    width: 100%;
    outline: none;
    margin-bottom: 10px;
    background: ${props => props.theme.colors.white_smoke};
    border: 1px solid ${props => props.theme.colors.grey};
    border-radius: 3px;
    font-size: .9em;
    color: ${props => props.theme.colors.black};
`