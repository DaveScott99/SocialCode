import React, { useState, useEffect } from "react";
import { validateTextPost } from "../../../utils/Validators";
import { Button } from "../../Generics/Button/Button";
import MDEditor, { commands } from "@uiw/react-md-editor";
import Select from "react-select";

import { Container, Others, TextEditorContainer, TitleInput } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { publishPost } from "../../../redux/post/actions";

const languages = [
  {
    id: 1,
    name: "Java",
  },
  {
    id: 2,
    name: "Python",
  },
  {
    id: 3,
    name: "JavaScript",
  },
];

export default function NewPost() {

  const { postsFeed } = useSelector(rootReducer => rootReducer.postReducer);
  
  const dispatch = useDispatch();

  console.log(postsFeed);

  const [value, setValue] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [title, setTitle] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    body: value,
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
    }
    setNewPost(updatedPost);
    localStorage.setItem("current-newPost", JSON.stringify(updatedPost));
  }

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

  const insertPost = () => {
    
    dispatch(publishPost(JSON.parse(localStorage.getItem("current-newPost"))));

    //await publishPost(JSON.parse(localStorage.getItem("current-newPost")));
    //window.location.reload();
  };

  const validatorInput = () => {
    return validateTextPost(newPost.body);
  };

  return (
    <Container>
      <h1>Publicar novo conteúdo</h1>

      <TitleInput placeholder="Título" onChange={handleChangeTitle} value={title}/>

      <Select
        placeholder="Selecione tecnologias"
        options={languages}
        isMulti
        value={selectedLanguages}
        onChange={handleLanguageChange}
        getOptionLabel={(language) => language.name}
        getOptionValue={(language) => language.id}
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
      
    </Container>
  );
}
