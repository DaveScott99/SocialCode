import { styled } from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    padding: 30px;
`

export const TechnologyItem = styled.div`
    border: 1px solid ${(props) => props.theme.colors.grey};
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    cursor: pointer;
    transition: all .1s;

    &:hover {
        background: ${(props) => props.theme.colors.white_smoke};
    }

`

export const TechonologyIcon = styled.img`
    width: 100px;
    height: 100px;
    margin-bottom: 15px;
`

export const TechonologyName = styled.h2`
    font-weight: 500;
    font-size: 1.1em;
`

