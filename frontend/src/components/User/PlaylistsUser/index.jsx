import React from "react";
import { Container, Count, PlaylistItem, PlaylistName, PlaylistThumb, PlaylistThumbnailContainer, VideosCount } from "./styles";
import { findPlaylistsByUser } from "../../../services/Api";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { MdOutlinePlaylistPlay } from "react-icons/md";

export default function PlaylistsUser({ userUsername }) {
    
    const navigate = useNavigate();

    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        findPlaylistsByUser(userUsername)
        .then((playlists) => setPlaylists(playlists))
        .catch((err) => console.log(err));
    }, [userUsername])

    console.log(playlists);

    return(

        <Container>

            {
                playlists.map((playlist) => (
                    <PlaylistItem key={playlist.id} onClick={() => navigate(`/playlist/${playlist.name}`)}>
                        <PlaylistThumbnailContainer>

                            <PlaylistThumb src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVFTdcW2W9NofAWpuWmQZOjY8RTyOLJ6_9AQ&usqp=CAU" alt="Playlist thumbnail"/>

                        <VideosCount>
                            <MdOutlinePlaylistPlay />
                            <Count> 1 vídeos </Count>
                        </VideosCount>

                        </PlaylistThumbnailContainer>
                        <PlaylistName>
                            {playlist.name}
                        </PlaylistName>
                    </PlaylistItem>
                ))
            }
         
        </Container>

    )
    
}