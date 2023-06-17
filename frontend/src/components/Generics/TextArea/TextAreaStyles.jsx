import { styled } from "styled-components";

export const TextAreaContainer = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 10px;
    textarea:valid ~ span, 
    textarea:focus ~ span {
        color: ${props => props.theme.colors.black};
        font-size: 0.8em;
        padding: 3px 10px;
    }
`;

export const TextAreaInput = styled.textarea`
    width: 100%;
    height: ${props => props.height}px;
    border: 1px solid red;
    padding:  ${props => props.padding ? props.padding + "px" : "20px 20px 10px 10px"};
    border: ${props => props.border ? "1px solid" + props.theme.colors.grey : "none"} ;
    background: ${props => props.background ? props.background : props.theme.colors.white_smoke};
    border-radius: 5px;
    color: ${props => props.theme.colors.black};
    font-size: 1.1em;
    font-weight: 400;
    resize: none;
    flex: 0 0 auto;
    outline: none;
`;

export const FieldNameTextArea = styled.span`
    position: absolute;
    left: 0;
    padding: 15px 0px 0px 10px;
    pointer-events: none;
    font-size: 1em;
    color: ${props => props.theme.colors.black};
    transition: 0.1s;
`