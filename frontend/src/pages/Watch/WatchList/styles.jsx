import { styled } from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    padding: 20px;
    width: 100%;
    max-width: 1440px;
    margin-top: 10px;
`

export const VideoItem = styled.article`
    max-width: 340px;
`

export const VideoThumbnail = styled.img`
    width: 100%;
    height: 200px;
    user-select: none;
    border-radius: 10px;

    cursor: pointer;
`

export const VideoTitle = styled.h2`
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;
`

export const Owner = styled.div`
    margin-top: 3px;
`

export const Username = styled.p`
    font-size: .9em;
    font-weight: 500;
    cursor: pointer;
    transition: all .1s;
    width: max-content;

    &:hover {
        text-decoration: underline;
    }

`

export const ViewsAndDate = styled.div`
    margin-top: 3px;
`

export const Views = styled.span`
    font-size: .8em;
`

export const Date = styled.span`
    font-size: .8em;
`