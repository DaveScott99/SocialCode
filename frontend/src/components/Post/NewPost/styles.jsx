import { styled } from "styled-components";

export const Container = styled.article`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    border-radius: 20px;
`

export const Others = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
`

export const TextEditorContainer = styled.div`
    width: 100%;
    margin-top: 10px;
`

export const TitleInput = styled.input`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    padding: 15px;
    border-radius: 5px;
    background: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.grey};
    color: ${props => props.theme.colors.black};
    font-size: .9em;
`;