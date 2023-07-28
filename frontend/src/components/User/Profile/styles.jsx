import { styled } from "styled-components";

export const UserInfoContainer = styled.section`
    width: 100%;
    display: flex;
    padding: 20px;
    background: ${props => props.theme.colors.white};
    border-radius: 10px;
`;

export const UserData = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-left: 15px;

`

export const UserAvatar = styled.div`
    position: relative;
`;

export const Header = styled.div`
    display: flex;
`

export const Name = styled.span`
    font-size: 1.6em;
    font-weight: 600;
    margin-right: 50px;
`;

export const Username = styled.span`
    font-size: 1em;
    font-weight: 300;
    margin-bottom: 10px;
`

export const Title = styled.span`
    font-size: .9em;
    font-weight: 300;
`;

export const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const ContainerFollowers = styled.div`
    display: flex;
    align-items: center;    
`

export const Followers = styled.div`
    font-size: .8em;
    margin-right: 10px;
    cursor: pointer;

    span {
        font-weight: 700;
    }

    &:hover {
        text-decoration: underline;
    }
`

export const Badges = styled.div`
    display: flex;
    justify-content: flex-end;
`