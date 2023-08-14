import React from "react";
import {
  Container,
  Header,
  Owner,
  OwnerUsername,
  PlaylistCover,
  PlaylistInfo,
  PlaylistName,
  Privacity,
  VideoItem,
  VideoThumb,
  VideoTitle,
  VideosContainer,
} from "./styles";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { findPlaylistsByName } from "../../services/Api";
import Loading from "../../components/Generics/Loading/Loading";
import { Avatar } from "@mui/material";

export default function Playlist() {
  const { playlistName } = useParams();

  const { data: playlist, isLoading: isLoadingPlaylist } = useQuery(
    [playlistName],
    () => findPlaylistsByName(playlistName),
    { staleTime: 2000 * 100 }
  );

  console.log(playlist);

  if (isLoadingPlaylist) {
    return <Loading color="#FFF" />;
  }

  return (
    <Container>
      <Header>
        <PlaylistCover src="#" alt="Playlist cover image" />
        <PlaylistInfo>
          <Privacity>Playlist pública</Privacity>
          <PlaylistName>{playlist.name}</PlaylistName>
          <Owner>
            <Avatar
              src={playlist.owner.profilePhoto}
              style={{ width: "30px", height: "30px" }}
            />
            <OwnerUsername>{playlist.owner.username}</OwnerUsername>
          </Owner>
        </PlaylistInfo>
      </Header>

      <VideosContainer>
        {playlist.videos?.map((video) => (
          <VideoItem key={video.id}>
            <VideoThumb src="#" alt="Video thumbnail" />
            <VideoTitle>{video.title}</VideoTitle>
          </VideoItem>
        ))}
      </VideosContainer>
    </Container>
  );
}
