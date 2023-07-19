import { styled } from "styled-components";

export const CustomButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: ${props => props.justify};
    border: none;
    cursor: pointer;
    width: ${props => props.width}%;
    padding: ${props => props.padding}px;
    border-radius: ${props => props.borderradius}px;
    font-weight: ${props => props.fontWeight};
    background: ${props => props.background ? props.background : props.theme.colors.primary};
    color: ${props => props.fontcolor ? props.fontcolor : props.theme.colors.white};
    font-size: ${props => props.fontSize}em;

    margin-right: ${props => props.marginright}px;
    margin-left: ${props => props.marginleft}px;

    position: ${props => props.position};
    top: ${props => props.top};
    bottom: ${props => props.bottom};
    left: ${props => props.left};
    right: ${props => props.right};
    transition: all .1s;

    svg {
        font-size: 1.4em;
    }
    
    &:hover {
        background: ${props => props.hoverbackground ? props.hoverbackground : props.theme.colors.primary_hover};
    }

    &:disabled {
        background: ${props => props.theme.colors.grey};
        cursor: auto;
    }
`;