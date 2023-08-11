import React, { useState } from "react";
import Player from "../../components/Player";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { nextVideo } from "../../redux/video/actions";
import { useQuery } from "@tanstack/react-query";
import { findAllVideos, findVideoByFileName } from "../../services/Api";
import Loading from "../../components/Generics/Loading/Loading";
import {
  Container,
  ContainerVotes,
  Header,
  InfoVideo,
  InteractionButton,
  Interation,
  ItemRecommendation,
  Owner,
  OwnerRecommendation,
  PlayerContainer,
  RecommendationsContainer,
  Separator,
  Thumbnail,
  Title,
  TitleButton,
  TitleContainer,
  TitleRecommendation,
  Username,
  UsernameRecommendation,
  VideoDate,
  Views,
  VotesCount,
} from "./styles";
import { Avatar } from "@mui/material";
import {
  BiChevronDown,
  BiChevronUp,
  BiAddToQueue,
  BiShareAlt,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import { Button } from "../../components/Generics/Button/Button";
import { dateFormat } from "../../utils/FormatDateInfo";

export default function Watch() {
  const { filename } = useParams();
  const [videosRecommendation, setVideosRecommendation] = useState([]);
  const showThumbnail = process.env.REACT_APP_API;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { data: videoData, isLoading } = useQuery(
    [filename],
    () => findVideoByFileName(filename),
    { staleTime: 2000 * 100 }
  );

  useEffect(() => {
    findAllVideos().then((response) =>
      setVideosRecommendation(response.content)
    );
  }, []);

  useEffect(() => {
    dispatch(nextVideo(0));
  }, [dispatch, filename]);

  if (isLoading) {
    return <Loading color="#FFF" />;
  }

  return (
    <Container>
      <InfoVideo>
        <PlayerContainer>
          <Player filename={filename} />
        </PlayerContainer>
        <Header>
          <TitleContainer>
            <Title>{videoData.title}</Title>
            <Views>
              0 Visualizações
              <VideoDate> · há {dateFormat(videoData.creationDate)}</VideoDate>
            </Views>
          </TitleContainer>

          <Interation>
            <ContainerVotes>
              <InteractionButton>
                <BiChevronUp />
              </InteractionButton>
              <VotesCount>{videoData.votesCount}</VotesCount>
              <InteractionButton>
                <BiChevronDown />
              </InteractionButton>
            </ContainerVotes>

            <Button
              background="#F0F2F5"
              padding={10}
              fontSize={0.8}
              borderradius={20}
              hoverbackground="#F0F2F5"
              fontcolor="#000"
              fontWeight={500}
              marginright={5}
            >
              <BiShareAlt />
              <TitleButton>Compartilhar</TitleButton>
            </Button>

            <Button
              background="#F0F2F5"
              padding={10}
              fontSize={0.8}
              borderradius={20}
              hoverbackground="#F0F2F5"
              fontcolor="#000"
              fontWeight={500}
              marginright={5}
            >
              <BiAddToQueue />
              <TitleButton>Salvar</TitleButton>
            </Button>

            <Button
              background="#F0F2F5"
              padding={10}
              fontSize={0.8}
              borderradius={20}
              hoverbackground="#F0F2F5"
              fontcolor="#000"
              fontWeight={500}
            >
              <BiDotsHorizontalRounded />
            </Button>
          </Interation>
        </Header>

        <Separator />

        <Owner>
          <Avatar
            src={videoData.owner.profilePhoto}
            sx={{ width: "40px", height: "40px" }}
            variant="circle"
          />
          <Username>{videoData.owner.username}</Username>
        </Owner>
      </InfoVideo>

      <RecommendationsContainer>
        {videosRecommendation.map((video) => (
          <ItemRecommendation key={video.id} onClick={() => navigate(`/watch/${video.fileName}`)}>
            <Thumbnail src={showThumbnail + `/videos/thumbnail?thumbnailFileName=${video.thumbnail[0]?.fileName}&videoFileName=${video.fileName}`} />
            <Views>
              <TitleRecommendation>{video.title}</TitleRecommendation>
              <OwnerRecommendation>
                <UsernameRecommendation>
                  {video.owner.username}
                </UsernameRecommendation>
              </OwnerRecommendation>
              0 Visualizações
              <VideoDate> · há {dateFormat(video.creationDate)}</VideoDate>
            </Views>
          </ItemRecommendation>
        ))}
      </RecommendationsContainer>
    </Container>
  );
}
