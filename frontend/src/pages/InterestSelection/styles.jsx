import styled from "styled-components";

export const Overlay = styled.main`
    background: ${props => props.theme.colors.white_smoke};

    position: absolute;
    
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
`

export const Container = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    max-width: 800px;
    height: 100vh;

    h1 {
        font-size: 2em;
        margin-top: 20px;
    }

    p {
        text-align: center;
        margin-top: 10px;
        font-size: .9em;
        font-weight: 500;
        color: #00000088;
        margin-bottom: 20px;
    }
`

export const ContainerSelectedLanguages = styled.div`
    border: 1px solid red;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.colors.grey};

    display: flex;
    align-items: center;
    
    padding: 10px;
`

export const SelectedLanguage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 10px 10px 10px;

    margin-left: 5px;
    margin-right: 5px;

    border-radius: 5px;

    background: ${props => props.theme.colors.white};

    user-select: none;

    position: relative;

    width: 80px;
    height: 80px;

    img {
        width: 40px;
        height: 40px;
    }
`

export const RemoveLanguage = styled.div`

    position: absolute;
    top: 0;
    right: 0;

    cursor: pointer;

    padding: 3px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;
    
    transition: all .1s;

    &:hover {
        background: #ff00001c;
    }

    svg {
        font-size: 1em;
    }

`

export const ContainerLanguages = styled.div`
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));

    padding: 10px;
    overflow: auto;
    
    justify-content: center;
    justify-items: center;
    align-items: center;

    width: 100%;


    border-radius: 10px;

    margin-top: 20px;
    margin-bottom: 10px;

    border: 1px solid ${props => props.theme.colors.grey};
`

export const Language = styled.div`

    width: 100px;
    height: 100px;

    padding: 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    border-radius: 5px;

    transition: all .1s;

    background: ${props => props.theme.colors.white};
    
    user-select: none;

    &:hover {
        background: #ffffff78;
    }

`

export const LanguageName = styled.span`
    font-weight: 500;
    font-size: .9em;
    margin-top: 10px;
`

export const LanguageIcon = styled.img`
    width: 50px;
    height: 50px;
`