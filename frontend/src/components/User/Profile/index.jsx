import React, { useContext, useEffect, useState } from "react";
import Container from "../../Generics/Container/Container";
import Feed from "../../Feed";
import { followUser } from "../../../services/Api";
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
import {
  fetchPostsUserToRedux,
  nextPage,
  selectUser,
  setIsFollowing,
  setTotalPages,
} from "../../../redux/user/actions";
import "./CardUserProfile.css";
import {
  Badges,
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

  const { currentUser, isFollowing, postsCurrentUser, currentPage, totalPages } = useSelector(
    (rootReducer) => rootReducer.userReducer
  );

  const dispatch = useDispatch();

  const { isLoading, refetch } = useQuery(
    [username, currentPage],
    async () => {
      const profile = await fetchProfileUser(username, currentPage);      
      const isFollowing = await verifyIsFollowing(user.username, username);
      if (profile) {
        dispatch(selectUser(profile));
        dispatch(setIsFollowing(isFollowing));

        if (currentPage <= totalPages) {
          dispatch(fetchPostsUserToRedux(profile.posts.content));
          dispatch(setTotalPages(profile.posts.totalPages));
        }
      }
      return profile;
    },
    {
      staleTime: 2000 * 100,
      cacheTime: 0,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch, username]);

  const handleClickFollow = async (followerId, userId) => {
    setLoading(true);
    try {
      await followUser(followerId, userId);
      dispatch(setIsFollowing(true));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        dispatch(nextPage(currentPage + 1));
      }
    });
    intersectionObserver.observe(document.querySelector("#sentinel"));
    return () => intersectionObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                      buttonWidth={20}
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
                      width={20}
                    >
                      Seguir
                    </Button>
                  )
                ) : (
                  <Modal
                    textButton="Editar perfil"
                    buttonPadding="10"
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
                <Followers> {currentUser.followers_count} Seguidores</Followers>

                <Followers> {currentUser.following_count} Seguindo</Followers>

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
          <div className="label">
            <span>Atividade</span>
          </div>
          <Feed postsData={postsCurrentUser} />
        </div>
      </section>
    </Container>
  );
}
