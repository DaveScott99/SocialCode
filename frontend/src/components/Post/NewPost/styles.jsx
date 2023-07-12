import { styled } from "styled-components";

export const Container = styled.article`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    border: 1px solid var(--border);
    background: ${props => props.theme.colors.white};
    border-radius: 20px;
`

export const MainContent = styled.div`
    display: flex;
`

export const UserImage = styled.div`
    width: 10%;
    border: none;
`
export const HeaderModal = styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
`

export const Username = styled.span`
    margin-left: 5px;
    font-weight: bold;
    font-size: .9em;
`

export const ContentModal = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px 10px 10px 10px;
    width: 400px;
`

export const Others = styled.div`
    border: 1px solid ${props => props.theme.colors.grey};
    height: 50px;
    margin-bottom: 10px;
    border-radius: 10px;
`

export const TextButton = styled.span`
    margin-left: 5px;
    font-size: 1em;
`

export const Separator = styled.hr`
    margin-top: 10px;
    border: 1px solid ${props => props.theme.colors.white_smoke};

`

export const Footer = styled.div`
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`