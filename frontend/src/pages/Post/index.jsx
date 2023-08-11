import { FiMoreHorizontal } from "react-icons/fi";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  publishNewComent,
  selectPost,
  unvotePost,
  votePost,
} from "../../redux/post/actions";
import { downVotePost, upVotePost } from "../../services/Feed";
import { findPostById, publishComent } from "../../services/Api";
import { Link, useParams } from "react-router-dom";
import { dateFormat } from "../../utils/FormatDateInfo";
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { Button } from "../../components/Generics/Button/Button";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import ModalDialog from "../../components/Generics/ModalDialog";
import ModalPost from "../../components/Generics/ModalPost";
import DialogConfirmation from "../../components/Generics/DialogConfirmation";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Generics/Loading/Loading";

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

export default function Post() {
  const { title } = useParams();

  const { user } = useContext(AuthContext);

  const [showSubMenuPost, setShowSubMenuPost] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [showBtnComent, setShowBtnComent] = useState(true);
  const [editorIsOpen, setEditorIsOpen] = useState(false);
  const [comentBody, setComentBody] = useState("");
  const [newComent, setNewComent] = useState({
    text: "",
    post: {
      id: title,
    },
    user: {
      id: user.id,
      username: user.username,
      profilePhoto: user.profilePhoto,
    },
  });

  const dispatch = useDispatch();

  const { isLoading } = useQuery([title], async () => {
    const postData = await findPostById(title);
    dispatch(selectPost(postData.data));
    return postData;
  }, {staleTime: 2000 * 100});

  const { currentPost } = useSelector((rootReducer) => rootReducer.postReducer);

  const handleVoteClick = (postId) => {
    if (currentPost.votedByUser) {
      console.log("Já votou");
    } else {
      const newVotes = currentPost.votesCount + 1;
      dispatch(votePost(postId, newVotes));
      upVotePost(postId, user.id);
    }
  };

  const handleUnvoteClick = (postId) => {
    if (!currentPost.votedByUser) {
      console.log("Já retirou o voto");
    } else {
      if (currentPost.votesCount > 0) {
        const newVotes = currentPost.votesCount - 1;
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
      dispatch(publishNewComent(currentPost.id, newComent));
      setComentBody("");
      setNewComent({
        text: "",
        post: {
          id: currentPost.id,
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
        id: currentPost.id,
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

  if (isLoading) {
    return <Loading color="#FFF" />;
  }

  return (
    <Container>
      <Info>
        <PostInfo>
          <PostHeader>
            <Owner>
              <Link to={`/profile/${currentPost.owner.username}`}>
                <Username>{currentPost.owner.username}</Username>
              </Link>
              <PostDate>· {dateFormat(currentPost.creationDate)}</PostDate>
            </Owner>

            <MoreButton onClick={handleOpenSubMenuPost}>
              <FiMoreHorizontal />
            </MoreButton>

            {showSubMenuPost && (
              <ModalPost onClose={() => setShowSubMenuPost(false)}>
                <SubMenuContainer>
                  <SubMenuContent>
                    <SubMenuItem>Salvar</SubMenuItem>
                    {currentPost.owner.id === user.id && (
                      <SubMenuItem>Excluir publicação</SubMenuItem>
                    )}
                  </SubMenuContent>
                </SubMenuContainer>
              </ModalPost>
            )}
          </PostHeader>

          <PostBody>
            <Title>{currentPost.title}</Title>

            <MDEditor.Markdown source={currentPost.body} />
          </PostBody>
        </PostInfo>

        <ContainerVotes>
          <InteractionButton>
            <MdOutlineKeyboardArrowUp
              onClick={() => handleVoteClick(currentPost.id)}
            />
          </InteractionButton>

          <VotesCount>{currentPost.votesCount}</VotesCount>

          <InteractionButton>
            <MdKeyboardArrowDown
              onClick={() => handleUnvoteClick(currentPost.id)}
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

        {/*currentPost.coments.map((coment) => (
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
        )) */}
      </CommentContainer>
    </Container>
  );
}
