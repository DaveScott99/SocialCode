import React, { useContext, useEffect } from "react";
import Loading from "../../components/Generics/Loading/Loading";
import Feed from "../../components/Feed";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchPostsForFeed } from "../../services/Feed";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPostsFeedToRedux,
  nextPage,
  setTotalPages,
} from "../../redux/post/actions";
import { Container } from "./sytles";

import "./styles.css";
import { postsFeed } from "../../utils/Data";

export default function Home() {
  const { user } = useContext(AuthContext);
  
  const {  currentPage, totalPages } = useSelector(
    (rootReducer) => rootReducer.postReducer
  );
  //const dispatch = useDispatch();
    
  const { isLoading, isFetching, isError } = useInfiniteQuery(
    ["postsFeed", currentPage, user.username],
    async () => {
      /*
      const postsData = await fetchPostsForFeed(user.username, currentPage);
      if (!postsData.empty && currentPage <= totalPages) {
        dispatch(setTotalPages(postsData.totalPages));
        dispatch(fetchPostsFeedToRedux(postsData.content));
        console.log("Tem post");
      }
      return postsData;
      */
    },
    {
      staleTime: 1000 * 100,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        //dispatch(nextPage(currentPage + 1));
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
      {isLoading ? <Loading color="#fff" /> : <Feed postsData={postsFeed.content} />}
      {isFetching && <Loading color="#fff" /> }
    </Container>
  );
}
