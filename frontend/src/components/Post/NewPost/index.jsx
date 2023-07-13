import React, { useContext, useState, useEffect } from "react";
import { validateTextPost } from "../../../utils/Validators";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { publishPost } from "../../../services/Api";
import { Button } from "../../Generics/Button/Button";
import MDEditor, { commands } from "@uiw/react-md-editor";

import {
  Container,
  Others,
  TextEditorContainer,
  TitleInput,
} from "./styles";

export default function NewPost() {
  const { user } = useContext(AuthContext);

  const [value, setValue] = React.useState();
  const [loading, setLoading] = useState(true);

  const [newPost, setNewPost] = useState({
    title: "",
    body: value,
    languages: [],
  });

  useEffect(() => {
    const storedPost = JSON.parse(localStorage.getItem("current-newPost"));
    if (storedPost) {
      setNewPost(storedPost);
      setValue(storedPost.body);
    }
  }, []);

  const handleValueChange = (newValue) => {
    setValue(newValue);

    const updatedPost = {
      ...newPost,
      body: newValue,
    };
    setNewPost(updatedPost);
    localStorage.setItem("current-newPost", JSON.stringify(updatedPost));
  };

  const insertPost = async () => {
    await publishPost(JSON.parse(localStorage.getItem("current-newPost")));
    window.location.reload();
  };

  const validatorInput = () => {
    return validateTextPost(newPost.body);
  };

  return (
    <Container>

        <h1>Publicar novo conteúdo</h1>

        <TitleInput placeholder="Título"/>

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
            disabled={loading === true || !validatorInput()}
          >
            Publicar
          </Button>

        </Others>

    </Container>
  );
}
