import React from "react";
import { dateFormat } from "../../../utils/FormatDateInfo";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  return (
    <Container>
      <ContainerContent>
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
                <Language>{language.name}</Language>
              ))}
            </LanguageContainer>
          </PostInfo>

          <Title onClick={() => navigate(`/post/${post.title}`)}>
            {post.title}
          </Title>

          <PostBody>
            <MDEditor.Markdown source={post.body} />
          </PostBody>
        </Info>
      </ContainerContent>
    </Container>
  );
}
