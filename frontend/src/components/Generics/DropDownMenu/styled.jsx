import { styled } from "styled-components";

export const DropDownContainer = styled.div`
    position: relative;
`

export const ContentSubMenu = styled.ul`
    position: absolute;
    right: 0;
    margin-top: 10px;
    border-radius: 5px;
    background: ${props => props.theme.colors.white};
    width: 200px;
    padding: 5px 0px 0px 0px;
    box-shadow: 0px 0px 10px 0px #00000042;

    li {
        width: 100%;
        padding: 10px;
    }

`