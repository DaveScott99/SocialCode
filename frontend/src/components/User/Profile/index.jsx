import React, { useContext, useState } from "react";
import Container from "../../Generics/Container/Container";
import Feed from "../../Feed";
import Repositories from "../Repositories/Repositories";
import { followUser } from "../../../services/Api";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Generics/Loading/Loading";
import { useParams } from "react-router";
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

export default function Profile() {
  const { username } = useParams();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const { data: isFollowing } = useQuery(["isFollowing", username], () =>
    verifyIsFollowing(user.username, username)
  );

  const { data: profile, isLoading } = useQuery(
    ["currentUser", username],
    () => fetchProfileUser(username, 0),
    {
      staleTime: 1000 * 100,
    }
  );

  const handleClickFollow = async (followerId, userId) => {
    setLoading(true);
    try {
      await followUser(followerId, userId);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loading color="#FFF" />;
  }

  return (
    <Container className="user-profile-container">
      <section className="user-profile-card">
        <article className="user-info">
          <UserInfoContainer>
            <UserAvatar>
              <Avatar
                src={profile.user_info.profilePhoto}
                sx={{ width: "200px", height: "200px" }}
                variant="rounded"
              />

              {user.id === profile.user_info.id ? (
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
                  {profile.user_info.firstName} {profile.user_info.lastName}
                </Name>

                {profile.user_info.id !== user.id ? (
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
                      <ConfigFollow userData={profile.user_info} />
                    </Modal>
                  ) : (
                    <Button
                      onClick={() =>
                        handleClickFollow(profile.user_info.id, user.id)
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

              <Username> {profile.user_info.username} </Username>
              <Title> {profile.user_info.title} </Title>

              <Footer>
                <Followers> {profile.followers_count} Seguidores</Followers>

                <Followers> {profile.following_count} Seguindo</Followers>

                <Badges>
                  <Badge
                    imgBagde="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                    link={`https://github.com/${profile.user_info.gitHubLink}`}
                  />
                  <Badge
                    imgBagde="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-plain.svg"
                    link={`https://www.linkedin.com/in/${profile.user_info.linkedinLink}/`}
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
          <Feed postsData={profile.posts.content} />
        </div>
      </section>
    </Container>
  );
}
