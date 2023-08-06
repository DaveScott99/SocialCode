import React, { useContext, useEffect } from "react";
import {
  AwarenessNoticeContainer,
  ButtonUpload,
  Container,
  ContainerInput,
  Input,
  MessageProgress,
  Preview,
  Progress,
  ProgressBarContainer,
  SelectFile,
  TextWarning,
} from "./styles";
import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiWarning } from "react-icons/ci";
import UploadVideoForm from "../../components/Forms/UploadVideoForm";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { api } from "../../services/Api";

export default function PublishVideo() {
  const { user } = useContext(AuthContext);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [progressUpload, setProgressUpload] = useState(0);
  const [videoOnUpload, setVideoOnUpload] = useState(null);

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(file);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (selectedVideo) {
      const formData = new FormData();
      formData.append("file", selectedVideo);

      api
        .post(`/videos?ownerId=${user.id}`, formData, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgressUpload(progress);
          },
        })
        .then((response) => setVideoOnUpload(response.data))
        .catch((err) => console.log(err));
    }
  }, [selectedVideo, user.id]);

  //console.log(videoOnUpload);

  return (
    <Container>
      <h1>Publicar um novo vídeo</h1>

      {progressUpload > 0 ? (
        <ProgressBarContainer>
          <Progress type="range" value={progressUpload} min="0" max="100" />
          <MessageProgress>
            {progressUpload < 100
              ? progressUpload + "%"
              : videoOnUpload !== null
              ? "Vídeo enviado com succeso!"
              : "Processando até SD..."}
          </MessageProgress>
        </ProgressBarContainer>
      ) : null}

      {!selectedVideo ? (
        <ContainerInput>
          <SelectFile tabIndex="0">
            <Input
              type="file"
              accept="video/mp4"
              onChange={handleVideoChange}
            />
            <Preview>
              <ButtonUpload>
                <AiOutlineCloudUpload />
                <span>Selecionar vídeo</span>
              </ButtonUpload>
            </Preview>
          </SelectFile>
        </ContainerInput>
      ) : null}

      {selectedVideo ? <UploadVideoForm videoOnUpload={videoOnUpload} /> : null}

      <AwarenessNoticeContainer>
        <CiWarning />
        <TextWarning>
          Ao fazer o upload do seu vídeo, assegure-se de respeitar nossas
          diretrizes de conteúdo e evitar material ofensivo, ilegal ou com
          direitos autorais não autorizados. Contribua para uma comunidade
          positiva e segura.
        </TextWarning>
      </AwarenessNoticeContainer>
    </Container>
  );
}
