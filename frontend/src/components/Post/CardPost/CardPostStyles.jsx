import { styled } from "styled-components";

export const CardContainer = styled.div`
    width: 100%;
    color: ${props => props.theme.colors.black};
    border-bottom: 1px solid ${props => props.theme.colors.grey};
    padding: 15px;
    flex: 1 0 auto;
    background: ${props => props.theme.colors.white};
    border-radius: 20px;
    margin-bottom: 20px;
`

export const CardHeader = styled.header`
    display: flex;
    align-items: center;
    width: 100%;

    a {
        color: ${props => props.theme.colors.black};
        text-decoration: none;
    }
`

export const UserInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 10px;
`

export const Username = styled.span`
    font-weight: 700;
    font-size: .9em;
    margin-right: 5px;
    margin-left: 10px;
`

export const PostDate = styled.div`
    font-weight: 300;
    font-size: .9em;
`

export const CardBody = styled.main`
    padding: 10px 0px 10px 0px;
`

export const CardFooter = styled.footer`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 5px;

    font-size: 1.2em;
    justify-content: space-evenly;
    padding: 0px 5px 0px 5px;
`

export const InteractionButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    svg {
        margin-right: 10px;
    }
`