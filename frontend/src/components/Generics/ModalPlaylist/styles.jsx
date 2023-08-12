import { styled } from "styled-components";


export const HeaderModalSave = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    svg {
        font-size: 1.8em;
        cursor: pointer;
    }

`

export const TitleModalSave = styled.span`

    font-size: 1.2em;
    font-weight: 500;

`

export const CreateNewPlaylistContainer = styled.div`
    margin-top: 10px;

    button {
        padding: 10px 0px 10px 0px;
        font-size: 0.9em;
        margin-bottom: 5px;

        svg {
            margin-right: 5px;
        }
    }
`

export const PlaylistsByOwner = styled.div`
    max-height: 300px;
    overflow: auto;
    padding: 0px 10px 0px 0px;
`

export const PlaylistItem = styled.div`
    padding: 10px 0px 10px 0px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    transition: all .1s;
    font-size: .9em;

    cursor: pointer;

    &:hover {
        background: #ebebeb;
    }
`

export const TitlePlaylist = styled.span`
    font-size: 1em;
`

export const FormNewPlaylist = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
`

export const InputNamePlaylist = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    outline-color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.grey};
    margin-bottom: 5px;
`