import { styled } from "styled-components";

export const Container = styled.article`
    width: 100%;
    padding: 0px 20px 50px 20px;
`

export const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: ${(props) => props.theme.colors.white};

`

export const PlaylistInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
`

export const Privacity = styled.span`
    font-weight: 500;
`

export const PlaylistName = styled.h1`
    font-size: 4em;
    font-weight: 900;
    margin-bottom: 50px;
`

export const Owner = styled.div`
    display: flex;
    align-items: center;
`

export const OwnerUsername = styled.span`
    font-size: .9em;
    font-weight: 500;
    margin-left: 5px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`

export const PlaylistCover = styled.img`
    width: 300px;
    height: 180px;
    margin-right: 20px;
    user-select: none;
    object-fit: cover;
    border-radius: 10px;
`

export const VideosContainer = styled.ul`
    margin-top: 10px;
`

export const VideoItem = styled.li`
    display: flex;
    margin-bottom: 10px;
    transition: all .1s;
    cursor: pointer;
    padding: 10px 20px 10px 20px;

    &:hover{
        background: ${(props) => props.theme.colors.grey};
    }

`

export const VideoTitle = styled.h2`
    font-size: 1em;
    margin-top: 5px;
`

export const VideoThumb = styled.img`
    width: 180px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 10px;
`