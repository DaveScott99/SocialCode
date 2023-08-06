import { styled } from "styled-components";

export const ContainerForm = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    border: 1px solid red;

    margin-top: 20px;
    
`

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
`

export const ContainerInput = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    margin-bottom: 10px;
`

export const Picture = styled.label`
    width: 100%;
    max-width: 400px;
    height: 200px;
    max-height: 200px;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: pointer;
    background: ${props => props.theme.colors.white_smoke};
    margin-top: 20px;

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
    width: 400px;
    max-height: 200px;
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
        font-size: 3em;
        color: ${props => props.theme.colors.black};
        margin-bottom: 10px;
    }

`

export const ProportionThumbnail = styled.span`
    font-size: .8em;
    font-weight: 400;
    max-width: 230px;
    text-align: center;
`

export const TitleUploadThumbnail = styled.span`
    font-size: 1em;
    font-weight: 500;
    margin-bottom: 10px;
`