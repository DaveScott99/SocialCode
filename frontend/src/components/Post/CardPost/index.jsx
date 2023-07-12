import { Avatar } from "@mui/material";
import { dateFormat } from "../../../utils/FormatDateInfo";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

import {
  CardBody,
  Container,
  ContainerContent,
  ContainerVotes,
  ImagePost,
  Info,
  InteractionButton,
  Language,
  Owner,
  PostDate,
  PostInfo,
  Username,
  VotesCount,
} from "./styles";
import { useState } from "react";

export function CardPost({ post }) {
  const [votesCount, setVotesCount] = useState(0);

  const handleClickUpVote = () => {
    setVotesCount(votesCount + 1);
  }

  const handleClickDownVote = () => {
    if (votesCount > 0) {
        setVotesCount(votesCount - 1);
    }
  }

  return (
    <Container>
      <ContainerVotes>
        <InteractionButton>
          <MdOutlineKeyboardArrowUp onClick={handleClickUpVote}/>
        </InteractionButton>

        <VotesCount>{votesCount}</VotesCount>

        <InteractionButton>
          <MdKeyboardArrowDown onClick={handleClickDownVote}/>
        </InteractionButton>
      </ContainerVotes>

      <ContainerContent>
        {post.imagePost && (
          <ImagePost src={post.imagePost} alt="Imagem do post" />
        )}

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

          <CardBody>{post.body}</CardBody>
        </Info>
      </ContainerContent>
    </Container>
  );
}
