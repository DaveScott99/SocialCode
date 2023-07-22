import React, { useContext, useEffect } from "react";
import Loading from "../../components/Generics/Loading/Loading";
import Feed from "../../components/Feed";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchPostsForFeed } from "../../services/Feed";
import { useSelector, useDispatch } from "react-redux";
import LoadingFullScreen from "../../components/Generics/LoadingFullScreen";
import { Container } from "./sytles";

import {
  fetchPostsFeedToRedux,
  nextPage,
  setTotalPages,
} from "../../redux/post/actions";

import "./styles.css";

export default function Home() {
  const { user } = useContext(AuthContext);

  const { postsFeed, currentPage, totalPages } = useSelector(
    (rootReducer) => rootReducer.postReducer
  );
  const dispatch = useDispatch();

  const { isLoading, isFetching, isError } = useInfiniteQuery(
    ["postsFeed", currentPage, user.username],
    async () => {
      const postsData = await fetchPostsForFeed(user.username, currentPage);
      if (!postsData.empty && currentPage <= totalPages) {
        dispatch(setTotalPages(postsData.totalPages));
        dispatch(fetchPostsFeedToRedux(postsData.content));
      }
      return postsData;
    },
    {
      staleTime: 2000 * 100,
      keepPreviousData: true,
    }
  );

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

  if (isError) {
    toast.error("Erro ao carregar os posts");
  }

  return (
    <Container>
      {isLoading ? <LoadingFullScreen /> : <Feed postsData={postsFeed} />}
      {isFetching && <Loading color="#fff" />}
    </Container>
  );
}
