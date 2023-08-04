import { styled } from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    padding: 20px;

`

export const VideoItem = styled.article`

`

export const VideoThumbnail = styled.img`
    border-radius: 10px;
    width: 100%;
    max-width: 370px;
    height: 200px;
    object-fit: contain;
    user-select: none;

    cursor: pointer;
`

export const VideoTitle = styled.h2`
    font-size: 1.2em;
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