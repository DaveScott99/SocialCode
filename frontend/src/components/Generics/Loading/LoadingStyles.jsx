import { keyframes, styled } from "styled-components";

export const LoaderContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;

const rotate = keyframes`
    to {
        transform: rotate(1turn);
    }
`
export const Loader = styled.div`
    animation: ${rotate} .9s linear infinite;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 4px solid ${props => props.theme.colors.grey};
    border-top-color: ${props => props.theme.colors.primary};
`

