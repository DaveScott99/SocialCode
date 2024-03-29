import React, { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { dateFormat } from "../../../utils/FormatDateInfo";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  publishNewComent,
  unvotePost,
  votePost,
} from "../../../redux/post/actions";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { downVotePost, upVotePost } from "../../../services/Feed";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { Button } from "../../Generics/Button/Button";
import { publishComent } from "../../../services/Api";
import { FiMoreHorizontal } from "react-icons/fi";

import {
  Comment,
  CommentBody,
  CommentContainer,
  CommentContent,
  CommentOwner,
  Container,
  ContainerButton,
  ContainerVotes,
  Info,
  InteractionButton,
  MoreButton,
  NewComment,
  Owner,
  PostBody,
  PostDate,
  PostHeader,
  PostInfo,
  SubMenuContainer,
  SubMenuContent,
  SubMenuItem,
  TextEditorContainer,
  Title,
  Username,
  VotesCount,
} from "./styles";
import ModalDialog from "../../Generics/ModalDialog";
import DialogConfirmation from "../../Generics/DialogConfirmation";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function FocusPost({ postData }) {
  const { user } = useContext(AuthContext);

  const [showSubMenuPost, setShowSubMenuPost] = useState(false);
  const subMenuRef = useRef(null);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [showBtnComent, setShowBtnComent] = useState(true);
  const [editorIsOpen, setEditorIsOpen] = useState(false);
  const [comentBody, setComentBody] = useState("");
  const [newComent, setNewComent] = useState({
    text: "",
    post: {
      id: postData.id,
      body: postData.body,
    },
    user: {
      id: user.id,
      username: user.username,
      profilePhoto: user.profilePhoto,
    },
  });

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

  const handleBodyComentChange = (newValue) => {
    setComentBody(newValue);

    const updateComent = {
      ...newComent,
      text: newValue,
    };
    setNewComent(updateComent);
  };

  const handleShowComentEditor = () => {
    setShowBtnComent(false);
    setEditorIsOpen(true);
  };

  const handleClickPublishComent = async () => {
    const { data } = await publishComent(newComent);

    console.log(data);

    if (data) {
      dispatch(publishNewComent(postData.id, newComent));
      setComentBody("");
      setNewComent({
        text: "",
        post: {
          id: postData.id,
        },
        user: {
          id: user.id,
        },
      });
      setShowBtnComent(true);
      setEditorIsOpen(false);
    }
  };

  const handleShowConfirmationCancelComent = () => {
    setIsModalCancel(true);
  };

  const handleCancelComent = () => {
    setComentBody("");
    setNewComent({
      text: "",
      post: {
        id: postData.id,
      },
      user: {
        id: user.id,
      },
    });
    setShowBtnComent(true);
    setEditorIsOpen(false);
    setIsModalCancel(false);
  };

  const handleOpenSubMenuPost = () => {
    setShowSubMenuPost(true);
  };

  useEffect(() => {
    const closeSubMenuOnClickOutside = (event) => {
      if (showSubMenuPost && !subMenuRef.current.contains(event.target)) {
        setShowSubMenuPost(false);
      }
    };

    document.addEventListener("mousedown", closeSubMenuOnClickOutside);

    return () => {
      document.removeEventListener("mousedown", closeSubMenuOnClickOutside);
    };
  }, [showSubMenuPost]);

  return (
    <Container>
      <Info>
        <PostInfo>
          <PostHeader>
            <Owner>
              <Link to={`/profile/${postData.owner.username}`}>
                <Username>{postData.owner.username}</Username>
              </Link>
              <PostDate>· {dateFormat(postData.creationDate)}</PostDate>
            </Owner>

            <MoreButton onClick={handleOpenSubMenuPost}>
              <FiMoreHorizontal />
            </MoreButton>

            {showSubMenuPost && (
              <SubMenuContainer ref={subMenuRef}>
                <SubMenuContent>
                  <SubMenuItem>Salvar</SubMenuItem>
                  {postData.owner.id === user.id && (
                    <SubMenuItem>Excluir publicação</SubMenuItem>
                  )}
                </SubMenuContent>
              </SubMenuContainer>
            )}
          </PostHeader>

          <PostBody>
            <Title>{postData.title}</Title>

            <ReactMarkdown>{postData.body}</ReactMarkdown>
  
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
          {showBtnComent && (
            <Button
              padding={10}
              borderradius={5}
              fontSize={0.8}
              onClick={handleShowComentEditor}
            >
              Responder
            </Button>
          )}

          {editorIsOpen && (
            <TextEditorContainer data-color-mode="light">
              <MDEditor
                value={comentBody}
                onChange={handleBodyComentChange}
                preview="edit"
                height={200}
                extraCommands={[
                  commands.codeEdit,
                  commands.codePreview,
                  commands.fullscreen,
                ]}
              />
              <ContainerButton>
                <Button
                  padding={10}
                  borderradius={5}
                  fontSize={0.8}
                  background="#fff"
                  fontcolor="#878787"
                  hoverbackground="#cdcdcd44"
                  onClick={handleShowConfirmationCancelComent}
                  marginright={10}
                >
                  Cancelar
                </Button>
                <Button
                  padding={10}
                  borderradius={5}
                  fontSize={0.8}
                  onClick={handleClickPublishComent}
                >
                  Publicar
                </Button>
              </ContainerButton>
            </TextEditorContainer>
          )}

          {isModalCancel ? (
            <ModalDialog>
              <DialogConfirmation
                title="Tem certeza que deseja sair da edição?"
                body="Os dados não salvos serão perdidos."
                onClose={() => setIsModalCancel(false)}
                functionIfYes={handleCancelComent}
              />
            </ModalDialog>
          ) : null}
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
