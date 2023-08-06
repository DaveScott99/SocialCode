import React from "react";
import { ButtonUpload, ContainerForm, ContainerInput, Form, Image, Input, Picture, Preview, ProportionThumbnail, TitleUploadThumbnail } from "./styles";
import { Button } from "../../Generics/Button/Button";
import TextField from "../../Generics/TextField/TextField";
import TextArea from "../../Generics/TextArea/TextArea";
import { useState } from "react";
import { TbPhotoUp } from "react-icons/tb"
import { useQuery } from "@tanstack/react-query";
import { findLanguages } from "../../../services/Api";
import Select from "react-select";

export default function UploadVideoForm({ filename }) {

  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    thumbnail: "",
    fileName: filename,
    languages: [],
  })

  const { data: languages } = useQuery(["languages"], () => findLanguages(), {staleTime: 5000*1000});

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

  }

  const handleLanguageChange = (selectedLanguage) => {
    setSelectedLanguages(selectedLanguage);
    const updatedPost = { ...newVideo, languages: selectedLanguage };
    setNewVideo(updatedPost);
  };

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setNewVideo({ ...newVideo, [name]: value });
  };

  return (
    <ContainerForm>
      <ContainerInput className="input-user-avatar-container">
        <Picture className="picture-user-avatar" tabIndex="0">
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
                <TitleUploadThumbnail>Fazer upload da miniatura</TitleUploadThumbnail>
                <ProportionThumbnail>Tamanho ideal 1.280 px por 720 px (uma proporção de 16:9)</ProportionThumbnail>
              </ButtonUpload>
            )}
          </Preview>
        </Picture>
        
      </ContainerInput>

      <Form className="form-credentials">
        <TextField type="text" fieldName="Título (Obrigatório)" name="title" onChange={onChangeInput} />
        <TextArea name="description" fieldName="Descrição" onChange={onChangeInput}/>

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

        <Button
          type="button"
          fontSize="1"
          padding="10"
          borderradius="5"
          fontWeight="bold"
          justify="center"
        >
          Salvar
        </Button>
    </ContainerForm>
  );
}
