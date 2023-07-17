import React, { useState } from "react";
import { dateFormat } from "../../../utils/FormatDateInfo";
import { Link } from "react-router-dom";
import ModalPost from "../../Generics/ModalPost";
import FocusPost from "../FocusPost";
import MDEditor from "@uiw/react-md-editor";

import {
  Container,
  ContainerContent,
  Info,
  Language,
  LanguageContainer,
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
        {/* post.image && <ImagePost src={post.image} alt="Imagem do post" /> */}
        <Info>
          <PostInfo>
          <Owner>
              <Link to={`/profile/${post.owner.username}`}>
                <Username>{post.owner.username}</Username>
              </Link>
    
              <PostDate>· {dateFormat(post.creationDate)}</PostDate>
            </Owner>


          <LanguageContainer>
            {post.languages?.map((language) => (
              <Language key={language.id} src={language.icon}/>
            ))}
          </LanguageContainer>

          </PostInfo>

          <Title>{post.title}</Title>

          <PostBody>
            <MDEditor.Markdown source={post.body} style={{ background: "#fff", color: "#000" }} />
          </PostBody>
        </Info>
      </ContainerContent>
    </Container>
  );
}
