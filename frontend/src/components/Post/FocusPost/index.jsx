import React from "react";
import { MdOutlineKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { dateFormat } from "../../../utils/FormatDateInfo";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unvotePost, votePost } from "../../../redux/post/actions";

import {
  Body,
  Container,
  ContainerContent,
  ContainerVotes,
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

export default function FocusPost({ postData }) {
  const dispatch = useDispatch();

  const handleVoteClick = (postId) => {
    if (postData.votedByUser) {
      console.log("Já votou");
    } else {
      const newVotes = postData.votesCount + 1;
      dispatch(votePost(postId, newVotes));
    }
  };

  const handleUnvoteClick = (postId) => {
    if (!postData.votedByUser) {
      console.log("Já retirou o voto");
    } else {
      if (postData.votesCount > 0) {
        const newVotes = postData.votesCount - 1;
        dispatch(unvotePost(postId, newVotes));
      }
    }
  };
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
          <MdOutlineKeyboardArrowUp
            onClick={() => handleVoteClick(postData.id)}
          />
        </InteractionButton>

        <VotesCount>{postData.votesCount}</VotesCount>

        <InteractionButton>
          <MdKeyboardArrowDown onClick={() => handleUnvoteClick(postData.id)} />
        </InteractionButton>
      </ContainerVotes>
    </Container>
  );
}
