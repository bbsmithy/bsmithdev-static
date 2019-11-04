import React from "react";
import { Link } from "react-router-dom";

export const PostPreview = props => {
  return (
    <div className="post-preview">
      <Link
        to={{
          pathname: `post/${props.path}`,
          state: {
            bg: props.bg,
            title: props.title
          }
        }}
      >
        <h2 className="post-title">{props.title}</h2>
      </Link>
      <p className="post-meta">Posted on {props.date}</p>

      <hr />
    </div>
  );
};
