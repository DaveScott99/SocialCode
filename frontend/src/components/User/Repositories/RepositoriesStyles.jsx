import { styled } from "styled-components";

export const Container = styled.section`
    max-width: 800px;
    width: 100%;
    min-width: 400px;
    padding: 10px 10px 0px 10px;
    background: ${props => props.theme.colors.white};
    border-radius: 20px;
`;

export const SearchInput = styled.input`
    margin-bottom: 10px;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    outline: none;
    border: none;
    background: ${props => props.theme.colors.white_smoke};
    border: 1px solid ${props => props.theme.colors.grey};
    color: ${props => props.theme.colors.black};
    font-size: .8em;
`;

export const RepositoriesResult = styled.div`
    height: 510px;
    overflow: auto;
    padding: 0px 10px 0px 0px;
`;

export const Card = styled.div`
    width: 100%;
    display: flex;
    background: ${props => props.theme.colors.white_smoke};
    margin-bottom: 10px;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;

    &:hover {
        background: ${props => props.theme.colors.grey};
    }
`;

export const Main = styled.div``;

export const RepositoryName = styled.h3`
    font-size: .9em;
    font-weight: bold;
    margin-bottom: 15px;
`;

export const Details = styled.div`
    display: flex;
    justify-content: space-between;
`

export const Status = styled.div``;

export const Item = styled.span`
    display: flex;
    align-items: center;
    font-size: .9em;
    margin-bottom: 2px;
`;

export const Languages = styled.div``;