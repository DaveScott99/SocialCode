import { styled } from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 1440px;
    display: flex;
    padding-bottom: 40px;

`

export const ContainerGridVideos = styled.div`
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    padding: 10px;
    width: 100%;
`

export const VideoItem = styled.article`
    max-width: 340px;
`

export const VideoThumbnail = styled.img`
    width: 100%;
    height: 180px;
    user-select: none;
    border-radius: 10px;

    cursor: pointer;
`

export const VideoTitle = styled.h2`
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;
    margin-top: 10px;
`

export const Owner = styled.div`
    margin-top: 5px;
`

export const Username = styled.p`
    font-size: .8em;
    font-weight: 400;
    cursor: pointer;
    transition: all .1s;
    width: max-content;

    &:hover {
        text-decoration: underline;
    }

`

export const ViewsAndDate = styled.div`
`

export const Views = styled.span`
    font-size: .8em;
`

export const Date = styled.span`
    font-size: .8em;
`
