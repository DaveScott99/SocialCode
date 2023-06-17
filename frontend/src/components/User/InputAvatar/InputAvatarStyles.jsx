import { styled } from "styled-components";

export const ContainerInput = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    min-width: 300px;
    width: 400px;
    height: 400px;
`

export const Picture = styled.label`
    width: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    background: ${props => props.theme.colors.white_smoke};
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 20px;

    &:hover {
        background: ${props => props.theme.colors.grey};
    }
`

export const Input = styled.input`
    display: none;
`

export const Preview = styled.span`

`

export const Image = styled.img`
    width: 300px;
    height: 300px;
    background-size: cover;
    object-fit: cover;
    border-radius: 10px;
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