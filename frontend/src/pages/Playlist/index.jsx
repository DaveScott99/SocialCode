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
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { findPlaylistsByName } from "../../services/Api";
import Loading from "../../components/Generics/Loading/Loading";
import { Avatar } from "@mui/material";

export default function Playlist() {
  const { playlistName } = useParams();
  const navigate = useNavigate();

  const { data: playlist, isLoading: isLoadingPlaylist } = useQuery(
    [playlistName],
    () => findPlaylistsByName(playlistName),
    { staleTime: 2000 * 100 }
  );

  const showThumbnail = process.env.REACT_APP_API;

  console.log(playlist);

  if (isLoadingPlaylist) {
    return <Loading color="#FFF" />;
  }

  return (
    <Container>
      <Header>
        <PlaylistCover
          src={
            showThumbnail +
            `/videos/thumbnail?thumbnailFileName=${playlist.thumbnailPlaylist.thumbnail[0].fileName}&videoFileName=${playlist.thumbnailPlaylist.fileName}`
          }
          alt="Playlist cover image"
        />
        <PlaylistInfo>
          <Privacity>Playlist pública</Privacity>
          <PlaylistName>{playlist.name}</PlaylistName>
          <Owner>
            <Avatar
              src={playlist.owner.profilePhoto}
              style={{ width: "25px", height: "25px", cursor: "pointer" }}
              onClick={() => navigate(`/profile/${playlist.owner.username}`)}
            />
            <OwnerUsername onClick={() => navigate(`/profile/${playlist.owner.username}`)}>{playlist.owner.username}</OwnerUsername>
          </Owner>
        </PlaylistInfo>
      </Header>

      <VideosContainer>
        {playlist.videos?.map((video) => (
          <VideoItem key={video.id} onClick={() => navigate(`/watch/${video.fileName}`)}>
            <VideoThumb
              src={
                showThumbnail +
                `/videos/thumbnail?thumbnailFileName=${video.thumbnail[0]?.fileName}&videoFileName=${video.fileName}`
              }
              alt="Video thumbnail"
            />
            <VideoTitle>{video.title}</VideoTitle>
          </VideoItem>
        ))}
      </VideosContainer>
    </Container>
  );
}
