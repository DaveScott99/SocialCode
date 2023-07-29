import { styled } from "styled-components";

export const Container = styled.div`
    margin-top: 20px;
`

export const Person = styled.div`

    background: ${(props) => props.theme.colors.black};
    color: ${(props) => props.theme.colors.white};

    display: flex;
    align-items: center;

    padding: 10px;

    margin-bottom: 5px;

    border-radius: 10px;

`

export const Info = styled.div`
    margin-left: 10px;
`

export const Username = styled.h2`
    font-size: 1.3em;

    cursor: pointer;

    width: max-content;

    transition: all .1s;

    &:hover {
        color: ${(props) => props.theme.colors.primary};
    }
`

export const Title = styled.p`
    font-size: .9em;
    margin-top: 5px;
`

