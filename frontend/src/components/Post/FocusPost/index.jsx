import React, { useContext } from "react";
import { MdOutlineKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { dateFormat } from "../../../utils/FormatDateInfo";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unvotePost, votePost } from "../../../redux/post/actions";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { downVotePost, upVotePost } from "../../../services/Feed";
import MDEditor from "@uiw/react-md-editor";

import {
  Comment,
  CommentBody,
  CommentContainer,
  CommentOwner,
  Container,
  ContainerContent,
  ContainerVotes,
  Info,
  InteractionButton,
  Owner,
  PostBody,
  PostDate,
  PostInfo,
  Title,
  Username,
  VotesCount,
} from "./styles";

export default function FocusPost({ postData }) {
  const { user } = useContext(AuthContext);

  const dispatch = useDispatch();

  const handleVoteClick = (postId) => {
    if (postData.votedByUser) {
      console.log("Já votou");
    } else {
      const newVotes = postData.votesCount + 1;
      dispatch(votePost(postId, newVotes));
      upVotePost(postId, user.id);
    }
  };

  const handleUnvoteClick = (postId) => {
    if (!postData.votedByUser) {
      console.log("Já retirou o voto");
    } else {
      if (postData.votesCount > 0) {
        const newVotes = postData.votesCount - 1;
        dispatch(unvotePost(postId, newVotes));
        downVotePost(postId, user.id);
      }
    }
  };
  return (
    <Container>
      <Info>
        <PostInfo>
          <Owner>
            <Link to={`/profile/${postData.owner.username}`}>
              <Username>{postData.owner.username}</Username>
            </Link>
            <PostDate>· {dateFormat(postData.creationDate)}</PostDate>
          </Owner>
          <PostBody>
            <Title>{postData.title}</Title>

            <MDEditor.Markdown
              source={postData.body}
              style={{ background: "#fff", color: "#000" }}
            />
          </PostBody>
        </PostInfo>

        <ContainerVotes>
          <InteractionButton>
            <MdOutlineKeyboardArrowUp
              onClick={() => handleVoteClick(postData.id)}
            />
          </InteractionButton>

          <VotesCount>{postData.votesCount}</VotesCount>

          <InteractionButton>
            <MdKeyboardArrowDown
              onClick={() => handleUnvoteClick(postData.id)}
            />
          </InteractionButton>
        </ContainerVotes>
      </Info>

      <CommentContainer>

        {postData.coments.map((coment) => (
          <Comment key={coment.id}>
            <CommentOwner>
              <Link to={`/profile/${postData.owner.username}`}>
                <Username>{coment.user.username}</Username>
              </Link>
              <PostDate>· {dateFormat(coment.creationDate)}</PostDate>
            </CommentOwner>
            <CommentBody>
            <MDEditor.Markdown
              source={coment.text}
              style={{ background: "#fff", color: "#000" }}
            />
          </CommentBody>
          </Comment>
        ))}

      </CommentContainer>
    </Container>
  );
}
