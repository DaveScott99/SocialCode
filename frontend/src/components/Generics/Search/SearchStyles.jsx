import { styled } from "styled-components";

export const SearchContainer = styled.div`
    width: 100%;
    position: relative;

    @media (max-width: 767px) {
        display: none;
    }
`
export const SearchInput = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    outline: none;
    border: none;
    background: ${props => props.theme.colors.white_smoke};
    border: 1px solid ${props => props.theme.colors.grey};
    color: ${props => props.theme.colors.black};
    font-size: .8em;
`;

export const SearchResponseContainer = styled.div`
    margin-top: 5px;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    background: ${props => props.theme.colors.white};
    min-width: 160px;
    display: none;
    position: absolute;
    left: 0;

`;

export const SearchResponse= styled.div`
    padding: 5px;
`;

export const CardSearchResponse = styled.div`
    a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: ${props => props.theme.colors.black};
        padding: 5px;
        border-radius: 10px;
        transition: all .1s;
    }

    a:hover {
        background: ${props => props.theme.colors.grey};
    }
`;

export const Username = styled.span`
    font-size: .9em;
    font-weight: 500;
    margin-left: 5px;
`;