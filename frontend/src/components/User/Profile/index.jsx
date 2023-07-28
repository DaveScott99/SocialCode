import React, { useContext, useEffect, useState } from "react";
import Container from "../../Generics/Container/Container";
import Feed from "../../Feed";
import { findPostsByOwner, followUser } from "../../../services/Api";
import { useQuery } from "@tanstack/react-query";
import InputAvatar from "../InputAvatar/InputAvatar";
import { Avatar } from "@mui/material";
import Modal from "../../Generics/Modal/Modal";
import { MdOutlineAddAPhoto } from "react-icons/md";
import Badge from "../../Generics/Badge/Badge";
import ConfigFollow from "../ConfigFollow/ConfigFollow";
import { Button } from "../../Generics/Button/Button";
import ConfigAccount from "../ConfigAccount/ConfigAccount";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { fetchProfileUser, verifyIsFollowing } from "../../../services/User";
import LoadingFullScreen from "../../Generics/LoadingFullScreen";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Generics/Loading/Loading";
import {
  fetchPostsUserToRedux,
  resetCurrentUserPosts,
  selectUser,
  setIsFollowing,
} from "../../../redux/user/actions";
import "./CardUserProfile.css";
import {
  Badges,
  ContainerFollowers,
  Followers,
  Footer,
  Header,
  Name,
  Title,
  UserAvatar,
  UserData,
  UserInfoContainer,
  Username,
} from "./styles";

export default function Profile({ username }) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const { currentUser, isFollowing, postsCurrentUser } = useSelector(
    (rootReducer) => rootReducer.userReducer
  );

  const dispatch = useDispatch();

  const { isLoading, refetch: refetchProfile } = useQuery(
    [username],
    async () => {
      const profile = await fetchProfileUser(username);
      const isFollowing = await verifyIsFollowing(user.username, username);
      if (profile) {
        dispatch(selectUser(profile));
        dispatch(setIsFollowing(isFollowing));
      }
      return profile;
    },
    {
      staleTime: 2000 * 100,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    refetchProfile();
    dispatch(resetCurrentUserPosts());
  }, [dispatch, refetchProfile, username]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        if (currentPage < totalPages) {
          setIsFetching(true);
          findPostsByOwner(username, currentPage)
            .then((response) => {
              if (
                response &&
                !response.empty &&
                response.number < response.totalPages
              ) {
                dispatch(fetchPostsUserToRedux(response.content));
                setTotalPages(response.totalPages);
                setCurrentPage((prevPage) => prevPage + 1);
              }
            })
            .finally(() => {
              setIsFetching(false);
            });
        }
      }
    });
    intersectionObserver.observe(document.querySelector("#sentinel"));
    return () => intersectionObserver.disconnect();
  }, [currentPage, dispatch, totalPages, username]);

  const handleClickFollow = async (followerId, userId) => {
    setLoading(true);
    try {
      await followUser(followerId, userId);
      dispatch(setIsFollowing(true));
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingFullScreen />;
  }

  return (
    <Container className="user-profile-container">
      <section className="user-profile-card">
        <article className="user-info">
          <UserInfoContainer>
            <UserAvatar>
              <Avatar
                src={currentUser.user_info.profilePhoto}
                sx={{ width: "200px", height: "200px" }}
                variant="rounded"
              />

              {user.id === currentUser.user_info.id ? (
                <Modal
                  textButton={<MdOutlineAddAPhoto />}
                  buttonBackground="#0000007b"
                  buttonPadding="10"
                  buttonBorderRadius="5"
                  buttonFontWeight="bold"
                  buttonFontSize="1.5"
                  buttonHoverBackground="#000000"
                  positionButton="absolute"
                  top="0"
                  right="0"
                  title="Editar foto"
                >
                  <InputAvatar />
                </Modal>
              ) : null}
            </UserAvatar>

            <UserData>
              <Header>
                <Name>
                  {currentUser.user_info.firstName}{" "}
                  {currentUser.user_info.lastName}
                </Name>

                {currentUser.user_info.id !== user.id ? (
                  isFollowing ? (
                    <Modal
                      textButton="Seguindo"
                      buttonBorderRadius="5"
                      buttonFontWeight="bold"
                      buttonWidth={10}
                      buttonTextCenter="center"
                      buttonBackground="#dedede"
                      buttonHoverBackground="#c2c2c29e"
                      buttonFontColor="#000000"
                    >
                      <ConfigFollow userData={currentUser.user_info} />
                    </Modal>
                  ) : (
                    <Button
                      onClick={() =>
                        handleClickFollow(currentUser.user_info.id, user.id)
                      }
                      borderradius="5"
                      fontWeight="bold"
                      loading={loading}
                      loadingColor="#fff"
                      loadingHeight="25"
                      loadingWidth="25"
                      justify="center"
                      width={10}
                    >
                      Seguir
                    </Button>
                  )
                ) : (
                  <Modal
                    textButton="Editar perfil"
                    buttonTextCenter="center"
                    buttonWidth={10}
                    buttonPadding={5}
                    buttonBorderRadius="5"
                    buttonFontWeight="bold"
                    title="Editar perfil"
                  >
                    <ConfigAccount />
                  </Modal>
                )}
              </Header>

              <Username> {currentUser.user_info.username} </Username>
              <Title> {currentUser.user_info.title} </Title>

              <Footer>
                <ContainerFollowers>
                  <Followers> <span>{currentUser.followers_count}</span> Seguidores</Followers>
                  
                  <Followers> <span>{currentUser.following_count}</span> Seguindo</Followers>
                </ContainerFollowers>

                <Badges>
                  <Badge
                    imgBagde="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                    link={`https://github.com/${currentUser.user_info.gitHubLink}`}
                  />
                  <Badge
                    imgBagde="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-plain.svg"
                    link={`https://www.linkedin.com/in/${currentUser.user_info.linkedinLink}/`}
                  />
                </Badges>
              </Footer>
            </UserData>
          </UserInfoContainer>
        </article>
      </section>

      <section className="activity-user">
        <div className="user-posts">
          <Feed postsData={postsCurrentUser} />
          {isFetching && <Loading color="#FFF" />}
        </div>
      </section>
    </Container>
  );
}
