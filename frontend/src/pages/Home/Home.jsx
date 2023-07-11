import React, { useContext } from "react";
import NewPost from "../../components/Post/NewPost/NewPost";
import { api } from "../../services/Api";
import Loading from "../../components/Generics/Loading/Loading";

import "./Home.css";
import Feed from "../../components/Feed/Feed";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function Home() {
  const { user } = useContext(AuthContext);

  const { data, isLoading, isError } = useQuery(
    ["postsFeed"],
    async () => {
      const response = await api
        .get(`/feed/${user.username}?size=6&page=${0}`);
      return response.data.content;
    },
    {
      staleTime: 1000 * 100,
    }
  );

  if (isError) {
    toast.error("Erro ao carregar os posts");
  }

  return (
    <>
      <div className="home">
        <div className="card-wrapper">
          <header className="container-header-timeline">
            <h1>Página Inicial</h1>
          </header>
          <NewPost />
          {isLoading ? <Loading color="#fff" /> : <Feed postsData={data} />}
        </div>
      </div>
    </>
  );
}
