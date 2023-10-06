import React, { useState } from "react";
import Player from "../../components/Player";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { nextVideo } from "../../redux/video/actions";
import { useQuery } from "@tanstack/react-query";
import { findAllVideos, findVideoByFileName } from "../../services/Api";
import Loading from "../../components/Generics/Loading/Loading";
import { Button } from "../../components/Generics/Button/Button";
import { dateFormat } from "../../utils/FormatDateInfo";
import DropDownMenu from "../../components/Generics/DropDownMenu";
import {
  Container,
  ContainerVotes,
  DescriptionContainer,
  Header,
  InfoVideo,
  InteractionButton,
  Interation,
  ItemRecommendation,
  Language,
  LanguageContainer,
  OwnerRecommendation,
  PlayerContainer,
  RecommendationsContainer,
  SubMenuItem,
  Thumbnail,
  Title,
  TitleButton,
  TitleContainer,
  TitleRecommendation,
  Username,
  UsernameRecommendation,
  VideoDate,
  Views,
} from "./styles";
import {
  BiAddToQueue,
  BiShareAlt,
  BiDotsHorizontalRounded,
  BiLike,
} from "react-icons/bi";
import ModalPlaylist from "../../components/Generics/ModalPlaylist";

export default function Watch() {
  const { filename } = useParams();
  const [videosRecommendation, setVideosRecommendation] = useState([]);
  const [showModalSave, setShowModalSave] = useState(false);
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
              <Username>{videoData.owner.username}</Username>
              <VideoDate>- há {dateFormat(videoData.creationDate)}</VideoDate>
            </Views>
          </TitleContainer>

          <Interation>
            <ContainerVotes>
              <InteractionButton>
                <BiLike />
              </InteractionButton>
            </ContainerVotes>

            <Button
              background="#F7F9F9"
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
              background="#F7F9F9"
              padding={10}
              fontSize={0.8}
              borderradius={20}
              hoverbackground="#F0F2F5"
              fontcolor="#000"
              fontWeight={500}
              marginright={5}
              onClick={() => setShowModalSave(!showModalSave)}
            >
              <BiAddToQueue />
              <TitleButton>Salvar</TitleButton>
            </Button>

            {
              showModalSave ? 
                <ModalPlaylist onClose={() => setShowModalSave(false)} videoFileName={videoData.fileName}/>
              : null
            }

            <DropDownMenu
              iconMenu={
                <Button
                  background="#F7F9F9"
                  padding={10}
                  fontSize={0.8}
                  borderradius={20}
                  hoverbackground="#F0F2F5"
                  fontcolor="#000"
                  fontWeight={500}
                >
                  <BiDotsHorizontalRounded />
                </Button>
              }
            >
              <SubMenuItem>Denunciar</SubMenuItem>
            </DropDownMenu>
          </Interation>
        </Header>

        <DescriptionContainer>
          <LanguageContainer>
            {videoData.languages?.map((language) => (
              <Language key={language.id} src={language.icon} />
            ))}
          </LanguageContainer>
        </DescriptionContainer>
      </InfoVideo>

      <RecommendationsContainer>
        {videosRecommendation?.map((video) => (
          <ItemRecommendation
            key={video.id}
            onClick={() => navigate(`/watch/${video.fileName}`)}
          >
            <Thumbnail
              src={
                showThumbnail +
                `/videos/thumbnail?thumbnailFileName=${video.thumbnail[0]?.fileName}&videoFileName=${video.fileName}`
              }
            />
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
