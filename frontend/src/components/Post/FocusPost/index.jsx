import React from "react";
import { MdOutlineKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

import {
  Body,
  Container,
  ContainerContent,
  ContainerVotes,
  ImagePost,
  Info,
  InteractionButton,
  Language,
  Owner,
  PostBody,
  PostDate,
  PostInfo,
  Title,
  Username,
  VotesCount,
} from "./styles";
import { dateFormat } from "../../../utils/FormatDateInfo";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function FocusPost({ postData }) {
  return (
    <Container>
      <ContainerContent>
        <Info>
          <PostInfo>
            <Owner>
              <Link to={`/profile/${postData.owner.username}`}>
                <Username>{postData.owner.username}</Username>
              </Link>
              <PostDate>· {dateFormat(postData.creationDate)}</PostDate>
            </Owner>
          </PostInfo>
          <PostBody>
            <Title>{postData.title}</Title>
            <Body>{postData.body}</Body>
          </PostBody>
        </Info>
      </ContainerContent>

      <ContainerVotes>
        <InteractionButton>
          <MdOutlineKeyboardArrowUp />
        </InteractionButton>

        <VotesCount>{postData.votesCount}</VotesCount>

        <InteractionButton>
          <MdKeyboardArrowDown />
        </InteractionButton>
      </ContainerVotes>
    </Container>
  );
}
