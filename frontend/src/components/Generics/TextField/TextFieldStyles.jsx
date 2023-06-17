import { styled } from "styled-components";

export const CustomTextField = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 10px;
    
    input:valid ~ span, 
    input:focus ~ span {
        color: ${props => props.theme.colors.black};
        font-size: 0.8em;
        padding: 2px 10px;
    }
`;

export const InputTextField = styled.input`
    width: 100%;
    padding: 15px 20px 10px 10px;
    border: 1px solid ${props => props.theme.colors.grey};
    background: ${props => props.theme.colors.white_smoke};
    border-radius: 5px;
    color: ${props => props.theme.colors.black};
    font-size: 1.1em;
    font-weight: 500;
`

export const FieldName = styled.span`
    position: absolute;
    left: 0;
    padding: 15px 0px 0px 10px;
    pointer-events: none;
    font-size: 1em;
    color: ${props => props.theme.colors.black};
    transition: 0.1s;
`;