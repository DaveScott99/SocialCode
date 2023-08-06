import React from "react";
import {
  AwarenessNoticeContainer,
  ButtonUpload,
  Container,
  ContainerInput,
  Input,
  Preview,
  SelectFile,
  TextWarning,
} from "./styles";
import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiWarning } from "react-icons/ci";
import UploadVideoForm from "../../components/Forms/UploadVideoForm";

export default function PublishVideo() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(file);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  };

  console.log(selectedVideo);

  return (
    <Container>
      <h1>Publicar um novo vídeo</h1>

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

      {selectedVideo ? <UploadVideoForm /> : null}

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
