import React from "react";
import { CardPost } from "../Post/CardPost";
import Masonry from "react-masonry-css";

import "./styles.css"

export default function Feed({ postsData }) {

  const breakpointColumnsObj = {
    default: 3, // Quantidade de colunas por padrão
    1100: 2,    // Para telas com largura menor ou igual a 700px, usar 2 colunas
    700: 1     // Para telas com largura menor ou igual a 500px, usar 1 coluna
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="card-grid"
    >
      {postsData?.map((post, index) => 
        <CardPost post={post} index={index} key={post.id} />
      )}
    </Masonry>
  );
}
