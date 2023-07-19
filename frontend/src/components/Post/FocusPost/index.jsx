import React, { useContext } from "react";
import { MdOutlineKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { dateFormat } from "../../../utils/FormatDateInfo";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unvotePost, votePost } from "../../../redux/post/actions";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { downVotePost, upVotePost } from "../../../services/Feed";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "../../Generics/Button/Button";

import {
  Comment,
  CommentBody,
  CommentContainer,
  CommentContent,
  CommentOwner,
  Container,
  ContainerVotes,
  Info,
  InteractionButton,
  NewComment,
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
        <NewComment>
          <Button padding={10} borderradius={5} fontSize={0.8}>
            Responder
          </Button>
        </NewComment>

        {postData.coments.map((coment) => (
          <Comment key={coment.id}>
            <ContainerVotes>
              <InteractionButton>
                <MdOutlineKeyboardArrowUp />
              </InteractionButton>

              <VotesCount>{0}</VotesCount>

              <InteractionButton>
                <MdKeyboardArrowDown />
              </InteractionButton>
            </ContainerVotes>

            <CommentContent>


            <CommentOwner>
              <Link to={`/profile/${coment.user.username}`}>
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
            </CommentContent>
          </Comment>
        ))}
      </CommentContainer>
    </Container>
  );
}
