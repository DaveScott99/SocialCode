import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { dateFormat } from "../../../utils/FormatDateInfo";
import { Link } from "react-router-dom";
import ModalPost from "../../Generics/ModalPost";
import FocusPost from "../FocusPost";

import {
  Body,
  Container,
  ContainerContent,
  ImagePost,
  Info,
  Language,
  Owner,
  PostBody,
  PostDate,
  PostInfo,
  Title,
  Username,
} from "./styles";

export function CardPost({ post }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Container>
      {isModalVisible ? (
        <ModalPost onClose={() => setIsModalVisible(false)}>
          <FocusPost postData={post}/>
        </ModalPost>
      ) : null}

      <ContainerContent onClick={() => setIsModalVisible(true)}>
        {post.image && <ImagePost src={post.image} alt="Imagem do post" />}
        <Info>
          <PostInfo>
            <Owner>
              <Link to={`/profile/${post.owner.username}`}>
                <Avatar alt="User image" src={post.owner.profilePhoto} />
              </Link>

              <Link to={`/profile/${post.owner.username}`}>
                <Username>{post.owner.username}</Username>
              </Link>

              <PostDate>· {dateFormat(post.creationDate)}</PostDate>
            </Owner>

            {post.languages?.map((language) => (
              <Language key={language.id}>{language.name}</Language>
            ))}
          </PostInfo>
          <PostBody>
            <Title>{post.title}</Title>
            <Body>{post.body}</Body>
          </PostBody>
        </Info>
      </ContainerContent>
    </Container>
  );
}
