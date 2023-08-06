import { styled } from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 980px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
        font-size: 1.5em;
    }

    border: 1px solid red;

`

export const ContainerInput = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
`

export const SelectFile = styled.label`
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    background: ${props => props.theme.colors.white_smoke};

    &:hover {
        background: ${props => props.theme.colors.grey};
    }
`

export const Input = styled.input`
    display: none;
`

export const Preview = styled.span`

`

export const ButtonUpload = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    svg {
        font-size: 3.5em;
        color: ${props => props.theme.colors.black};
    }

    span {
        font-size: 1.2em;
        font-weight: 400;
        color: ${props => props.theme.colors.black};
    }
`

export const AwarenessNoticeContainer = styled.div`
    width: 100%;
    max-width: 700px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    background-color: #ffc10748;
    padding: 10px;

    margin-top: 20px;

    svg {
        font-size: 4em;        
        height: max-content;
        width: max-content;
    }
`

export const TextWarning = styled.span`
    text-align: center;
    font-size: .8em;
    font-weight: 500;
`