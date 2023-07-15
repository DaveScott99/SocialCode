import { styled } from "styled-components";

export const Container = styled.div`
    color: ${props => props.theme.colors.black};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    a {
        text-decoration: none;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
    }
`;

export const Message = styled.div`
    font-size: 1.3em;
    font-weight: 600;
`;

export const SucessContainer = styled.div`
    margin-bottom: 20px;
`