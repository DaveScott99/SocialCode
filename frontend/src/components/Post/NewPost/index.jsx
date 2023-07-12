import React, { useContext, useState } from "react";
import { validateTextPost } from "../../../utils/Validators";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { publishPost } from "../../../services/Api";
import { Avatar } from "@mui/material";
import { Button } from "../../Generics/Button/Button";
import Modal from "../../Generics/Modal/Modal";
import TextArea from "../../Generics/TextArea/TextArea";

import {
  Container,
  ContentModal,
  HeaderModal,
  MainContent,
  Others,
  UserImage,
  Username,
} from "./styles";

export default function NewPost() {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({
    body: "",
    owner: {
      id: user.id,
    },
  });

  const onChange = (event) => {
    setLoading(false);
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const insertPost = async () => {
    await publishPost(post);
    window.location.reload();
  };

  const validatorInput = () => {
    return validateTextPost(post.body);
  };

  return (
    <Container>
      <MainContent>
        <UserImage>
          <Avatar
            alt="User image"
            src={user.profilePhoto}
            sx={{ width: 40, height: 40 }}
          />
        </UserImage>

        <Modal
          title="Criar publicação"
          textButton="No que está pensando?"
          buttonBackground="#F0F2F5"
          buttonBorderRadius="10"
          buttonFontColor="#969696"
          buttonFontSize=".9"
          buttonFontWeight="300"
          buttonWidth="100"
          buttonHoverBackground="#e4e9eec6"
          buttonPadding="5"
        >
          <ContentModal className="body">
            <HeaderModal>
              <Avatar
                alt="User image"
                src={user.profilePhoto}
                sx={{ width: 40, height: 40 }}
              />
              <Username>{user.username}</Username>
            </HeaderModal>

            <TextArea
              name="body"
              placeholder="No que está pensando?"
              onChange={onChange}
              background="#FFF"
              padding="10"
              height="150"
            />

            <Others></Others>

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
          </ContentModal>
        </Modal>
      </MainContent>
    </Container>
  );
}
