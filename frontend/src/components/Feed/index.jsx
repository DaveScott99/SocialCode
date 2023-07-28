import React from "react";
import { CardPost } from "../Post/CardPost";
import Masonry from "react-masonry-css";

import "./styles.css"

export default function Feed({ postsData }) {

  const breakpointColumnsObj = {
    default: 3,
    1100: 2, 
    700: 1     
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
