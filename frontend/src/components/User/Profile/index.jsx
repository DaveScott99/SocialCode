import React, { useContext, useEffect, useState } from "react";
import Container from "../../Generics/Container/Container";
import Feed from "../../Feed/Feed";
import Repositories from "../Repositories/Repositories";
import { api, followUser } from "../../../services/Api";
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
import { verifyIsFollowing } from "../../../services/User";

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

  const { data: isFollowing } = useQuery(['isFollowing', username], 
    () => verifyIsFollowing(user.username, username)
  );
   
  const { data, isLoading } = useQuery(
    ["currentUser", username],
    async () => {
      const currentUser = await api.get(`/users/username/${username}`);
      const complements = await api.get(
        `/users/complements/${currentUser.data.id}?postsPage=0&followersPage=0&followingPage=0`
      );
      const profileUser = { currentUser, complements };
      return profileUser;
    },
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
                src={data.currentUser.data.profilePhoto}
                sx={{ width: "200px", height: "200px" }}
                variant="rounded"
              />

              {user.id === data.currentUser.data.id ? (
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
                  {data.currentUser.data.firstName}{" "}
                  {data.currentUser.data.lastName}
                </Name>

                {data.currentUser.data.id !== user.id ? (
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
                      <ConfigFollow userData={data.currentUser.data} />
                    </Modal>
                  ) : (
                    <Button
                      onClick={() =>
                        handleClickFollow(data.currentUser.data.id, user.id)
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

              <Username> {data.currentUser.data.username} </Username>
              <Title> {data.currentUser.data.title} </Title>

              <Footer>
                <Followers>
                  {" "}
                  {data.complements.data.followers.content.length} Seguidores
                </Followers>

                <Followers>
                  {" "}
                  {data.complements.data.following.content.length} Seguindo
                </Followers>

                <Badges>
                  <Badge
                    imgBagde="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                    link={`https://github.com/${data.currentUser.data.gitHubLink}`}
                  />
                  <Badge
                    imgBagde="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-plain.svg"
                    link={`https://www.linkedin.com/in/${data.currentUser.data.linkedinLink}/`}
                  />
                </Badges>
              </Footer>
            </UserData>
          </UserInfoContainer>
        </article>
      </section>

      <section className="activity-user">
        <div className="user-projects">
          <Repositories gitHubUsername={data.currentUser.data.gitHubLink} />
        </div>

        <div className="user-posts">
          <div className="label">
            <span>Atividade</span>
          </div>
          <Feed postsData={data.complements.data.posts.content} />
        </div>
      </section>
    </Container>
  );
}
