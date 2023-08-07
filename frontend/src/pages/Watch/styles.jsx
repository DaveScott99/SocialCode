import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    margin-top: 20px;
    width: 100%;
    max-width: 1550px;
`

export const PlayerContainer = styled.div`
`

export const InfoVideo = styled.div`
    width: 100%;
    margin-right: 10px;
`

export const Header = styled.div`
    margin-top: 15px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
`

export const Interation = styled.div`
    display: flex;
    align-items: center;
`

export const TitleContainer = styled.div`

`

export const TitleButton = styled.span`
    margin-left: 5px;
`

export const Title = styled.h1`
    font-size: 1.2em;
    font-weight: 400;
    margin-bottom: 5px;
`

export const Views = styled.span`
    font-size: .8em;
    font-weight: 400;
`

export const VideoDate = styled.span`

`

export const Separator = styled.hr`
    margin-bottom: 10px;
    opacity: .2;
`

export const Owner = styled.div`
    display: flex;
    align-items: center;

`

export const Username = styled.span`
    margin-left: 5px;
    font-size: .9em;

    font-weight: 500;

    cursor: pointer;
`

export const ContainerVotes = styled.div`
    display: flex;
    align-items: center;

    border-radius: 20px;
    padding: 10px 5px 10px 5px;

    background: #F0F2F5;

    margin-right: 5px;
`

export const InteractionButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    margin-left: 10px;
    margin-right: 10px;

    border-radius: 50%;

    cursor: pointer;

    svg {
        font-size: 1.3em;
    }

`

export const VotesCount = styled.span`
    font-size: .8em;
    font-weight: 600;

    cursor: default;
`

export const RecommendationsContainer = styled.div`
    margin-left: 10px;
    width: 100%;
    max-width: 400px;
`

export const ItemRecommendation = styled.div`
    display: flex;
    cursor: pointer;
    margin-bottom: 10px;
`

export const Thumbnail = styled.img`
    width: 180px;
    height: 100px;

    object-fit: cover;

    border-radius: 10px;

    margin-right: 10px;
`

export const TitleRecommendation = styled.h2`
    font-size: 1.1em;
`

export const OwnerRecommendation = styled.div`
    margin-top: 3px;
`

export const UsernameRecommendation = styled.span`
    font-size: 1em;
`