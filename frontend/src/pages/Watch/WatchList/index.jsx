import React from "react";
import { useNavigate, useParams } from "react-router";
import { Container, Date, Owner, Username, VideoItem, VideoThumbnail, VideoTitle, Views, ViewsAndDate } from "./styles";
import { videosData } from "../../../utils/Data";

export default function WatchList() {

    const { technology } = useParams();
    const navigate = useNavigate();

    return(
        <Container>
            {videosData.content.map((video) => (
                <VideoItem key={video.id}>
                    <VideoThumbnail src={video.thumbnail} />
                    <VideoTitle>{video.title}</VideoTitle>
                    <Owner>
                        <Username onClick={() => navigate(`/${video.owner.username}`)}>{video.owner.username}</Username>
                    </Owner>
                    <ViewsAndDate>
                        <Views>{video.views} views - </Views>
                        <Date>há {video.date} horas</Date>
                    </ViewsAndDate>
                </VideoItem>
            ))}
        </Container>
    )
}