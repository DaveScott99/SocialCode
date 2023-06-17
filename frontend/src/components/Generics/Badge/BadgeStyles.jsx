import styled from "styled-components";

export const BadgeContainer = styled.div`
    width: 40px;
    height: 40px;
    margin-right: 10px;
    background: ${props => props.theme.colors.white_smoke};
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BadgeImage = styled.a`
    width: 30px;
    height: 30px;
`;