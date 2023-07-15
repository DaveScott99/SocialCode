import React, { useState, useEffect, useContext } from "react";
import { validateTextPost } from "../../../utils/Validators";
import { Button } from "../../Generics/Button/Button";
import MDEditor, { commands } from "@uiw/react-md-editor";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { publishPostOnRedux } from "../../../redux/post/actions";
import { useQuery } from "@tanstack/react-query";
import { findLanguages, publishPost } from "../../../services/Api";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import ModalDialog from "../../Generics/ModalDialog";
import Dialog from "../../Generics/Dialog";

import { Container, Others, TextEditorContainer, TitleInput } from "./styles";

export default function NewPost() {
  const { user } = useContext(AuthContext);
  const { data: languages } = useQuery(["languages"], () => findLanguages());
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [title, setTitle] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    languages: [],
  });


  useEffect(() => {
    const storedPost = JSON.parse(localStorage.getItem("current-newPost"));
    if (storedPost) {
      setNewPost(storedPost);
      setTitle(storedPost.title);
      setValue(storedPost.body);
      setSelectedLanguages(storedPost.languages);
    }
  }, []);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);

    const updatedPost = {
      ...newPost,
      title: event.target.value,
    };
    setNewPost(updatedPost);
    localStorage.setItem("current-newPost", JSON.stringify(updatedPost));
  };

  const handleValueChange = (newValue) => {
    setValue(newValue);

    const updatedPost = {
      ...newPost,
      body: newValue,
    };
    setNewPost(updatedPost);
    localStorage.setItem("current-newPost", JSON.stringify(updatedPost));
  };

  const handleLanguageChange = (selectedLanguage) => {
    setSelectedLanguages(selectedLanguage);
    const updatedPost = { ...newPost, languages: selectedLanguage };
    setNewPost(updatedPost);
    localStorage.setItem("current-newPost", JSON.stringify(updatedPost));
  };

  const insertPost = async () => {
    
    const response = await publishPost(
      JSON.parse(localStorage.getItem("current-newPost"))
    );

    if (response) {
      dispatch(
        publishPostOnRedux(JSON.parse(localStorage.getItem("current-newPost")))
      );

      const newPostForPublish = {
        title: "",
        body: "",
        owner: {
          id: user.id,
          username: user.username,
          profilePhoto: user.profilePhoto
        },
        languages: [],
        votesCount: 0,
        votedByUser: false,
      };

      localStorage.setItem("current-newPost", JSON.stringify(newPostForPublish));
      
      setIsModalVisible(true);
    }
  };

  const validatorInput = () => {
    return validateTextPost(newPost.body)
        && selectedLanguages.length > 0;
  };

  return (
    
    <Container>
      <h1>Publicar novo conteúdo</h1>

      <TitleInput
        placeholder="Título"
        onChange={handleChangeTitle}
        value={title}
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

      <TextEditorContainer data-color-mode="light">
        <MDEditor
          value={value}
          onChange={handleValueChange}
          preview="edit"
          height={400}
          extraCommands={[
            commands.codeEdit,
            commands.codePreview,
            commands.fullscreen,
          ]}
        />
      </TextEditorContainer>

      <Others>
        <Button
          type="submit"
          onClick={insertPost}
          width="100"
          fontSize="1"
          padding="10"
          borderradius="5"
          fontWeight="bold"
          justify="center"
          disabled={!validatorInput()}
        >
          Publicar
        </Button>
      </Others>

      {isModalVisible ? (
        <ModalDialog onClose={() => setIsModalVisible(false)}>
          <Dialog message="Publicado com sucesso" pagePath="/" />
        </ModalDialog>
      ) : null}

    </Container>
  );
}
