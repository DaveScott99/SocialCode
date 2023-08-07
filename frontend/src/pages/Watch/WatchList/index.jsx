import React from "react";
import { useNavigate, useParams } from "react-router";
import {
  Container,
  Date,
  Owner,
  Username,
  VideoItem,
  VideoThumbnail,
  VideoTitle,
  Views,
  ViewsAndDate,
} from "./styles";
import { useQuery } from "@tanstack/react-query";
import { findAllVideos } from "../../../services/Api";
import Loading from "../../../components/Generics/Loading/Loading";

export default function WatchList() {
  const navigate = useNavigate();

  const { data: videosData, isLoading } = useQuery(
    ["videos"],
    () => findAllVideos(),
    { staleTime: 2000 * 100 }
  );

  console.log(videosData);
  
  const showThumbnail = process.env.REACT_APP_API;

  if (isLoading) {
    return <Loading color="#FFF" />
  }

  return (
    <Container>
      {videosData.content.map((video) => (
        <VideoItem key={video.id} onClick={() => navigate(`/watch/${video.fileName}`)} >
          <VideoThumbnail src={showThumbnail + `/videos/thumbnail?thumbnailFileName=${video.thumbnail.fileName}&videoFileName=${video.fileName}`} />
          <VideoTitle>{video.title}</VideoTitle>
          <Owner>
            <Username>
              
            </Username>
          </Owner>
          <ViewsAndDate>
            <Views>{video.views} views - </Views>
            <Date>há {video.date} horas</Date>
          </ViewsAndDate>
        </VideoItem>
      ))}
    </Container>
  );
}
