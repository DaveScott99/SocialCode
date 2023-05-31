import React, { useEffect, useState } from "react";

import './Test.css';
import { FindAllPosts } from "../../services/Api";

export default function Test() {

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const loadPosts = async () => {
    setLoading(true);
    try {
      const newPosts = await FindAllPosts(page);
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setPage(prevPage => prevPage + 1);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    loadPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
      return;
    }
    loadPosts();
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  
  
  return (
      <div className="container">
          <h1>Scroll Infinito</h1>
          {posts.map((post) => (
              <div className="post" key={post.id}>
                  <div className="header-post">
                      <h5>{post.title}</h5>
                  </div>
                  <div className="text-content-container">
                      <div className="text-contente">
                          {post.body}
                      </div>
                  </div>
              </div>
          ))}
        {loading && <p>Carregando...</p>}
      </div>
  );
}