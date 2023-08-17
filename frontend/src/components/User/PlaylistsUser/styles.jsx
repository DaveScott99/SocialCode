import { styled } from "styled-components";

export const Container = styled.article`
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    padding: 10px;
    width: 100%;
    padding-bottom: 60px;
`

export const PlaylistItem = styled.div`
    cursor: pointer;
    max-width: 300px;
    height: 180px;
`

export const PlaylistName = styled.h2`
    font-size: 1em;
`

export const PlaylistThumbnailContainer = styled.div`
    width: 100%;
    height: 180px;
    user-select: none;
    border-radius: 10px;
    margin-bottom: 10px;
    position: relative;
`

export const PlaylistThumb = styled.img`
    width: 300px;
    height: 180px;
    object-fit: cover;
    border-radius: 10px;

`

export const VideosCount = styled.div`
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 4;
    width: 100%;
    height: 25px;
    border-radius: 0px 0px 10px 10px;


    background: #0000009c;
    position: absolute;
    bottom: 0;

    padding: 10px;

    svg {
        color: #FFF;
        font-size: 1.5em;
    }
`

export const Count = styled.span`
    color: #FFF;
    font-weight: 500;
    font-size: .85em;
`