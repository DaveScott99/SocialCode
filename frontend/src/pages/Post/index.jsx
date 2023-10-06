import { FiMoreHorizontal } from "react-icons/fi";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComentsCurrentPost,
  publishNewComent,
  resetComents,
  selectPost,
  unvotePost,
  votePost,
} from "../../redux/post/actions";
import { downVotePost, upVotePost } from "../../services/Feed";
import { findComentsByPost, findComentsByPostTitle, findPostByTitle, publishComentPost } from "../../services/Api";
import { Link, useParams } from "react-router-dom";
import { dateFormat } from "../../utils/FormatDateInfo";
import { BiChevronDown, BiChevronUp } from  "react-icons/bi"
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
import { useEffect } from "react";

export default function Post() {
  const { title } = useParams();

  const { user } = useContext(AuthContext);

  const [currentPageComents, setCurrentPageComents] = useState(0);
  const [totalPagesComents, setTotalPagesComents] = useState(1);
  const [isFetchingComents, setIsFetchingComents] = useState(true);
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
    owner: {
      id: user.id,
      username: user.username,
      profilePhoto: user.profilePhoto,
    },
  });

  const dispatch = useDispatch();

  const { isLoading, refetch } = useQuery([title], async () => {
    const postData = await findPostByTitle(title, user.username);
    dispatch(selectPost(postData.data));
    return postData;
  },{
    staleTime: 2000 * 100,
    cacheTime: 0,
  });

  useEffect(() => {
    refetch();
    dispatch(resetComents());
  }, [dispatch, refetch])

  const { currentPost, comentsCurrentPost } = useSelector((rootReducer) => rootReducer.postReducer);
  
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {

        console.log("TESTE");

        if (currentPageComents < totalPagesComents) {
          setIsFetchingComents(true);
          findComentsByPostTitle(title, currentPageComents)
            .then((response) => {
              if (
                response.data &&
                !response.data.empty &&
                response.data.number < response.data.totalPages
              ) {
                dispatch(fetchComentsCurrentPost(response.data.content));
                setTotalPagesComents(response.data.totalPages);
                setCurrentPageComents((prevPage) => prevPage + 1);
              }
            })
            .finally(() => {
              setIsFetchingComents(false);
            });
        }
      }
    });
    intersectionObserver.observe(document.querySelector("#sentinel"));
    return () => intersectionObserver.disconnect();
  }, [currentPageComents, dispatch, title, totalPagesComents]);

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
    const { data } = await publishComentPost(newComent);

    console.log(data);

    if (data) {
      dispatch(publishNewComent(newComent));
      setComentBody("");
      setNewComent({
        text: "",
        post: {
          id: currentPost.id,
        },
        owner: {
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
            <BiChevronUp
              onClick={() => handleVoteClick(currentPost.id)}
            />
          </InteractionButton>

          <VotesCount>{currentPost.votesCount}</VotesCount>

          <InteractionButton>
            <BiChevronDown
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

        {comentsCurrentPost.map((coment) => (
          <Comment key={coment.id}>
            <ContainerVotes>
              <InteractionButton>
                <BiChevronUp />
              </InteractionButton>

              <VotesCount>{0}</VotesCount>

              <InteractionButton>
                <BiChevronDown />
              </InteractionButton>
            </ContainerVotes>

            <CommentContent>
              <CommentOwner>
                <Link to={`/profile/${coment.owner.username}`}>
                  <Username>{coment.owner.username}</Username>
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

        {isFetchingComents && <Loading color="#FFF" /> }
      </CommentContainer>
    </Container>
  );
}
