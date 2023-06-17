import { styled } from "styled-components";

export const SearchContainer = styled.div`
    width: 100%;

    @media (max-width: 767px) {
        display: none;
    }
`

export const SearchResponseContainer = styled.div`
    padding: 10px;
    border-radius: 10px;
    background: ${props => props.theme.colors.white};
    min-width: 160px;
    display: none;
    position: absolute;
    top: 0;
    left: 90px;

    width: 300px;

    height: 95vh;

`;

export const SearchButton = styled.button`
    background: none;
    border: none;
    color: ${props => props.theme.colors.black};
    cursor: pointer;
    padding: 10px 4%;
    border-radius: 10px;
    width: 100%;
    justify-content: center;
    display: flex;
    transition: .5s ease;
    margin-bottom: 5px;
    
    &:hover {
        background: ${props => props.theme.colors.grey};
    }

    svg {
        font-size: 2em;
    }
`;

export const SearchResponse= styled.div`
    padding: 5px;
    position: relative;
`;

export const SearchInput = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    outline: none;
    border: none;
    background: ${props => props.theme.colors.white_smoke};
    color: ${props => props.theme.colors.black};
    font-size: .9em;
`;

export const CardSearchResponse = styled.div`
    a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: ${props => props.theme.colors.black};
        padding: 5px;
        border-radius: 10px;
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