import React, { useEffect } from "react";
import {
  Attachs,
  ButtonUpload,
  ContainerForm,
  DescriptionInput,
  Form,
  Header,
  Image,
  Input,
  Main,
  MessageProgress,
  OptionSelect,
  Preview,
  Progress,
  ProgressBarContainer,
  ProportionThumbnail,
  SelectVisibility,
  Thumbnail,
  ThumbnailContainer,
  TitleInput,
  TitleUploadThumbnail,
  VideoInformations,
  WarningThumbnail,
  WarningVideo,
} from "./styles";
import { Button } from "../../Generics/Button/Button";
import { useState } from "react";
import { TbPhotoUp } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import {
  findLanguages,
  updateVideo,
  uploadThumbnail,
} from "../../../services/Api";
import Select from "react-select";
import { validateTitleVideo } from "../../../utils/Validators";
import { HiStar } from "react-icons/hi";

export default function UploadVideoForm({ videoOnUpload, progressUpload }) {
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    fileName: "",
    languages: [],
  });

  const { data: languages } = useQuery(["languages"], () => findLanguages(), {
    staleTime: 5000 * 1000,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedThumbnail(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (videoOnUpload && selectedThumbnail) {
      uploadThumbnail(selectedThumbnail, videoOnUpload.fileName);
    }
  }, [selectedThumbnail, videoOnUpload]);

  const handleLanguageChange = (selectedLanguage) => {
    setSelectedLanguages(selectedLanguage);
    const updatedPost = { ...newVideo, languages: selectedLanguage };
    setNewVideo(updatedPost);
  };

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setNewVideo({ ...newVideo, [name]: value });
  };

  console.log(newVideo);

  useEffect(() => {
    if (videoOnUpload) {
      setNewVideo({
        ...newVideo,
        fileName: videoOnUpload.fileName,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoOnUpload]);

  const handleSaveVideo = () => {
    if (newVideo.fileName.length > 1) {
      updateVideo(newVideo, videoOnUpload.id);
    }
  };

  const validatorInput = () => {
    return videoOnUpload && validateTitleVideo(newVideo.title);
  };

  return (
    <ContainerForm>
      <ThumbnailContainer>
        <Thumbnail>
          <Input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageChange}
          />

          <Preview>
            {previewImage ? (
              <Image src={previewImage} alt="Preview" />
            ) : (
              <ButtonUpload>
                <TbPhotoUp />
                <TitleUploadThumbnail>
                  Fazer upload da miniatura
                </TitleUploadThumbnail>
                <ProportionThumbnail>
                  Tamanho ideal 1.280 px por 720 px (uma proporção de 16:9)
                </ProportionThumbnail>
              </ButtonUpload>
            )}
          </Preview>
        </Thumbnail>
        <WarningThumbnail>O tamanho máximo do arquivo é 2MB.</WarningThumbnail>
      </ThumbnailContainer>

      <VideoInformations>
        <Header>
          <ProgressBarContainer>
            <Progress type="range" value={progressUpload} min="0" max="100" />
            <MessageProgress>
              {progressUpload < 100
                ? "Enviando " + progressUpload + "%"
                : videoOnUpload !== null
                ? "Vídeo enviado com succeso!"
                : "Processando até SD..."}
            </MessageProgress>
          </ProgressBarContainer>
          <Button
            type="submit"
            fontSize="1"
            padding="5"
            width={20}
            fontWeight="bold"
            justify="center"
            onClick={handleSaveVideo}
            disabled={!validatorInput()}
            marginleft={10}
          >
            Publicar
          </Button>
        </Header>

        {progressUpload < 100 ? (
          <WarningVideo>
            <HiStar />
            Seu video ainda está sendo enviado. Deixe essa página aberta até a
            conclusão.
          </WarningVideo>
        ) : null}

        <Main>
          <Form className="form-credentials">
            <TitleInput
              placeholder="Título (Obrigatório)"
              type="text"
              name="title"
              onChange={onChangeInput}
              required
            />
            <DescriptionInput
              placeholder="Descrição"
              name="description"
              onChange={onChangeInput}
            />

            <Select
              placeholder="Selecione tecnologias"
              options={languages}
              isMulti
              value={selectedLanguages}
              onChange={handleLanguageChange}
              getOptionLabel={(language) => language.name}
              getOptionValue={(language) => language.id}
              com
            />
          </Form>

          <Attachs>
            <SelectVisibility name="visibility">
              <OptionSelect value="public">Público</OptionSelect>
              <OptionSelect value="private">Privado</OptionSelect>
            </SelectVisibility>

            <Button
              type="button"
              fontSize=".9"
              padding="10"
              width={100}
              fontWeight="bold"
              background="#FFF"
              fontcolor="#000"
              hoverbackground="#FFF"
              borderradius={5}
            >
              + Adicionar à playlist
            </Button>
          </Attachs>
        </Main>
      </VideoInformations>
    </ContainerForm>
  );
}
