import React, { useContext, useEffect, useState } from "react";
import Feed from "../../components/Feed";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { fetchPostsForFeed } from "../../services/Feed";
import { useSelector, useDispatch } from "react-redux";
import LoadingFullScreen from "../../components/Generics/LoadingFullScreen";
import { Container } from "./sytles";

import { fetchPostsFeedToRedux, resetPosts } from "../../redux/post/actions";

import "./styles.css";
import Loading from "../../components/Generics/Loading/Loading";

export default function Home() {
  const { user } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isloading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);

  const { postsFeed } = useSelector((rootReducer) => rootReducer.postReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetPosts());
  }, [dispatch]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        if (currentPage < totalPages) {
          setIsFetching(true);
          fetchPostsForFeed(user.username, currentPage)
            .then((response) => {
              if (
                response &&
                !response.empty &&
                response.number < response.totalPages
              ) {
                dispatch(fetchPostsFeedToRedux(response.content));
                setTotalPages(response.totalPages);
                setCurrentPage((prevPage) => prevPage + 1);
              }
            })
            .finally(() => {
              setIsFetching(false);
              setIsLoading(false);
            });
        }
      }
    });
    intersectionObserver.observe(document.querySelector("#sentinel"));
    return () => intersectionObserver.disconnect();
  }, [currentPage, dispatch, totalPages, user.username]);

  if (isloading) {
    return <LoadingFullScreen />;
  }

  return (
    <Container>
      <Feed postsData={postsFeed} />
      {isFetching && <Loading color="#FFF" />}
    </Container>
  );
}
