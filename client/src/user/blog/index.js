import React from "react";
import './index.css';
import Posts from "./posts";
import { useParams } from "react-router-dom";
import Post from "./post";

function Blog() {
  let { postId } = useParams();
  if (postId !== undefined) {
    return (
      <Post postId={postId} />
    )
  }
  else {
    return (
      <Posts />
    )
  }

}

export default Blog;