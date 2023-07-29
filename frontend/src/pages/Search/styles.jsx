import { styled } from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

export const SearchResponseContainer = styled.div`
    width: 100%;
    max-width: 900px;
`

export const SearchQuery = styled.h2`

`

export const Filters = styled.ul`

    display: flex;
    align-items: center;

    list-style: none;

    margin-top: 10px;
`

export const Filter = styled.li`
    
    cursor: pointer;

    padding: 5px 10px 5px 10px;
    border-radius: 5px;
    margin-right: 10px;

    background: ${({ selected }) =>
        selected ? theme.colors.primary : theme.colors.white_smoke};
    color: ${({ selected }) => (selected ? theme.colors.white : theme.colors.black)};

    transition: all .1s;

    &:hover {
        background: ${({ selected }) =>
            selected ? theme.colors.primary : theme.colors.grey};
        color: ${({ selected }) => (selected ? theme.colors.white : theme.colors.black)};
    }

`