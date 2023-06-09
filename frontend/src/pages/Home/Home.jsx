import React, { useEffect, useState } from 'react';
import Timeline from '../../components/Timeline/Timeline';
import NewPost from '../../components/NewPost/NewPost';
import { FindAllPosts } from '../../services/Api';
import Loading from '../../components/Loading/Loading';

import './Home.css'

export default function Home() {

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  
  /* Função para carregar novos posts */
  const loadPosts = async () => {
    setLoading(true);
    try {
      const newPosts = await FindAllPosts(page); // Busca novos posts na API referente a página atual
      setPosts(prevPosts => [...prevPosts, ...newPosts]); // Concatena a resposta da API com os posts já existentes no estado
      setPage(prevPage => prevPage + 1); // Pula para a próxima página
    } finally {
      setLoading(false);
    }
  }
  
  /* Executa o carregamento de posts */
  useEffect(() => {
    loadPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  /* Função para verificar se o scroll está no final da página */
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight -5) {
      loadPosts()
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      <div className='home'>
          <div className='card-wrapper'>
              <header className="container-header-timeline">
                  <h1>Página Inicial</h1>
              </header>
              <NewPost />
              <Timeline postsData={posts}/>
              {loading && <Loading />}
          </div>
      </div>
    </>
  );
};