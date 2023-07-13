import React, { useContext } from "react";
import Loading from "../../components/Generics/Loading/Loading";
import Feed from "../../components/Feed";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchPostsForFeed } from "../../services/Feed";

import "./styles.css";

export default function Home() {
  const { user } = useContext(AuthContext);
   
  const { data: posts, isLoading, isError } = useQuery(['postsFeed'], () => fetchPostsForFeed(user.username, 0), {
    staleTime: 1000 * 100,
  });

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
          {isLoading ? <Loading color="#fff" /> : <Feed postsData={posts} />}
        </div>
      </div>
    </>
  );
}
