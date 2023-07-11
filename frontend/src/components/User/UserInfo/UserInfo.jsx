import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import Badge from "../../Generics/Badge/Badge";
import Modal from "../../Generics/Modal/Modal";
import ConfigAccount from "../ConfigAccount/ConfigAccount";
import { Avatar } from "@mui/material";
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
} from "./UserInfoStyles";
import InputAvatar from "../InputAvatar/InputAvatar";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { Button } from "../../Generics/Button/Button";
import { api, followUser } from "../../../services/Api";
import ConfigFollow from "../ConfigFollow/ConfigFollow";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Loading from "../../Generics/Loading/Loading";

export default function UserInfo({ currentUser, complements }) {
  const { username } = useParams();
  const { user } = useContext(AuthContext);

  const [isFollowChange, setIsFollowChange] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isLoading } = useQuery(
    ["isFollowing", username],
    async () => {
      const isFollowing = await api.get(
        `followers/isFollowing/${user.username}/${currentUser.username}`
      );
      setIsFollowChange(isFollowing.data);
      return isFollowing;
    },
    {
      staleTime: 1000 * 100,
    }
  );

  const handleClickFollow = async (followerId, userId) => {
    setLoading(true);
    try {
      await followUser(followerId, userId);
      setIsFollowChange(!isFollowChange);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loading color="#FFF" />;
  }

  return (
    <UserInfoContainer>
      <UserAvatar>
        <Avatar
          src={currentUser.profilePhoto}
          sx={{ width: "200px", height: "200px" }}
          variant="rounded"
        />

        {user.id === currentUser.id ? (
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
            {currentUser.firstName} {currentUser.lastName}
          </Name>

          {currentUser.id !== user.id ? (
            isFollowChange ? (
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
                <ConfigFollow userData={currentUser} />
              </Modal>
            ) : (
              <Button
                onClick={() => handleClickFollow(currentUser.id, user.id)}
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

        <Username> {currentUser.username} </Username>
        <Title> {currentUser.title} </Title>

        <Footer>
          <Followers>
            {" "}
            {complements.followers.content.length} Seguidores
          </Followers>

          <Followers>
            {" "}
            {complements.following.content.length} Seguindo
          </Followers>

          <Badges>
            <Badge
              imgBagde="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              link={`https://github.com/${currentUser.gitHubLink}`}
            />
            <Badge
              imgBagde="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-plain.svg"
              link={`https://www.linkedin.com/in/${currentUser.linkedinLink}/`}
            />
          </Badges>
        </Footer>
      </UserData>
    </UserInfoContainer>
  );
}
