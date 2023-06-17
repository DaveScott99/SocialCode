import { styled } from "styled-components";

export const FeedContainer = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

    @media (max-width: 767px) {
        margin-bottom: 55px;
    }
`