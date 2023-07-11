import React from "react";
import Container from "../../Generics/Container/Container";
import UserInfo from "../UserInfo/UserInfo";
import Feed from "../../Feed/Feed";
import Repositories from "../Repositories/Repositories";
import { api } from "../../../services/Api";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Generics/Loading/Loading";
import { useParams } from "react-router";

import "./CardUserProfile.css";

export default function CardUserProfile() {
  const { username } = useParams();

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

  if (isLoading) {
    return <Loading color="#FFF" />;
  }

  return (
    <Container className="user-profile-container">
      <section className="user-profile-card">
        <article className="user-info">
          <UserInfo
            currentUser={data.currentUser.data}
            complements={data.complements.data}
          />
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
